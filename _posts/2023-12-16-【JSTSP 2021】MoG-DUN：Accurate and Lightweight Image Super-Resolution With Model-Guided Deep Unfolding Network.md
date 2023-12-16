---
layout:     post
title:      "【JSTSP 2021】MoG-DUN：Accurate and Lightweight Image Super-Resolution With Model-Guided Deep Unfolding Network"
subtitle:   ""
date:       2023-12-16
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - JSTSP 2021
    - 深度学习
---

# Abstract

基于深度神经网络（DNNs）的方法在单图像超分辨率（SISR）方面取得了巨大成功。然而，现有的最先进的SISR技术设计得像黑盒子一样，缺乏透明度和可解释性。此外，视觉质量的提高往往是以增加模型复杂性为代价，由于黑盒设计。在本文中，我们提出并倡导一种名为模型引导的深度展开网络（MoG-DUN）的可解释方法，用于SISR。为了打破一致性障碍，我们选择与一个被广泛认可的图像先验模型合作，名为非局部自回归模型，并使用它来指导我们的DNN设计。通过将深度去噪和非局部正则化作为可训练模块整合到深度学习框架中，我们可以将基于模型的SISR的迭代过程展开为一个多阶段的构建块串联，包括三个相互连接的模块（去噪、非局部自回归和重建）。所有这三个模块的设计都利用了包括密集/跳跃连接以及快速非局部实现在内的最新进展。除了可解释性，MoG-DUN准确（产生较少的混叠伪影），计算高效（减少了模型参数），并且多功能（能够处理多种退化）。通过对多个流行数据集和各种退化场景的广泛实验，证明了所提出的MoG-DUN方法相对于现有的最先进的图像超分辨率方法，包括RCAN、SRMDNF和SRFBN的优越性。


# MODEL-BASED IMAGE INTERPOLATION AND RESTORATION

我们首先简要回顾了基于模型的图像插值（例如，NARM [26]）和图像恢复（例如，DPDNN [20]）的先前工作，为模型引导的网络设计奠定了基础。NARM模型在基于模型的图像插值（SISR的一种特殊情况，只涉及下采样而没有任何抗混叠低通滤波器）中实现了最先进的性能。去噪先验驱动的DNN（DPDNN）[20]代表了最新的MoG深度展开网络设计，其变体已被采用为我们研究中的基准方法。

## Nonlocal Auto-Regressive Model (NARM)


## Model-Based Image Restoration

非局部自回归模型背后的基本思想（参见图2）是通过重新定义邻域来扩展传统的自回归（AR）模型。对于给定的 patch $x_i$，NARM 寻求其在一组非局部（而非局部）邻域上的稀疏线性分解。遵循 [26] 中的记号，我们有：

$$
x_i \approx \sum_j w_i^j x_i^j
$$

其中 $x_{i}^j$ 表示在非局部邻域中找到的第 j 个相似补丁。扩展经典自回归模型的一个自然方法是构建以下正则化最小二乘问题：

