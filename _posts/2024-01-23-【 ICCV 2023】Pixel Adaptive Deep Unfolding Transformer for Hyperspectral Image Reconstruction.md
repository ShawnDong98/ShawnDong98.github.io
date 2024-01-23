---
layout:     post
title:      "【 ICCV 2023】Pixel Adaptive Deep Unfolding Transformer for Hyperspectral Image Reconstruction"
subtitle:   ""
date:       2024-01-23
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - ICCV 2023
    - 深度学习
---

# Abstract

高光谱图像（HSI）重建在深度展开框架的推动下取得了令人满意的进展，该框架通过将问题分解为数据模块和先验模块。

然而，现有方法仍然面临与HSI数据匹配不足的问题。问题主要存在于三个方面：

1）数据模块中使用了固定的梯度下降步骤，而HSI的降解在像素级上是不可知的。

2）对于3D HSI立方体，先验模块不足够。

3）在不同阶段忽略了特征差异的阶段交互。

为解决这些问题，在这项工作中，我们提出了一种适用于HSI重建的像素自适应深度展开 Transformer（PADUT）。

在数据模块中，采用像素自适应下降步骤，以关注像素级的不可知退化。

在先验模块中，我们引入了非局部光谱 Transformer（NST）来强调HSI的3D特性以便恢复。

此外，受到不同阶段和深度中特征多样性表达的启发，通过快速傅里叶变换（FFT）改进了阶段交互。

在模拟和真实场景的实验结果都表明，我们的方法与最先进的HSI重建方法相比具有优越的性能。

