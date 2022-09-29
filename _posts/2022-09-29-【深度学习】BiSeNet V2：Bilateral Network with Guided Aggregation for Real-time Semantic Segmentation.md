---
layout:     post
title:      "【深度学习】BiSeNet V2: Bilateral Network with Guided Aggregation for Real-time Semantic Segmentation"
subtitle:   ""
date:       2022-09-29
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - Arxiv 2020
    - Segmentation
---

# Abstract

低级细节和高级语义对语义分割任务都至关重要。然而，为了加快模型推断，当前方法几乎总是牺牲低层次的细节，这导致准确性大幅下降。

这篇文章提出分别处理这些空间细节和分类语义，以实现实时语义分割的高精度和高效率。

为此，作者提出了一个高效和有效的架构，在速度和准确性之间进行良好的权衡，称为双边分割网络（BiSeNet V2）。

该架构包括：

（i）具有宽通道和浅层的细节分支，以捕获低级细节并生成高分辨率表征；
（ii）语义分支，具有窄通道和深层以获得高级语义上下文。

由于减少了通道容量和快速下采样策略，语义分支是轻量的。

此外，作者设计了一个引导聚合层，以增强相互连接，并融合两种类型的表征。

此外，作者设计了一个 booster 训练策略， 旨在提高分割性能，而无需任何额外的推理成本。

# Concluding Remarks

作者观察到，语义分割任务需要低级细节和高级语义。

作者提出了一种新的架构来分别处理空间细节和类别语义，称为双边分割网络（BiSeNetV2）。

BiSeNetV2框架是一个通用架构，大多数卷积模型都可以实现。


