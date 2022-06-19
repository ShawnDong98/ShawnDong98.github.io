---
layout:     post
title:      "【深度学习】MST++: Multi-stage Spectral-wise Transformer for Efficient Spectral Reconstruction"
subtitle:   ""
date:       2022-06-19
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - HSI
    - CVPRW 2022
---

# Abstract

现有的光谱重建方法主要集中在设计更深或更宽的卷积神经网络(CNNs)来学习从RGB图像到其高光谱图像(HSI)的端到端映射。

这些基于CNN的方法实现了令人印象深刻的恢复性能，同时显示在捕获远程依赖和自相似性之前的局限性。

为了解决这一问题， 这篇文章提出了一种新的基于 Transformer 的方法，Multi-stage Spectral-wise Transformer (MST + +)，用于高效的光谱重建。

特别地，这篇文章采用了基于 HSI 空间稀疏而光谱自相似特性的 Spectral-wise Multi-head Self-Attention (S-MSA) 组成基本单元—— Spectral-wise Attention Block(SAB)。

# Conclusion