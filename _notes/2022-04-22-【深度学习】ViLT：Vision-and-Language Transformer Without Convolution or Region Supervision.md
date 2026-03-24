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


# Conclusion

在本文中，我们提出了一种最小的VLP架构——Vision-and-Language Transformer(ViLT)。

对于那些大量配备卷积视觉嵌入网络(如Faster R-CNN和ResNets)的竞争对手来说，ViLT是可以胜任的。

我们要求VLP未来的工作更多地关注 Transformer 模块内部的模态交互，而不是进行一场仅仅为单模态 embedder 的竞赛。

ViLT-B/32 证明了无卷积核区域监督的 VLP 模型仍然具有竞争力。

这篇文章总结指出一些可能增加ViLT家族的因素。


**Scalability** 给定适当数量的数据， 预训练 Transformer 可以 scale 地非常好。这个发现为 ViLT 变体更好的性能铺垫了道路。我们把训练更大的模型留给未来的工作，因为对齐的视觉和语言数据集仍然稀缺。


**Masked Modeling for Visual Inputs.** 考虑到MRM的成功，我们推测视觉模态的掩蔽建模目标有助于将信息保存到 Transformer 的最后一层。然而，如表5所示，image patch(MPP) 的 MRM 的一种原始变体失败了。

Cho 等人提出在 masked object classification (MOC) 任务上提议他们的 grid RoIs。然而，这项工作中的视觉词汇在视觉和语言预训练与视觉骨干一起是固定的。对于可训练的可视化嵌入，一次性 clustering 不是一个可行的选择。我们认为交替聚类或同时聚类在视觉无监督学习研究中研究的方法可以应用。

**Augmentation Strategies** 我们鼓励未来不使用区域监督的工作，为视觉模态设计更复杂的 masking objective。之前关于对比视觉表征学习的研究表明，与更简单的增强策略相比，未采用RandAugment的高斯模糊可以显著提高下游性能。对文本和视觉输入的适当扩展策略的探索将是一个有价值的补充。
