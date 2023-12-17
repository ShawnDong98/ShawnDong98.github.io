---
layout:     post
title:      "【arXiv 2023】SINR：Spectral-wise Implicit Neural Representation for Hyperspectral Image Reconstruction"
subtitle:   ""
date:       2023-12-17
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    -  arXiv 2023
    - 深度学习
---

# Abstract

编码孔径快照光谱成像（Coded Aperture Snapshot Spectral Imaging, CASSI）重建旨在从二维测量数据中恢复三维空间光谱信号。

现有的高光谱图像（Hyperspectral Image, HSI）重建方法通常涉及从二维压缩图像到预设的离散光谱带集合的学习映射。

然而，这种方法忽略了光谱信息固有的连续性。

在本研究中，我们提出了一种创新方法，称为光谱隐式神经表示（Spectral-wise Implicit Neural Representation, SINR），作为解决此限制的 pioneering step。

SINR引入了一种连续的光谱放大过程，用于HSI重建，使得光谱超分辨率成为可能，并提供可定制的放大因子。

为此，我们利用了隐式神经表示的概念。具体来说，我们的方法引入了一种光谱级别的注意力机制，将各个通道视为独立的令牌，从而捕获全局光谱依赖性。

此外，我们的方法还包括两个组件，即傅里叶坐标编码器和光谱尺度因子模块。

傅里叶坐标编码器增强了SINR强调高频分量的能力，而光谱尺度因子模块指导SINR适应变化的光谱通道数量。

值得注意的是，SINR框架通过容纳希望输出中无限数量的光谱带，增强了CASSI重建的灵活性。

大量实验表明，我们的SINR优于基线方法。通过在CASSI框架内实现连续重建，我们朝着将隐式神经表示整合到该领域的初步目标迈出了一大步。

