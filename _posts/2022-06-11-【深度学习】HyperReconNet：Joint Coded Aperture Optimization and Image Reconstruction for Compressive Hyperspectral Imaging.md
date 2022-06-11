---
layout:     post
title:      "【深度学习】HyperReconNet: Joint Coded Aperture Optimization and Image Reconstruction for Compressive Hyperspectral Imaging"
subtitle:   ""
date:       2022-06-11
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - HSI
---

# Abstract
编码孔径快照光谱成像(CASSI)系统将三维高光谱图像编码到单个二维压缩图像中，然后采用逆优化算法重建底层高光谱图像，这种方法具有快照的明显优势，但通常重建精度较低。

为了提高精度，现有的方法要么尝试设计替代的编码孔径，要么尝试设计先进的重构方法，但无法通过统一的框架将两者联系起来，限制了精度的提高。

这篇文章提出了一种基于卷积神经网络的端到端方法，通过联合优化编码孔径和重构方法来提高精度。

一方面，基于CASSI前向模型的特点，设计了一种重复模式的编码孔径，其实体作为网络权值来学习。

另一方面，通过同时利用HSI内部的固有属性，以及跨空间和光谱维度的广泛相关性来进行重建。

通过利用深度学习的力量，编码孔径设计和图像重建通过一个统一的框架连接和优化。

# Conclusion and Discussion

这篇文章尝试引入带有CASSI的CNN，它可以同时优化编码孔径和重构HSI。从观测阶段开始，根据 CASSI 前向模型的性质，将编码孔径实体作为网络权值进行优化。从重建阶段开始，设计了两个子网络，以充分利用跨空间和光谱维度的相关性。通过利用深度学习的力量，编码孔径优化和HSI重建连接到一个统一的框架。