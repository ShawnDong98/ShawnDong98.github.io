---
layout:     post
title:      "【深度学习】Denoising Diffusion Models for Plug-and-Play Image Restoration"
subtitle:   ""
date:       2023-06-19
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - CVPRW 2023
---

# Abstract

即插即用图像恢复（IR）已被广泛认为是解决各种逆问题的灵活和可解释的方法，通过使用任何现成的去噪器作为隐式图像先验。

然而，大多数现有方法都专注于判别式高斯去噪器。

尽管扩散模型在高质量图像合成方面表现出令人印象深刻的性能，但将它们作为插即用 IR 方法先验的生成去噪器的潜力仍有待进一步探索。

虽然还进行了几次其他尝试，以采用扩散模型进行图像恢复，但它们要么未能达到令人满意的结果，要么在推断期间通常需要数量不可接受的神经函数评估（NFE）。

这篇文章提出了DiffPIR，它将传统的即插即用方法集成到扩散采样框架中。

与依赖判别高斯去噪器的即插即用 IR 方法相比，DiffPIR将继承扩散模型的生成能力。

三个具有代表性的红外任务的实验结果，包括超分辨率、图像去模糊和内绘，表明 DiffPIR 在重建忠诚度和感知质量方面在 FFHQ 和 ImageNet 数据集上都实现了最先进的性能，不超过100个NFE。


# Introduction

最近的研究表明，即插即用图像恢复（IR）方法可以有效地处理各种低级视觉任务，如图像去噪[5]，图像超分辨率（SR）[16，17，37]，图像去模糊[12]和图像中绘画[27]，效果优异[6，11，54，57，58]。

在变量分裂算法的帮助下，如交替方向乘子法（ADMM）[4]和半四次分裂（HQS）[22]，即插即用IR方法将高斯去噪器集成到迭代过程中，从而提高了性能和收敛性。

即插即用 IR 方法的主要思想是将以下优化问题的数据项和先验项分开：

$$
\hat x = \arg \min_x \frac{1}{2\sigma_n^2} \| y - H(x) \|^2 + \lambda P(x) \tag{1}
$$

其中 $y$ 是给定退化模型 $y = H(x_0) + n$， 真实值 $x_0$ 的观测,  $H$ 是一致的退化操作， $\sigma_n$ 表示已知的独立同分布的高斯噪声 $n$ 的标准差， $\lambda P(·)$ 是带有正则参数 $\lambda$ 的先验项。 具体来说，数据项确保解遵守退化过程，而先验项强制执行解服从想要的数据分布。