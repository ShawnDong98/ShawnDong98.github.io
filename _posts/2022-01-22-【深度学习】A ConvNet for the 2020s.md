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