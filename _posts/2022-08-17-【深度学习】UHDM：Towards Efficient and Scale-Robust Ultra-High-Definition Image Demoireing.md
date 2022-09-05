---
layout:     post
title:      "【深度学习】UHDM：Towards Efficient and Scale-Robust Ultra-High-Definition Image Demoireing"
subtitle:   ""
date:       2022-08-17
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - low-level CV
    - ECCV 2022
---

# Abstract

随着移动设备的快速发展，现代广泛使用的手机通常允许用户捕捉4K分辨率(即超高清)的图像。

然而，对于 low-level 视觉中具有挑战性的图像demoireing，现有的工作多是在低分辨率或合成图像上进行的。

因此，这些方法在4K分辨率图像上的有效性仍然未知。

这篇文章研究了一种用于超高清图像的 moire pattern 去除方法。

为此，作者提出了第一个超高清demoireing 数据集(UHDM)，其中包含5000对真实世界的4K分辨率图像，并对当前最先进的方法进行了基准研究。

此外，作者提出了一个有效的基线模型 ESDNet 来处理4K moire图，其中作者构建了一个语义对齐的尺度感知模块来处理 moire 图的尺度变化。

大量的实验证明了该方法的有效性，它在很大程度上优于最先进的方法，同时更轻量级。

# Conclusion

这篇文章为了探索更实用但更具挑战性的4K图像演示场景，提出了第一个真实世界的超高清 demoireing 数据集(UHDM)。

在此基础上，对现有方法进行了基准研究和局限性分析，提出了一种轻量级语义对齐尺度感知模块(SAM)，在不增加计算量的前提下增强模型的多尺度能力。

通过在一个简单的编码器-解码器骨干网络的不同深度利用SAM，作者开发了 ESDNet 来有效地处理 4K 高分辨率图像的演示。

该方法计算效率高，易于实现，在四个基准 demoireing 数据集(包括UHDM)上实现了最先进的结果。