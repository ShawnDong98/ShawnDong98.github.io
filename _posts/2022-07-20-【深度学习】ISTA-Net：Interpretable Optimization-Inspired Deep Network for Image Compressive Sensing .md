---
layout:     post
title:      "【深度学习】ISTA-Net: Interpretable Optimization-Inspired Deep Network for Image Compressive Sensing "
subtitle:   ""
date:       2022-07-20
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - CVPR 2018
---

# Abstract 
为了开发一种快速而精确的自然图像压缩感知(CS)重建算法，这篇文章结合了现有两类压缩感知方法的优点: 传统基于优化的方法在结构上的深刻见解和近年来基于网络的方法的速度。

具体地说，这篇文章提出了一种新的结构化深度网络，称为ISTA- net，它的灵感来自于迭代收缩阈值算法(ISTA)，用于优化一般的1范数CS重建模型。

为了将ISTA塑造成深度网络形式，这篇文章开发了一种有效的策略来解决与 sparsity-inducing regularizer 相关的近端映射，使用非线性变换。

ISTA-Net中的所有参数(如非线性变换、收缩阈值、步长等)都是端到端学习的，而不是手工制作的。

此外，考虑到自然图像的残差具有更强的可压缩性，提出了残差域的ISTA-Net增强版ISTA-Net +，进一步改善了CS重建。

大量CS实验表明，提出的ISTA-Nets在保持快速计算速度的同时，在很大程度上优于现有的基于优化和基于网络的CS方法。

# Conclusion

受迭代收缩阈值算法(ISTA)的启发，这篇文章提出了一种用于图像压缩感知(CS)重建的新型结构化深度网络(ISTA-Net)及其增强版本ISTA-Net +。

所提出的 ISTA-Net具有良好的可解释性，并充分利用了基于优化和基于网络的CS方法的优点。

ISTA-Nets中的所有参数都是端到端学习的。
