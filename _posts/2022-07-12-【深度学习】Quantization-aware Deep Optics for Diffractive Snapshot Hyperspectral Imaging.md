---
layout:     post
title: 【深度学习】Quantization-aware Deep Optics for Diffractive Snapshot Hyperspectral Imaging
subtitle:   ""
date:       2022-07-12
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - HSI
    - CVPR 2022
---

# Abstract

基于深度光学框架的衍射快照高光谱成像一直致力于捕捉动态场景的光谱图像。

然而，现有的深度光学框架由于衍射光学元件(DOE)制作过程中的量化操作，都存在光学硬件与重构算法不匹配的问题，导致高光谱成像在实际应用中性能有限。

这篇文章提出了一种用于衍射快照高光谱成像的量化感知深度光学技术。

在制造中使用的常见光刻技术需要量化 DOE 高度图到几个级别，并可以自由设置每个级别的高度。

因此，这篇文章提出将量化操作集成到 DOE 高度图优化中，并设计一种自适应机制来调整每个量化层次的物理高度。

根据优化结果，直接制作了量化DOE，构建了一个衍射高光谱快照成像系统。

该方法通过对DOE物理结构的量化操作的认识和适应，使制作的DOE与重建算法系统地匹配，使光学框架更加实用。

大量的综合仿真和实际硬件实验验证了该方法的优越性能。
# Conclusion