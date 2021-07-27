---
layout:     post
title:      "【深度学习】GPT：Improving Language Understanding by Generative Pre-Training"
subtitle:   ""
date:       2021-07-25
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - NLP
---

# Abstract

第一点， 生成式预训练语言模型， 然后在每个特定任务上判别性微调 有很大收益。

在微调期间， 在最小改变模型结构的情况下， 利用task-aware的输入实现有效的迁移学习。

# Introduction


标注数据是非常费时间的， 因此使用未标注的数据是非常有价值的。

即便有可观的监督数据可用，以一种无监督的方式学习表征可以提供显著的性能提升。一个例子就是预训练词向量对NLP任务的提升。

从未标注的文本中学习不仅仅是词级别的表征主要有两大难点。

- 不清楚学习用于迁移的表征时， 哪种优化目标最有效
- 将这些学习到的表征迁移到目标任务哪种方式最有效没有达成一致

本文使用结合无监督预训练和监督微调探索了一种用于语言理解任务半监督方式。首先，我们使用在未标记数据上使用语言模型目标学习神经网络模型的初始化参数。然后	我们采用这些参数到使用监督目标的目标任务上。


模型的结构使用 Transformer。 在迁移时，将结构化的输入处理为一个 task-specific 连续的自适应输入的序列。

# Related Work

**Semi-supervised learning for NLP** 先进行无监督的预训练， 再进行监督的训练是一种半监督训练。 比如词向量的预训练， 但是这些方法主要迁移词级别的信息， 而我们想要捕获更高级别的语义。

