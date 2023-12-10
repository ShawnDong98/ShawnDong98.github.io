---
layout:     post
title:      "【CVPR 2023】Zero-Shot Noise2Noise：Efficient Image Denoising without any Data"
subtitle:   ""
date:       2023-12-10
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - CVPR 2023
    - 深度学习
---

# Abstract
近期，自监督神经网络在图像去噪方面表现出色。然而，当前的无数据集方法要么计算成本过高，需要一个噪声模型，或是图像质量不足。

在这项工作中，我们展示了一个简单的双层网络，无需任何训练数据或噪声分布的知识，就可以以低计算成本实现高质量图像去噪。

我们的方法受到了Noise2Noise和Neighbor2Neighbor的启发，且在去除逐像素独立噪声方面表现良好。


我们对人造噪声、现实世界相机噪声和显微镜噪声的实验表明，我们称之为 ZS-N2N（Zero Shot Noise2Noise）的方法通常比现有的无数据集方法性能更优，且成本更低，使其适用于数据稀缺和计算能力有限的使用案例。


# 3. Method

## 3.1. Background: Noise2Noise and Neigh- bour2Neighbour

监督去噪方法通常是神经网络 $f_\theta$，将噪声图像 $y$ 映射到干净图像 $x$ 的估计 $f_\theta (y)$ 。监督去噪方法通常在一对干净的图像 $x$ 和噪声测量 $y = x + e$ 上训练，其中 $e$ 是噪声。我们将监督降噪称为Noise2Clean（N2C）。

神经网络也可以对同一干净图像的不同噪声观测进行训练。Noise2Noise（N2N）[17]假设可以访问一组噪声图像 $y_1 = x + e_1, y_2 = x + e_2$。 