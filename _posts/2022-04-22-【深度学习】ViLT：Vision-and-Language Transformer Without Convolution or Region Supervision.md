---
layout:     post
title:      "【深度学习】ViLT：Vision-and-Language Transformer Without Convolution or Region Supervision"
subtitle:   ""
date:       2022-04-22
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - MMML
---

# Abstract

视觉和语言预训练(VLP)提高了各种视觉和语言联合下游任务的性能。

目前的VLP方法严重依赖于图像特征提取过程，其中大多数涉及区域监督(如目标检测)和卷积架构(如ResNet)。

这些方法有两个问题：

- 效率/速度， 特征提取的过程所需的计算力大于多模态交互所需的算力 
- 表达能力， 由于视觉表征表达能力的上限和预先定义的视觉词表。

这篇文章提出了一个最小的VLP模型，Vision-and-Language Transformer (ViLT)，与文本处理一样， 显著简化了视觉输入的处理过程。

我们表明，ViLT比以前的VLP模型快几十倍，但具有竞争力或更好的下游任务性能。