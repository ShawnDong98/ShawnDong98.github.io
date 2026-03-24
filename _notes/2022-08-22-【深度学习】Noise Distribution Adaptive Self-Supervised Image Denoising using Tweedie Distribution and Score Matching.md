---
layout:     post
title: 【深度学习】Noise Distribution Adaptive Self-Supervised Image Denoising using Tweedie Distribution and Score Matching
subtitle:   ""
date:       2022-08-22
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - low-level CV
    - CVPR 2022
---

# Abstract

Tweedie分布是 exponential dispersion 模型的一种特殊情况，通常作为广义线性模型的分布在经典统计中使用。

这里， 作者展示了 Tweedie 分布在深度学习时代也扮演者重要角色， 使得在没有 clean reference images 情况下实现 distribution adaptive self-supervised image denosing。

具体来说，通过结合最近的Noise2Score自监督图像去噪方法和Tweedie分布的鞍点逼近，作者提供了一个通用的闭形式去噪公式，可以用于大类噪声分布，而无需知道潜在的噪声分布。

与原始的Noise2Score类似，新方法由两个连续步骤组成：score matching 使用扰动的噪声图像， 接着一个 closed form 的 image denosing 公式， 其通过分布独立的 Tweedie 公式得到。

此外，给定的图像数据集， 作者展示了一个系统的算法来估计噪声模型和噪声参数。

通过大量的实验，证明了所提出的方法可以准确地估计噪声模型和参数，并在基准数据集和真实数据集中提供最先进的自监督图像去噪性能。

# Conclusion

这篇文章提供了一种新的自监督盲图像去噪框架，它不需要干净的数据和噪声模型和等级的先验知识。

作者的创新来自于Tweedie分布的鞍点近似，它涵盖了广泛的指数族分布。

利用这一特性，作者给出了一个通用的去噪公式，可用于现实生活中的各种分布。

此外，作者提出了一种新的算法，可以在统一的框架内估计噪声模型和噪声级参数。

最后，使用基准和真实CT图像数据集验证了所提方法，并证实该方法优于现有的最先进的自监督学习方法。

