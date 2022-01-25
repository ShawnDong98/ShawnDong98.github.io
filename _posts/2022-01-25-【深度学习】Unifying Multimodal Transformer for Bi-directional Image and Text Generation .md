---
layout:     post
title:      "【深度学习】Unifying Multimodal Transformer for Bi-directional Image and Text Generation "
subtitle:   ""
date:       2022-01-25
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - 
---

# Abstract

我们研究了 image-to-text 和 text-image 生成， 这是一个自然地双向任务。

现有的典型工作为每个任务设计两个单独的特定任务的模型， 这带来了昂贵的设计代价。

这篇文章提出一个基于单个多模态模型的统一的图像和文本生成框架来研究双向任务。

具体来说，我们将这两个任务都表示为序列生成任务，其中我们将图像和文本表示为统一的 token 序列，Transformer学习多模态交互来生成序列。

进一步提出两级细粒度特征表示 和 序列级训练来改进基于 Transformer 框架。


# Conclusion
这篇文章提出一个统一的多模态 transformer 的双向 image-text 生成任务。

与为双向任务设计两个单独的模型相比， 我们的方法减轻了设计任务特定的模型的负担， 并优化了存储利用率。

为了解决基于 Transformer 的图像和文本生成模型的挑战， 设计了两级细粒度特征表示和序列级训练策略。

两级细粒度特征表示解决了特征离散化过程中信息丢失的问题。 