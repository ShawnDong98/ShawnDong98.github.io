---
layout:     post
title:      "【NIPS 2022】SatMAE：Pre-training Transformers for Temporal and Multi-Spectral Satellite Imagery"
subtitle:   ""
date:       2024-01-07
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - NIPS 2022
    - 深度学习
---

# Abstract

无监督预训练方法用于大型视觉模型已显示出在下游监督任务上提高性能的潜力。

为卫星图像开发类似技术提供了重大机遇，因为未标记数据丰富，其固有的时间和多光谱结构提供了进一步改进现有预训练策略的途径。

在本文中，我们介绍了SatMAE，这是一个基于 Masked Autoencoder（MAE）的时序或多光谱卫星图像预训练框架。

为了利用时间信息，我们在跨时间独立掩蔽图像块的同时加入了 temporal embedding。

此外，我们证明将多光谱数据编码为具有不同光谱位置编码的波段组是有益的。

我们的方法在基准数据集上的监督学习性能（高达7%）和下游遥感任务的迁移学习性能方面均显著优于以往的最新技术，包括土地覆盖分类（高达14%）和语义分割。