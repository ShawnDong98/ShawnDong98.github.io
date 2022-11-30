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
# Conclusion

