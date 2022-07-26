---
layout:     post
title:      "【深度学习】GAP-CCoT：Snapshot spectral compressive imaging reconstruction using convolution and contextual Transformer"
subtitle:   ""
date:       2022-07-26
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - HSI
    - Optica 2022
---


# Abstract

光谱压缩成像(Spectral compression imaging, SCI)是将高维的高光谱图像编码为二维的快照 measurement，然后利用算法重建空间-光谱数据立方。

这篇文章提出了一种混合网络模块，即convolution 和 contextual Transformer(CCoT)，它可以同时获得卷积的 inductive bias 能力和 Transformer 强大的建模能力，有利于提高重构质量，恢复细节。

作者将提出的 CCoT 块集成到一个基于 generalized alternating projection(GAP)算法的物理驱动的深度展开框架中，并进一步提出GAP-CCoT网络。

最后，作者将GAP-CCoT算法应用于SCI重建。通过对大量的生成数据和真实数据进行实验，所提出的模型比现有的SOTA算法实现了更高的重构质量(在模拟基准数据集上 >2dB 峰值信噪比)和更短的运行时间。

# Conclusion