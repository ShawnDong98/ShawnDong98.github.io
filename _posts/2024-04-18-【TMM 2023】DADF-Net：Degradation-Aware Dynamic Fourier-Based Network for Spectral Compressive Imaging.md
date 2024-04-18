---
layout:     post
title:      "【TMM 2023】DADF-Net：Degradation-Aware Dynamic Fourier-Based Network for Spectral Compressive Imaging"
subtitle:   ""
date:      2024-04-18
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - TMM 2023
    - 
---

# Abstract

我们考虑高光谱图像（HSI）重建问题，旨在从由编码孔径快照光谱成像（CASSI）系统获取的2D压缩HSI测量中恢复3D高光谱数据。

现有的深度学习方法在HSI重建中取得了可接受的结果。

然而，这些方法没有考虑到成像系统的退化模式。

在本文中，基于观察到的通过移动和分割测量获得的初始化HSI，我们提出了一种基于退化学习的动态傅里叶网络，称为退化感知动态傅里叶网络（DADF-Net）。

我们从退化的高光谱图像中估计退化特征图，以实现特征的线性转换和动态处理。

特别地，我们使用傅里叶变换来提取HSI的非局部特征。

大量实验结果表明，所提出的模型在模拟和实际HSI数据集上优于最先进的算法。