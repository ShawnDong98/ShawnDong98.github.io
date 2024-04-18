---
layout:     post
title:      "【ICCV 2023】Pixel Adaptive Deep Unfolding Transformer for Hyperspectral Image Reconstruction"
subtitle:   ""
date:      2024-04-18
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - ICCV 2023
    - 
---
# Abstract

高光谱图像（HSI）重建在深度展开框架的指导下取得了令人满意的进展，将问题分解为数据模块和先验模块。

然而，现有方法仍然面临着与HSI数据匹配不足的问题。

问题存在于三个方面：

1）数据模块中的固定梯度下降步骤，而HSI的退化在像素级别是不可知的。

2）3D HSI立方体的先验模块不足。

3）阶段互动忽略了不同阶段特征的差异。

为了解决这些问题，在这项工作中，我们提出了一种适应像素的深度展开 Transformer（PADUT）用于HSI重建。

在数据模块中，采用像素自适应下降步骤，以便集中处理像素级别的不可知退化。

在先验模块中，我们引入了非局部光谱变换器（NST），以强调 HSI 的 3D 特征进行恢复。

此外，受到不同阶段和深度中特征多样表达的启发，通过快速傅立叶变换（FFT）改进了阶段互动。

在模拟和真实场景上的实验结果表明，与最先进的HSI重建方法相比，我们的方法表现出卓越的性能。

# Introduction

随着深度展开框架利用神经网络展开迭代优化算法，通常包括数据模块和先验模块。如图2所示，不同位置的3D立方体中的像素在测量中被压缩，而现有的算法忽视了数据模块中这种特定于像素的退化。对于先验模块，去噪器在多阶段优化中起着关键作用。由于HSI以3D表示，现有的去噪器仍然存在有效利用空间-光谱信息的问题。

![](https://markdown.xiaoshujiang.com/img/spinner.gif "[[[1713421299738]]]" )