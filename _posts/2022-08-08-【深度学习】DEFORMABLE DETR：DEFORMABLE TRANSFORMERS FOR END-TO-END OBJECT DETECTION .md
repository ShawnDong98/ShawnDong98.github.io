---
layout:     post
title:      "【深度学习】DEFORMABLE DETR: DEFORMABLE TRANSFORMERS FOR END-TO-END OBJECT DETECTION "
subtitle:   ""
date:       2022-08-08
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - ICLR 2021
---

# Abstract

最近提出的目标检测剔除了许多手工设计的组件，同时展示了良好的性能。

然而，由于Transformer注意模块在处理图像特征映射时的局限性，导致其收敛速度慢，特征空间分辨率有限。

为了缓解这些问题，这篇文章提出了可变形的DETR，其注意力模块只关注参考点周围的一小组关键采样点。

Deformable DETR 比 DETR(特别是在小物体上)可以在少10x 训练时间的情况下获得更好的性能。

在COCO基准上的大量实验证明了该方法的有效性。

# Conclusion