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
    - 
---

# Abstract

Semantic role labeling(SRL) 是识别句子的 predicate-arguement 结构的任务。它通常被看做标准NLP流程的重要一步。

由于语义表示与语法密切相关， 因此这篇文章在模型中加入了语法信息。他们提出一种图卷积神经网络用于建模语法依赖图。基于语法依赖树的GCN用作句子编码器， 产生一个句子中的单词的隐特征表示。

这篇文章发现 GCN 层与 LSTM 层是互补的， 当同时堆叠 GCN 层和 LSTM 层时， 其在SOTA LSTM SRL 模型上得到大幅提升。

