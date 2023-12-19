---
layout:     post
title:      "【TMM 2023】DADF-Net：Degradation-aware Dynamic Fourier-based Network For Spectral Compressive Imaging"
subtitle:   ""
date:       2023-12-19
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - TMM 2023
    - 深度学习
---

# Abstract

我们考虑了高光谱图像（HSI）重建问题，旨在从通过编码孔径快照光谱成像（CASSI）系统获得的二维压缩HSI测量中恢复三维高光谱数据。现有的深度学习方法在HSI重建方面已经取得了可接受的结果。然而，这些方法没有考虑成像系统的退化模式。在本文中，基于对通过移动和分割测量值获得的初始化HSI的观察，我们提出了一种基于退化学习的动态傅里叶网络，称为退化感知动态傅里叶网络（DADF-Net）。我们从退化的高光谱图像中估计退化特征图，以实现特征的线性变换和动态处理。特别是，我们使用傅里叶变换来提取HSI的非局部特征。广泛的实验结果表明，所提出的模型在仿真和现实世界的HSI数据集上均优于现有最先进的算法。