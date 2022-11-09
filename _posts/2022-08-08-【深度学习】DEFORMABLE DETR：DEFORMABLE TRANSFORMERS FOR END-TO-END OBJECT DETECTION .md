---
layout:     post
title: '【深度学习】Deformable DETR：Deformable Transformers for End-to-End Object Detection'
subtitle:   ""
date:       2022-08-08
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - Detection
    - ICLR 2021
---

# Abstract

最近提出的目标检测剔除了许多手工设计的组件，同时展示了良好的性能。

然而，由于Transformer注意模块在处理图像特征映射时的局限性，导致其收敛速度慢，特征空间分辨率有限。

为了缓解这些问题，这篇文章提出了 Deformable DETR，其注意力模块只关注参考点周围的一小组关键采样点。

Deformable DETR 比 DETR(特别是在小物体上)可以在少10x 训练时间的情况下获得更好的性能。

在COCO基准上的大量实验证明了该方法的有效性。


# Method

## Deformable Transformers for End-to-End Object Detection

**Deformable Attention Module.**  在图像上应用 Transformer attention特征图的核心问题是，它将查看所有可能的空间位置。为了解决这个问题， 作者提出 deformable attention 模块。


## 

# Conclusion

Deformable DETR 是一种高效、快速收敛的端到端目标检测方法。

它使我们能够探索更有趣和更实用的端到端物体探测器。

Deformable DETR 的核心是多尺度的 deformable attention 模块，它是处理图像特征图的一种有效的注意力机制。