---
layout:     post
title:      "【深度学习】DDPM：Denoising Diffusion Probabilistic Models"
subtitle:   ""
date:       2022-11-30
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     true
tags:
    - 深度学习
    - CVPR 2020
---

# Abstract

这篇文章使用扩散概率模型提出了高质量的图像合成结果，这是一类受非平衡热力学考虑启发的隐变量模型。

作者的最佳结果是通过根据扩散概率模型和与 Langevin dynamics 的去噪分数匹配之间的联系设计的加权变分界训练获得的，可以解释为自回归解码的推广。

在无条件的CIFAR10数据集中，作者获得了9.46的 Inception 分数和 3.17 的最先进的FID分数。

# Background

扩散模型是形式为 $p_\theta(x_0) := \int p_\theta(x_{0:T})dx_{1:T}$ 的隐向量模型， 其中 $x_1, ..., x_T$ 是与数据 $x_0 \thicksim q(x_0)$ 相同维度隐向量。 联合分布 $p_\theta(x_{0:T})$ 被叫做逆过程。

# Diffusion models and denoising autoencoders


# Conclusion

作者使用扩散模型提出了高质量的图像采样，并发现了扩散模型和变分推断之间的联系， 该变分推断用于训练马尔可夫链、去噪分数匹配和annealed Langevin dynamics（以及扩展的基于能量的模型）、自回归模型和  progressive lossy compression。

由于扩散模型似乎对图像数据具有出色的归纳偏置，作者期待着研究它们在其他数据模态中的效用，以及作为其他类型生成模型和机器学习系统中的组成部分的实用性。

