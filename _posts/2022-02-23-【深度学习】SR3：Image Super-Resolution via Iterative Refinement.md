---
layout:     post
title:      "【深度学习】SR3：Image Super-Resolution via Iterative Refinement"
subtitle:   ""
date:       2022-02-23
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - Diffusion
    - CVPR 2022
---

# Abstract

我们提出了SR3，一种通过重复优化实现图像超分辨率的方法。

SR3使去噪扩散概率模型适应条件图像生成，并通过随机迭代去噪过程执行超分辨率。


输出生成从纯高斯噪声开始，并使用训练在各种噪声级别进行去噪的 U-Net 模型迭代细化噪声输出。

SR3在不同放大系数、人脸和自然图像的超分辨率任务上表现出强大的性能。

我们与SOTA GAN方法相比，对CelebA-HQ的标准8倍面超分辨率任务进行人类评估。

SR3实现了接近50%的愚弄率，这表明了逼真的输出，而GAN不超过34%的愚弄率。

我们进一步展示了SR3在级联图像生成中的有效性，其中生成模型与超分辨率模型链接，在ImageNet上产生了11.3的竞争性FID分数。


# Conditional Denoising Diffusion Model


给定一个输出-输出图像对的数据集， 表示为 $D = {x_i, y_i}_{i=1}^N$， 其表示从未知条件分布 $p(y \mid x)$ 中采样。这是一个 one-to-many  的映射， 单个源图像可能对应多个目标图像。我们的目标是通过一个随机迭代优化学习一个参数化估计 $p(y \mid x)$，其将一个源图像 $x$ 映射为一个目标图像 $y \in R^d$。  作者通过将 DDPM 变成一个条件图像生成来实现这个目标。