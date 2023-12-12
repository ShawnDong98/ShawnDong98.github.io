---
layout:     post
title:      "【NIPS 2020】RAG：Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks"
subtitle:   ""
date:       2023-12-11
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - NIPS 2020
    - 
---

# Abstract

大型预训练语言模型已经被证明能够在其参数中存储事实知识，并在针对下游自然语言处理（NLP）任务进行微调时达到最先进的结果。

然而，它们访问和精确操控知识的能力仍然有限，因此在知识密集型任务上的表现落后于特定任务的架构。

此外，为它们的决策提供出处以及更新它们的世界知识仍然是公开的研究问题。

具有显式非参数记忆存取机制的预训练模型可以克服这一问题，但迄今为止，这类模型仅被用于探索性的下游任务。

我们探索了一种用于检索增强生成（RAG）的通用微调方法——这类模型结合了预训练的参数记忆和非参数记忆以生成语言。我们引入了其中参数记忆是预训练的 seq2seq 模型，非参数记忆是以预训练神经检索器访问的 Wikipedia 的密集向量索引的 RAG 模型。

我们在多种知识密集型 NLP 任务上进行了微调和评估，并在三项开放域问答任务上设定了最先进的水平，超过了参数 seq2seq 模型和特定任务的检索-提取架构。

对于语言生成任务，我们发现 RAG 模型生成的语言比最先进的仅参数 seq2seq 基线模型更具体、多样化且事实性强。

# 2 Methods
我们探索了RAG模型，该模型使用输入序列 $x$ 检索文本文档 $z$ ，并在生成目标序列 $y$ 时将其用作附加上下文。如图 1 所示，我们的模型利用两种组件： (i) 一个以参数 $\eta$ 参数化的 retiever $p_\eta(z \mid x)$， 其基于 query $x$ 返回文本消息的分布 (top-K 截断)。(ii) 一个以参数 $\theta$ 参数化的 generator $p_\theta(y_i \mid x, z, y_{1:i-1})$， 其基于前面 $i-1$ 个 tokens $y_{1:i-1}$ 的上下文， 原始输入 $x$ 和 检索到的信息 $z$ 生成当前 token。 

为了端到端地训练检索器和生成器，我们将检索到的文档视为一个潜在变量。我们提出了两种模型，这两种模型以不同的方式边缘化潜在文档，从而产生生成文本的分布。在一种方法中，即RAG-Sequence，模型使用相同的文档来预测每个目标标记。第二种方法，RAG-Token，可以基于不同的文档预测每个目标标记。下面，我们将正式介绍这两种模型，然后描述 $p_\eta$ 和  $p_\theta$ 组件，以及训练和解码过程。

## 2.1 Models

**RAG-Sequence Model** RAG-Sequence 模型使用相同的检索文档来生成完整的序列。从技术上讲，它将检索到的文档视为一个单一的潜变量，通过一种前K个的近似方法来获得 $p(y \mid x)$ 的 seq2seq 概率。具体来说，使用检索器检索前K个文档，生成器为每个文档生成输出序列概率，然后对这些概率进行边际化处理，

$$
p_{\text{RAG-Sequence}}(y \mid x) \approx \sum_{z \in \text{top-k}(p(· \mid x))} p_\eta (z \mid x) p_\theta(y | x, z) = \sum_{z \in \text{top-k}(p(· \mid x))}  p_\eta(z \mid x) \prod_i^N p_\theta (y_i \mid x, z, y_{1:i-1})
$$

**RAG-Token Model** 在 RAG-Token 模型中，我们可以为每个目标标记采样不同的潜在文档，并相应地进行边际化。这使得生成器在生成答案时可以从多个文档中选择内容。具体来说，使用检索器检索前K个文档，然后生成器为每个文档的下一个输出标记产生一个分布，然后进行边际化处理，并在后续的输出标记中重复这个过程。形式上，我们定义如下：

$$
P_{\text{RAG-Token}}(y \mid x) \approx \prod_i^N \sum_{z \in \text{top-k}(p(· \mid x))} p_\eta (z \mid x) p_\theta (y_i \mid x, z_i, y_{1:i-1})
$$

最后，我们注意到，通过将目标类视为长度 1 的目标序列，RAG可用于序列分类任务，在这种情况下，RAG-Sequence 和 RAG-Token是等价的。

## 2.2 Retriever: DPR

检索组件 $p_\eta(z \mid x)$ 基于 DPR。 DPR 遵循双向编码器结构：

$$
p_\eta(z \mid x) \propto \text{exp}(d(z)^\top q(x)) \qquad d(z) = \text{BERT}_d(z), \quad q(x) = \text{BERT}_q(x)
$$
其中 $d(z)$ 是由 $\text{BERT}_{\text{BASE}}$ 文档编码器生成的文档的稠密表征， 并且 $q(x)$ 是由一个 query encoder 生成的 query 表征， 其也是基于 $\text{BERT}_{\text{BASE}}$ 。计算 $\text{top-k}(p_\eta(· \mid x))$， 文档 $z$ 的 k 个列表有最高的先验概率 $p_\eta(z \mid x)$， 其是最大内积搜索（MIPS）问题， 其大约可以在亚线性时间内完成。我们使用来自 DPR 的预训练双编码器来初始化我们的检索器并构建文档索引。该检索器经过训练，用于检索包含 TriviaQA [24] 和 Natural Questions [29] 问题答案的文档。我们将这个文档索引称为 non-parametric memory。


## 2.3 Generator: BART

生成器组件 $p_\theta(y_i \mid x, z, y_{1:i-1})$ 可以被建模为任意的编码器-解码器。我们使用了 BART-large [32]，这是一个预训练的包含 400M 参数的 seq2seq Transformer [58]。在使用 BART 进行生成时，为了将输入 $x$ 与检索到的内容 $z$ 结合起来，我们简单地将它们连接在一起。BART 是使用去噪目标和各种不同的去噪函数进行预训练的。它在各种生成任务中取得了最先进的结果，并在性能上优于大小相当的 T5 模型 [32]。我们将 BART 生成器的参数 $\theta$ 称为 parametric memory。

## 2.4 Training

我们在没有任何直接监督什么文档应该被检索的情况下联合训练 retriver 和 generator 组件。 给定输入输出对 $(x_j, y_j)$ 的微调训练语料库， 我们最小化每个目标的边际负对数似然， $\sum_j - \log p(y_j \mid x_j)$
 使用Adam优化器随机梯度下降。在训练期间更新文档编码器 $\text{BERT}_d$ 成本高昂，因为它需要像REALM 预训练[20]期间那样定期更新文档索引[20]。我们发现强大的性能不需要此步骤，并保持文档编码器（和索引）固定，只是微调查询编码器 $\text{BERT}_q$ 和 BART生成器。
 
## 2.5 Decoding


在测试时，RAG-Sequence 和 RAG-Token 需要采用不同的方式来近似求解 $\arg \max_y p(y \mid x)$。

**RAG-Token** RAG-Token 模型可以视为标准的自回归 seq2seq 生成器，其转移概率为 $p_\theta'(y_i \mid x, y_{1:i-1}) = \sum_{z \in \text{top-k}(p(· \mid x))} p_\eta (z_i \mid x)p_\theta(y_i \mid x, z_i, y_{1:i-1})$。 对于解码，我们插入 $p'_\theta(y_i \mid x, y_{1:i-1})$ 进标准的 beam decoder。

**RAG-Sequence** 对于 RAG-Sequence， 似然 $p(y \mid x)$ 没有打破传统 per-token 似然， 因此， 我们不能使用单个 beam search 求解它。

