---
layout:     post
title:      "【深度学习】Come-Closer-Diffuse-Faster: Accelerating Conditional Diffusion Models for Inverse Problems through Stochastic Contraction"
subtitle:   ""
date:       2023-03-31
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - Diffusion
    - CVPR 2022
---

# Abstract

由于其作为生成模型的强大性能，扩散模型最近在社区中引起了极大的兴趣。

此外，它对逆问题的应用已经证明了最先进的性能。

不幸的是，扩散模型有一个关键的缺点——它们本质上采样速度很慢，需要几千个迭代步骤才能从纯高斯噪声中生成图像。

在这项工作中，我们表明从高斯噪声开始是不必要的。

相反，从具有更好初始化的单个正向扩散开始，显著减少了反向条件扩散中的采样步骤数量。

这种现象被正式解释为随机差分方程的 contraction 理论，例如我们的条件扩散策略——反向扩散的交替应用，然后是 non-expansive data consistency 步骤。

被称为 Come-Closer-Diffuse-Faster（CCDF）的新采样策略也揭示了关于逆问题现有前馈神经网络方法如何与扩散模型协同结合的新见解。

超分辨率、图像绘画和压缩感知 MRI 的实验结果表明，我们的方法可以在显著减少采样步骤的情况下实现最先进的重建性能。

# Background

## Score-based Diffusion Models

## Discrete Forms of SDEs

# Main Contribution

## The CCDF Algorithm

我们的CCDF加速方案的目标是使反向扩散从 $N′ := N_{t0} < N$ 开始，以便可以显著减少反向扩散步数。为此，我们的CCDF算法由两个步骤组成：向前扩散到 $N′$，具有更好的初始化 $x_0$，然后是反向条件扩散到 $i = 0$。

具体来说，对于给定的初始估计 $x_0$，正向扩散过程可以通过单步扩散执行，如下所示：

$$
x_{N'} = a_{N'} x_0 + b_{N'} z \tag{12}
$$


$z \thicksim N(0, I)$， 并且 $a_{N'}, b_{N'}$ 对于 SMLD 和 DDPM 可以使用 (10) 和 (5) 分别对每个扩散模型计算。

至于条件扩散模型， SRdiff 和 SR3 是用于超分辨的特殊例子， 其将低分辨图像拼接作为输入。然而，这些方法试图重新设计分数函数，以便可以从条件分布中采样，从而导致一个非常复杂的公式。
