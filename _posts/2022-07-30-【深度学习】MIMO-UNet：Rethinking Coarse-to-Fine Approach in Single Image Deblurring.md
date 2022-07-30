---
layout:     post
title:      "【深度学习】MIMO-UNet：Rethinking Coarse-to-Fine Approach in Single Image Deblurring"
subtitle:   ""
date:       2022-07-30
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - ICCV 2021
---

# Abstract

从粗到细的策略被广泛应用于单幅图像去模糊网络的架构设计中。

传统的方法通常是将多尺度输入图像叠加在子网络中，从下到上逐步提高图像的锐度，这必然带来较高的计算成本。

为了实现快速准确的去模糊网络设计，这篇文章重新审视了粗到细的策略，并提出了一个多输入多输出的U-net (MIMO-UNet)。

MIMO-UNet 有三个明显特征:

- 首先，MIMO-UNet的单编码器采用多尺度输入图像，降低训练难度。
- 其次，MIMO-UNet的 single decoder 使用 single U-shape 网络输出多幅不同尺度的去模糊图像来模拟 multi-cascaded U-net 网络。
- 最后，引入非对称特征融合，实现多尺度特征的高效融合。

在GoPro和Real-Blur数据集上的大量实验表明，所提出的网络在准确性和计算复杂度方面都优于最先进的方法。

# Conclusion

