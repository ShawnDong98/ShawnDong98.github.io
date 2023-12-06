---
layout:     post
title:      "【ICCV 2023】RC-LUT：Reconstructed Convolution Module Based Look-Up Tables for Efficient Image Super-Resolution"
subtitle:   ""
date:       2023-12-06
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - ICCV 2023
    - 深度学习
---

# Abstract

基于查询表（LUT）的方法在单图像超分辨率（SR）任务中已显示出极大的效能。

然而，先前的方法忽略了LUT受限感受野（RF）尺寸的本质原因，这是由于 vanilla 卷积中空间特征和通道特征的交互作用所致。它们只能通过线性增加LUT大小来增加RF。

为了在保持LUT尺寸的同时扩大RF，我们提出了一种新的重构卷积（RC）模块，它将通道计算和空间计算解耦。它可以被公式化为  $n^2$ 个一维LUT以保持 $n \times n$ 感受野，这显然比之前公式化的 $n \times n$ 维LUT要小得多。

我们的 RC 模块生成的 LUT 与 SR-LUT 基线相比，存储量减少了不到1/10000。

我们提出的基于重构卷积模块的LUT方法，称为RCLUT，能够将RF尺寸扩大9倍，超过了现有最先进的基于LUT的SR方法，并在五个流行的基准数据集上实现了卓越的性能。

此外，高效且稳健的RC模块可以作为插件，用于改进其他基于LUT的SR方法。