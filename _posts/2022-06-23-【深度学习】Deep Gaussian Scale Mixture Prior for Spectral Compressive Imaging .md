---
layout:     post
title:      "【深度学习】Deep Gaussian Scale Mixture Prior for Spectral Compressive Imaging "
subtitle:   ""
date:       2022-06-23
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - HSI
    - CVPR 2021
---

# Abstract

在编码孔径快照光谱成像(CASSI)系统中，可以从捕获的压缩图像重构出真实世界的高光谱图像。

基于模型的HSI重构方法采用手工构建的先验来解决重构问题，但由于手工构建的先验表示能力较差，大多数方法的成功程度有限。

基于深度学习的方法直接学习压缩图像和 HSI 之间的映射，取得了更好的效果。

然而，为了获得满意的结果，设计一个强大的深度网络启发式算法是非常重要的。

这篇文章提出了一种新的基于最大后验(MAP)估计框架的HSI重建方法，使用学习到的高斯尺度混合(GSM)先验。

不同于现有的 GSM 模型使用手工制作的比例先验(例如，Jeffrey's 先验)，这篇文章通过深度卷积神经网络(DCNN)学习 scale 先验。

此外，这篇文章还提出利用DCNN 来估计 GSM 模型的 local means。

MAP 估计算法的所有参数和DCNN 参数通过端到端训练进行联合优化。

# Conclusion

这篇文章提出了一种编码孔径快照光谱成像的可解释高光谱图像重建方法。



