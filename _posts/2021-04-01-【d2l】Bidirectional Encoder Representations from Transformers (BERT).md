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


如我们所见， ELMo 双向编码上下文， 但是用于特征任务结构； 尽管GPT是 task-agnostic 的， 但是编码是从左到右的。BERT(来自transformer的双向编码器表征)结合了这两个领域的优点，对上下文进行双向编码，对于各种各样的自然语言处理任务，只需要最小的结构更改[ [Devlin et al., 2018]](http://d2l.ai/chapter_references/zreferences.html#devlin-chang-lee-ea-2018)。