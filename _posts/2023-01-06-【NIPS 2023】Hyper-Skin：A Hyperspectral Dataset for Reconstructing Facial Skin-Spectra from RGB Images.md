---
layout:     post
title:      "【NIPS 2023】Hyper-Skin: A Hyperspectral Dataset for Reconstructing Facial Skin-Spectra from RGB Images"
subtitle:   ""
date:       2024-01-06
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - NIPS 2023
    - 深度学习
---

# Abstract

我们介绍了 Hyper-Skin，这是一个覆盖从可见光谱 (VIS) （400nm - 700nm）到近红外光谱 (NIR) （700nm - 1000nm）的广泛波长范围的高光谱数据集，专门设计用于促进面部皮肤光谱重建研究。

通过从 RGB 图像重建皮肤光谱，我们的数据集使得在消费者设备上直接研究高光谱皮肤分析成为可能，如黑色素和血红蛋白浓度。

Hyper-Skin 克服了现有数据集的限制，包含了使用推扫式高光谱相机收集的多样化面部皮肤数据。

数据集包含来自 51 名受试者的 330 个高光谱立方体，涵盖了不同角度和面部姿态的面部皮肤。

每个高光谱立方体的尺寸为 1024×1024×448，每幅图像包含数百万个光谱向量。

该数据集严格遵守伦理指南，包括成对的高光谱图像和使用真实相机响应生成的合成 RGB 图像。

我们通过展示使用最先进模型在 VIS 和 NIR 光谱中重采样的 31 个波段的高光谱数据上进行的皮肤光谱重建，来证明我们数据集的有效性。

这个 Hyper-Skin 数据集将成为 NeurIPS 社区的宝贵资源，鼓励开发新算法进行皮肤光谱重建，同时促进高光谱皮肤分析相关的美容和皮肤健康方面的跨学科合作。
