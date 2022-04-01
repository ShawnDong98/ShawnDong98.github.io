---
layout:     post
title:      "【深度学习】A ConvNet for the 2020s"
subtitle:   ""
date:       2022-01-22
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - 
---

# Abstract

普通的ViT 在目标检测和语义分割等通用计算机视觉任务上存在使用上的困难。

分层的 Transformer (Swin Transformer) 引入 ConvNet 的先验， 使得 Transformer 可以作为通用视觉任务的主干， 并且表现出强大的性能。

然而，这种混合方法的有效性在很大程度上仍然归功于 Transformer 的内在优势，而不是卷积的固有归纳偏置。

我们将标准的ResNet逐步现代化， 使其向 vision Transformer 的设计看齐， 并且发现了几个关键的组件导致性能上的差异。

完全由标准ConvNet模块构建，ConvNeXts在准确性和可扩展性方面优于transformer，实现了87.8%的ImageNet准确度，在COCO检测和ADE20K分割方面优于Swin transformer，同时保持了标准ConvNet的简单性和效率。

# Conclusion

在21世纪20年代，视觉 Transformer，特别是像Swin Transformer 这样的层次结构的 Transformer，开始取代卷积网络，成为通用视觉主干的首选。

人们普遍认为视觉 Transformer 比卷积网络更精确、更高效、更可扩展。

这篇文章提出了ConvNeXts，一个纯粹的卷积模型，可以在多个计算机视觉基准上与最先进的层次化视觉 Transformer 竞争，同时保持了标准卷积网络的简单性和效率。

在某些方面，观察的结果令人惊讶，虽然ConvNeXt模型本身并不是全新的，但在过去十年中，许多设计选择都是单独研究的，而不是集体研究的。