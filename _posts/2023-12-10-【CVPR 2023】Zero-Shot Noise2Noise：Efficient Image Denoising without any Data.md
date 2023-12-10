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

神经网络也可以对同一干净图像的不同噪声观测进行训练。Noise2Noise（N2N）[17]假设可以访问一组噪声图像 $y_1 = x + e_1, y_2 = x + e_2$， 其中 $e_1, e_2$ 是独立的噪声向量。 一个神经网络 $f_\theta$ 被训练用来最小化经验风险 $\frac{1}{n} \sum_{i=1}^n \|f_\theta(y_1^i) - y_2^i\|_2^2$。 这是有道理的，因为在这种有噪声的情况下，假设噪声均值为零，在监督的方法中训练网络将噪声图像映射到另一个噪声图像等价于将其映射到干净的图像，即：

$$
\arg \min_\theta \mathbb{E}[\| f_\theta(y_1) - x \|_2^2] = \arg \min_\theta \mathbb{E}[\| f_\theta(y_1) - y_2 \|_2^2]
$$

理论上，如果数据集无限大，N2N 训练达到与 N2C 训练相同的性能。在实践中，由于训练集的数量有限，N2N 略低于 N2C。例如，与使用 UNet 的 N2C 相比，在 50k 图像上使用 UNet 进行 N2N 训练的性能仅下降约0.02dB。

尽管 N2N 性能出色，但其可用性通常有限，因为很难获得同一静态场景的一对噪声图像。例如，被捕获的对象可能是非静态的，或者照明条件变化迅速。