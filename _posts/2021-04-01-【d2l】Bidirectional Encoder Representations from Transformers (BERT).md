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