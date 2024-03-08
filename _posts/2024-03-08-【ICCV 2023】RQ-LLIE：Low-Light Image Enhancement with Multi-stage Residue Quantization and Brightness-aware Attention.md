---
layout:     post
title:      "【ICCV 2023】RQ-LLIE：Low-Light Image Enhancement with Multi-stage Residue Quantization and Brightness-aware Attention"
subtitle:   ""
date:      2024-03-08
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - ICCV 2023
    - 
---

# Abstract

暗光图像增强（LLIE）旨在恢复 illumination 并提高暗光图像的可见性。

传统的LLIE方法通常产生较差的结果，因为它们忽视了噪声干扰的影响。

基于深度学习的LLIE方法专注于学习低光图像与正常光图像之间的映射函数，该映射函数优于传统的LLIE方法。

然而，大多数基于深度学习的LLIE方法尚不能充分利用在训练数据集中由正常光图像提供的辅助先验指导。

在本文中，我们提出了一种基于亮度感知关注和残差量化码表的亮度感知网络，以利用正常光先验。

为了实现更自然和真实的增强，我们设计了一个查询模块，通过融合分支获取更可靠的正常光特征，并将它们与暗光特征融合。

此外，我们提出了一个亮度感知关注模块，以进一步提高网络对亮度的鲁棒性。

在真实和合成数据上的广泛实验结果表明，我们的方法优于现有的最先进方法。