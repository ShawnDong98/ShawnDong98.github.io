---
layout:     post
title:      "【ICCV 2023】DARSR：Learning Correction Filter via Degradation-Adaptive Regression for Blind Single Image Super-Resolution"
subtitle:   ""
date:       2023-12-04
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - ICCV 2023
    - 深度学习
---

# Abstract

尽管现有的图像深度学习超分辨率（SR）方法在标准数据集上取得了有希望的性能，但是当低分辨率（LR）输入的退化未在训练中覆盖时，它们仍然会遭受严重的性能下降。

为了解决这个问题，我们提出了一种创新的无监督方法：通过退化自适应回归学习校正滤波器，用于盲目单图像超分辨率。

我们的方法高度受到广义采样理论的启发，旨在增强现有SR方法在已知退化上的训练强度，并适应未知的复杂退化，以产生改进的结果。

具体而言，我们首先通过GAN以无监督的方式学习内部分布，对每个局部图像区域进行退化估计。

我们不是假设退化在整个图像上空间不变，而是通过一种新的线性组合像素退化自适应回归模块（DARM）以空间变化的方式学习校正滤波器，将退化调整为已知退化。

DARM 轻量且易于在多个预定义滤波器基础上进行优化。在合成和真实世界数据集上的大量实验验证了我们方法的有效性，无论是定性还是定量。

