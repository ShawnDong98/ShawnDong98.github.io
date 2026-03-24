---
layout:     post
title:      "【深度学习】Multi-Cast Attention Networks for Retrieval-based Question Answering and Response Prediction"
subtitle:   ""
date:       2022-02-22
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - 
---

# Abstract

注意力通常会选择最优信息量的子段用于预测。

这篇文章提出一种新的注意力作为特征增强的形式， 叫做 casted attention。

这篇文章提出 Multi-Cast Attention Networks(MCAN) 这种新的注意力机制以及一种通用的模型架构用于 conversational modeling 和 QA domains 中的 potpourri of ranking tasks。

该方法执行一系列的 soft attention 操作， 每次在 inner word embeddings casting 一个 scalar 特征。

关键的思想是为接下来的编码器层提供一种 real-valued hint(feature)， 其目的是提升表征学习阶段。

这种设计有几个优点， 它允许 casted 任意数量的注意力机制 和 注意力变体 (如 alignment-pooling, max-pooling, mean-pooling)同时被执行。

# Conclusion
这篇文章提出一种新的 SOTA 模型用于 QA 和 conversation modeling 的 retrieval 和 matching 任务中。

该模型是广泛应用的 neural attention 的重新想象。第一次将注意力作为特征增强，而不是池化操作。提出了三种将注意力矩阵压缩为标量特征的方法。

所提的模型在四个任务和数据集上都取得了有竞争力的结果。

