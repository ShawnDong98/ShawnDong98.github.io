---
layout:     post
title:      "【深度学习】DLTR：Computational Hyperspectral Imaging Based on Dimension-discriminative Low-rank Tensor Recovery"
subtitle:   ""
date:       2023-08-21
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - HSI
    - ICCV 2019
---

# Abstract

利用先验信息是计算高光谱成像中图像重建的基础。

现有方法通常将3D信号作为1D矢量展开，并以不分青红皂白的方式处理不同维度中的先验信息，这忽略了高光谱图像（HSI）的高维性，从而导致重建质量差。

在这个文章中，我们建议充分利用所需HSI的高维结构来提高重建质量。

我们首先通过利用HSI中的非局部相似性来构建高阶张量。

然后，我们提出了一个discriminative low-rank tensor recovery（DLTR）模型来自适应地描述每个维度中的结构先验。

通过将 DLTR 中的结构先验与系统成像过程集成，我们为HSI重建开发了一个优化框架，最终通过交替最小化算法得到解决。

使用合成和真实数据进行的广泛实验表明，我们的方法优于最先进的方法。

# Introduction

