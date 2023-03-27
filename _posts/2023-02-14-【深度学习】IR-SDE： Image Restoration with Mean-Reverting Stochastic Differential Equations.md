---
layout:     post
title:      "【深度学习】IR-SDE： Image Restoration with Mean-Reverting Stochastic Differential Equations"
subtitle:   ""
date:       2023-02-14
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - Diffusion
    - Arxiv 2023
---
# Abstract

这篇文章提出了一种用于通用图像恢复的随机微分方程（SDE）方法。

关键结构包括 mean-reverting SDE，将高质量图像转换为对应的退化图像， 其是固定高斯噪声的平均状态。

然后，通过模拟相应的反向时间SDE，我们能够恢复低质量图像的原图像，而无需依赖任何特定于任务的先验知识。

关键的是，所提出的均值 mean-reverting SDE 有一个闭式解，允许我们计算真实时间依赖的分数，并通过神经网络学习它。

此外，作者提出了一个最大概率目标来学习最佳反向轨迹，该轨迹稳定了训练并改善了恢复结果。

在实验中，作者证明提出的方法在 image deraining, deblurring, 和 denoising 的定量比较中实现了极具竞争力的性能，为两个 deraining 数据集取得了新的最先进的性能。

最后，通过图像 image super-resolution, inpainting 和 dehazing 的定性结果，进一步证明了该方法的通用性。

# Background

在本节中，我们简要回顾了基于SDE的扩散模型所依据的关键概念，并展示了使用反向时间SDE生成样本的过程。令 $p_0$ 表示数据的初始分布，$t \in [0, T]$ 表示连续时间变量。 我们考虑由 SDE 的扩散过程 ${x(t)}_{t=0}^T$, 

$$
dx = f(x, t) dt + g(t)dw, \quad x(0) \thicksim p_0(x), \tag{1}
$$

其中 $f$ 和 $g$ 是漂移和扩散函数， $w$ 是标准的 Wiener 过程， $x(0) \in R^d$ 是一个初始条件。 通常，最终状态 $x(T)$ 服从一个固定均值和方差的。 通常 SDE 的思路是逐渐将数据分布变换到固定的高斯噪声。我们可以通过模拟 SDE 在时间上的反向来反转这个过程来从噪声中采样数据。Anderson (1982) 表明一个 SDE 的反向时间表征由下式给定：

$$
dx = [f(x, t) - g(t)^2 \nabla_x \log p_t(x)]dt + g(t)d \hat w, \quad x(T) \thicksim p_T(x) \tag{2}
$$
其中 $\hat w$ 是反向时间 Wiener 过程， $p_t(x)$ 表示在时间 $t$ 时 $x(t)$ 的边缘概率密度函数。分数函数 $\nabla_x \log p_t(x)$ 通常无法得到， 因此基于 SDE 的扩散模型通过训练一个和时间相关的神经网络 $s_\theta(x, t)$ 来估计它。
