---
layout:     post
title:      "【深度学习】No-Reference Hyperspectral Image Quality Assessment via Quality-Sensitive Features Learning"
subtitle:   ""
date:       2023-04-25
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - HSI
---

# Abstract

评估重建的高光谱图像（HSI）的质量对恢复和超分辨率具有重要意义。

目前的图像质量评估方法，如峰值信号噪声比，需要原始参考图像的可用性，这在现实中通常不可用。

在本文中，我们提出了一种基于 quality-sensitive features extraction 的无参考高光谱图像质量评估。

在光谱和空间域分析原始和扭曲的HSI之间的统计属性差异，然后提取对图像质量敏感的多个统计特征。

通过结合所有这些统计特征，我们从原始的高光谱数据集中学习了一个多元高斯（MVG）模型作为基准。

为了评估重建的 HSI 的质量，我们将其划分为不同的局部块，并在每个块上拟合一个MVG模型。