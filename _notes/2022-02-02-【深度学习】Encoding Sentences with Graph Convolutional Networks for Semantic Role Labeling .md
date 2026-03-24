---
layout:     post
title:      "【深度学习】Encoding Sentences with Graph Convolutional Networks for Semantic Role Labeling "
subtitle:   ""
date:       2022-02-02
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - Scene Graph
---

# Abstract

Semantic role labeling(SRL) 是识别句子的 predicate-arguement 结构的任务。它通常被看做标准NLP流程的重要一步。

由于语义表示与语法密切相关， 因此这篇文章在模型中加入了语法信息。他们提出一种图卷积神经网络用于建模语法依赖图。基于语法依赖树的GCN用作句子编码器， 产生一个句子中的单词的隐特征表示。

这篇文章发现 GCN 层与 LSTM 层是互补的， 当同时堆叠 GCN 层和 LSTM 层时， 其在SOTA LSTM SRL 模型上的性能得到大幅提升。


# Conclusion
这篇文章展示了如何将语法信息加入到神经网络模型中， 特别是构造 syntax-aware 的 SRL 模型。有一些相对直接的步骤可以进一步提升 SRL 的结果。例如， 依赖于 labeling arguments， 使用一个联合模型可能显著提升性能。

考虑到 GCN 的简单性以及图结构的普遍性， 我们相信有很多的 NLP 任务可以使用 GCN 利用语言结构。(例如， 句子的语法和语义表征以及 对文档的 co-reference graphs 或者 discourse parses)。
