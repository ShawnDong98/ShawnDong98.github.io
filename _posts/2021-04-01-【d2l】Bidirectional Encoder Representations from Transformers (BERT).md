---
layout:     post
title:      "【d2l】Bidirectional Encoder Representations from Transformers (BERT)"
subtitle:   ""
date:       2021-04-01
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - d2l
    - NLP
---

我们已经介绍了几种用于自然语言理解的词嵌入模型。经过预训练后，可以将输出视为一个矩阵，其中每一行都是表示预定义词典的一个单词的向量。事实上，这些词嵌入模型都与上下文无关。让我们开始解释这个性质。

# From Context-Independent to Context-Sensitive

回想一下第14.4节和第14.7节中的实验。例如，word2vec和GloVe都将相同的预训练向量分配给相同的单词，而不考虑单词的上下文(如果有的话)。任意 token $x$ 的一个上下文无关的表征 可以看做 一个仅有 $x$ 作为输入的函数 $f(x)$。 考虑到自然语言中大量的多义和复杂的语义，上下文无关的表征有明显的局限性。比如， 词 "crane" 在上下文 "a crane is flying" 和 "a crane driver came" 有着完全不同的含义； 因此， 根据上下文，同一个单词可能被赋予不同的表示方式。

这推动了 上下文敏感 的词表征的发展， 词汇的表征依赖于它们的上下文。因此， token $x$ 的 上下文敏感 表征 是一个同时依赖于 $x$ 和 它的上下文 $c(x)$ 的函数 $f(x, c(x))$。 流行的上下文相关的表征包括  TagLM (language-model-augmented sequence tagger) [[Peters et al., 2017b]](http://d2l.ai/chapter_references/zreferences.html#peters-ammar-bhagavatula-ea-2017), CoVe (Context Vectors) [[McCann et al., 2017]](http://d2l.ai/chapter_references/zreferences.html#mccann-bradbury-xiong-ea-2017), and ELMo (Embeddings from Language Models) [[Peters et al., 2018]](http://d2l.ai/chapter_references/zreferences.html#peters-neumann-iyyer-ea-2018).


例如，通过将整个序列作为输入，ELMo是一个函数，它为输入序列中的每个单词赋值一个表征。具体来说，ELMo将来自预先训练的双向LSTM的所有中间层表示组合为输出表征。然后， ELMo表征将作为额外的特征添加到下游任务的现有的监督模型，例如通过拼接ELMo表征和现有模型的原始表征(例如， GloVe) 。一方面，在添加ELMo表征后，将预训练好的双向LSTM模型中的所有权值冻结。另一方面，现有的监督模型用于特定任务。 在当时，利用不同的最佳模型来完成不同的任务，ELMo提高了六个自然语言处理任务的技术水平:情感分析、自然语言推理、语义角色标记、关联解析、命名实体识别和问题回答。


# From Task-Specific to Task-Agnostic

尽管ELMo已经显著改进了一组不同的自然语言处理任务的解决方案，但每个解决方案仍然依赖于特定于任务的结构。然而，为每个自然语言处理任务创建特定的结构实际上并不简单。GPT(Generative Pre-Training) 模型为 上下文敏感表征 设计了一个 通用的 task-agnostic 模型 [[Radford et al., 2018]](http://d2l.ai/chapter_references/zreferences.html#radford-narasimhan-salimans-ea-2018)。 基于 transformer decoder， GPT预训练一种语言模型，该模型将用于表示文本序列。当将GPT应用到下游任务时，语言模型的输出将被送入一个额外的线性输出层来预测任务的标签。与ELMo冻结预训练模型的参数形成鲜明对比的是，GPT在下游任务的监督学习过程中对预训练transformer decoder中的所有参数进行微调。GPT在自然语言推理、问题回答、句子相似度和分类的12个任务上进行了评估，并在其中的9个任务中  以对模型架构的最小更改 改进了技术水平。

然而，由于语言模型的自回归特性，GPT只向前看(从左到右)。在上下文 "i went to the bank to deposit cash" 和 "i went to the bank to sit down"， 因为 GPT 只对 "bank" 左侧的上下文敏感， GPT将返回 “bank” 的相同表征， 尽管它有着不同的含义。


# BERT: Combining the Best of Both Worlds


如我们所见， ELMo 双向编码上下文， 但是用于特征任务结构； 尽管GPT是 task-agnostic 的， 但是编码是从左到右的。BERT(来自transformer的双向编码器表征)结合了这两个领域的优点，对上下文进行双向编码，对于各种各样的自然语言处理任务，只需要最小的结构更改[ [Devlin et al., 2018]](http://d2l.ai/chapter_references/zreferences.html#devlin-chang-lee-ea-2018)。使用预先训练的transformer decoder，BERT能够基于双向上下文表示任何token。在下游任务的监督学习中，BERT与GPT有两个相似之处。首先，BERT表征将被输入到一个额外的输出层中，根据任务的性质对模型结构进行最小的更改，例如预测每个token vs 预测整个序列。其次，对预先训练好的transformer decoder的所有参数进行微调，同时对额外的输出层从头训练。如图描述了ELMo, GPT 和 BERT的差异。

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1617268267764.png)

BERT进一步提高了11个自然语言处理任务的技术水平 i) 单文本分类(如情感分析), ii) 文本对分类(例如，自然语言推理), iii) 问答系统, iv) 文本标记(例如，命名实体识别)。从上下文敏感的ELMo到 task-agnostic 的GPT和BERT，所有这些在2018年提出的概念简单 但在 实际应用中强大的自然语言深层预训练表征，都彻底改变了各种自然语言处理任务的解决方案。

在本章的其余部分，我们将深入了解BERT的预训练。在第15节中介绍自然语言处理应用程序时，我们将演示针对下游应用程序的BERT微调。

```python
import torch
from torch import nn
from d2l import torch as d2l
```


# Input Representation

在自然语言处理中，有些任务(如情感分析)以单个文本作为输入，而在其他一些任务(如自然语言推理)中，输入是一对文本序列。BERT输入序列同时明确表示单个文本和文本对。前者BERT输入序列是将特殊的分类 token \<cls\>、文本序列的token 和特殊的分离token \<sep\> 拼接而成。在后者中，BERT输入序列是\<cls\>，第一个文本序列的token，\<sep\>，第二个文本序列的token，和\<sep\>的拼接。我们一致地将 "BERT input sequence" 和 其他类型的 "sequence" 区分开。 例如，一个BERT输入序列可以包括一个文本序列或两个文本序列。

为了区分文本对，分别将学习到的 segment embeddings $e_A$ 和 $e_B$ 添加到 第一个序列的 token embeddings 和 第二个序列的 token embeddings。 对于单个文本输入， 仅用到 $e_A$。

下面的 get_tokens_and_segments 取 一个句子 或 两个句子 作为输入， 然后返回 BERT 输入序列的 tokens 以及 它们对应的segment IDs。 


```python
def get_tokens_and_segments(tokens_a, tokens_b=None):
    tokens = ['<cls>'] + tokens_a + ['<sep>']

    #--- 0和1分别用来标记 segment A 和 segment B ---
    segments = [0] * (len(tokens_a) + 2)
    if tokens_b is not None:
        tokens += tokens_b + ['<sep>']
        segments += [1] * (len(tokens_b) + 1)
    
    return tokens, segments
```

BERT 选择 transformer encoder 作为它的双向结构。 通常在 transformer encoder中， positional embeddings被加在BERT输入序列的每个位置。 然而， 不同于原始的 transformer encoder， BERT 使用可学习的 positional embeddings。总之， 下图展示了 BERT输入序列的 embeddings 是 token embeddings， segment embeddings 和 positional embeddings的和。

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1617280172677.png)

下面的 BERTEncoder 类 和 10.7 节 实现的 TransformerEncoder 类 相似。和 TransformerEncoder 不同的是， BERTEncoder 使用 segment embeddings 以及 可学习的 positional embeddings。


```python
```

假设 词典大小为  10,000。 为了展示BERTEncoder的>正向推理， 让我们创建它的实例并初始化它的参数。


```python
```

我们将 tokens 定义为2个长度为8的BERT输入序列，其中每个 token 都是词典的索引。带有输入标记的BERTEncoder的>正向推断将返回编码后的结果，其中每个 token 都由一个向量表示，该向量的长度由超参数num hidden预定义。这个超参数通常被称为transformer encoder的 hidden size (hidden units的数量)。


```python
```

输出：

```
```


# Pretraining Tasks

BERTEncoder的>正向推理给出输入文本的每个 token 的BERT表示，以及插入的特殊标记 “\<cls\>”和 “\<seq\>”。接下来，我们将使用这些表示来计算用于预训练BERT的损失函数。预训练包括以下两个任务: masked language modeling 和 next sentence prediction。


## Masked Language Modeling


如8.3节所述，语言模型使用其左侧的上下文预测一个token。 为了对表示每个标记的上下文进行双向编码，BERT随机masks token，并使用双向上下文中的 token 来预测被 masked 的token。这个任务被称为masked language model。

在这个预训练任务中， 随机选取15%的 tokens 作为 masked tokens 进行预测。要在不使用标签作弊的情况下预测 masked token ，一种简单的方法是始终用BERT输入序列中的特殊 "\<mask\>" token 替换它。然而，人工特殊 token "\<mask\>" 在微调中永远不会出现。为了避免预训练和微调之间的这种不匹配，如果一个 token 被 masked 以进行预测(例如，在 "this movie is great" 中 选择 masked 掉 "great" 并预测 "great" )，则在输入中它将替换为：

- 80% 的时候为一个特殊的 "\<mask\>" token (例如， “this movie is great” 变成  “this movie is \<mask\>”)；
- 10% 的时候为一个随机的token (例如，“this movie is great” 变成 "this movie is drink")；
- 10% 的时候不改变 label token (例如， "this movie is great" 变成 "this movie is great")；

注意，15%的时间中有10%会插入一个随机 token。这种偶然的干扰鼓励BERT在其双向上下文编码中less biased 于masked token(特别是当不改变标签 token 时)。


在BERT预训练的 masked 语言模型任务中，我们实现以下MaskLM类来预测 masked tokens。预测使用一个隐藏层MLP (self.mlp)。在>正向推理中，它接受两个输入:BERTEncoder的编码结果和用于预测的token位置。输出是这些位置的预测结果。

```python

```

为了演示MaskLM的>正向推理，我们创建了它的实例mlm并对其进行初始化。回想一下，从BERTEncoder的正向推理中得到的 encoded_X 表示2个BERT输入序列。我们将 mlm_positions 定义为在 encoded_X 的BERT输入序列中的3个预测索引。mlm的正向推理 在 encoding_X 的所有 masked 位置 mlm_positions 上 返回预测结果 mlm_Y_hat。对于每个预测，结果的大小等于词典的大小。

```python

```

输出：

```
```

利用masks 下预测 token 的真实标签，计算 masked 语言模型任务在BERT预训练中的交叉熵损失。

```python

```

输出：

```
```


## Next Sentence Prediction

