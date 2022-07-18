---
layout:     post
title:      "【深度学习】COAST：COntrollable Arbitrary-Sampling NeTwork for Compressive Sensing"
subtitle:   ""
date:       2022-07-18
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - TIP 2021
---

# Abstract

近年来，基于深度网络的压缩感知(CS)方法取得了很大的成功。

但它们大多将不同的采样矩阵视为不同的独立任务，需要为每个目标采样矩阵训练特定的模型。

这种做法导致计算效率低下，泛化能力差。

这篇文章提出了一种新的 Controllable Arbitrary-Sampling Network ，称为COAST，用于解决单模型任意采样矩阵(包括不可见采样矩阵)的CS问题。

在优化启发的深度展开框架下，COAST展现出良好的可解释性。

在COAST中，提出了一种random projection augmentation(RPA)策略来提高采样空间的训练多样性，从而实现任意采样，并进一步开发了一种controllable proximal mapping network(CPMM)和 plug-and-paly deblocking(PnP-D)策略，分别动态调节网络特征和有效消除blocking artifacts。

在广泛使用的基准数据集上的大量实验表明，COAST不仅能够用单个模型处理任意采样矩阵，而且还能以快速的速度实现最先进的性能。
# Conclusion

