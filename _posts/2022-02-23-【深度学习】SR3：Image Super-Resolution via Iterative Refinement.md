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

条件 DDPM 模型在 $T$ 个优化步骤生成一个目标图像 $y_0$。 从一个噪声图像 $y_T \thicksim N(0, I)$ 开始， 模型通过学习到的条件转移分布 $p_\theta(y_{t-1} \mid y_t, x)$ ，连续的迭代 ($y_{T-1}, y_{T-2}, ..., y_0$) 迭代优化图像,  最终得到 $y_0 \thicksim p(y \mid x)$(见图2)。

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1677214043156.png)



推理链中中间图像的分布是用正向扩散过程定义的，该扩散过程通过固定的马尔可夫链逐渐将高斯噪声添加到信号中，表示为 $q(y_t \mid y_{t-1})$。 我们模型的目标是通过以 $x$ 为条件的反向马尔可夫链迭代地从噪声中恢复信号，从而逆转高斯扩散过程。原则上，每个前向过程步骤也可以以 $x$ 为条件，但我们把它留给未来的工作。我们使用神经去噪模型 $f_\theta$ 学习反向链，该模型将源图像和噪声目标图像作为输入，并估计噪声。我们首先概述了前向扩散过程，然后讨论了如何训练和用于推断我们的去噪模型 $f_\theta$。

## Gaussion Diffusion Process

我们首先定义了一个正向马尔可夫扩散过程 $q$ ，该过程通过 $T$ 迭代逐渐将高斯噪声添加到高分辨率图像 $y_0$ 中：

$$
y(y_{1:T} \mid y_0) = \prod_{t=1}^T q(y_t \mid y_{t-1}) \tag{1}
$$

$$
y(y_t \mid y_{t-1}) = N(y_t \mid \sqrt{\alpha}_t y_{t-1}, (1 - \alpha_t) I) \tag{2}
$$

其中， 标量参数 $\alpha_{1:T}$ 是超参数， 服从于 $1 < \alpha_t < 1$， 其决定了每次迭代添加噪声的方差。注意到 $y_{t-1}$ 由 $\sqrt{\alpha_t}$ 来确保随机变量的方差有界,当 $t \rightarrow \infty$。 例如， $y_{t-1}$ 的方差为1， $y_t$ 的方差也是1。 

重要的是， 给定 $y_0$ 我们可以确定 $y_t$ 的分布， 通过边缘化中间步骤：

$$
q(y_t \mid y_0) = N(y_t \mid \sqrt{\gamma_t}y_0, (1 - \gamma_t)I) \tag{3}
$$

其中 $\gamma_t = \prod_{i=1}^t \alpha_i$。 此外，给定 $(y_0, y_t)$ ， 通过一些代数操作和完全平方， 我们可以得到 $y_{t-1}$ 的后验分布：

$$
q(y_{t-1} \mid y_0, y_t) = N(y_{t-1} \mid \mu, \sigma^2 I) \\
\mu = \frac{\sqrt{\gamma_{t-1}}(1 - \alpha_t)}{1 - \gamma_t} y_0 + \frac{\sqrt{\alpha_t}(1 - \gamma_{t-1})}{1 - \gamma_t} y_t \\
\sigma^2 = \frac{(1 - \gamma_{t-1})(1 - \alpha_t)}{1 - \gamma_t} \tag{4}
$$

当参数化反向链并制定反向链对数似然的变分下限时，这种后验分布很有帮助。接下来，我们将讨论如何学习神经网络来反转这种高斯扩散过程。


##  Optimizing the Denoising Model

为了帮助逆扩散过程， 我们利用额外的源图像 $x$ 信息， 并且优化一个神经去噪模型 $f_\theta$， 其将源图像 $x$ 和噪声目标 $\tilde y$ 作为输入

$$
\tilde y = \sqrt{\gamma} y_0 + \sqrt{1 - \gamma} \epsilon, \quad \epsilon \thicksim N(0, I) \tag{5}
$$

目标位恢复无噪声的目标图像 $y_0$。 噪声目标图像 $\tilde y$ 的定义与 Eq. (3) 中前向过程不同步骤的噪声图像的边缘分布相似。

除了源图像 $x$ 和 噪声目标图像 $\tilde y$，  因为有噪声 $\gamma$ 的方差， 去噪模型 $f_\theta(x, \tilde y, \gamma)$ 有足够多的数据作为输入， 被训练用来预测噪声向量 $\epsilon$。 训练 $f_\theta$ 的目标函数为：

$$
E_{(x, y)} E_{\epsilon, \gamma} \| f_\theta(x, \sqrt{\gamma} y_0 + \sqrt{1 - \gamma} \epsilon, \gamma) - \epsilon \|_p^p \tag{6}
$$

其中 $\epsilon \thicksim N(0, 1)$， $(x, y)$ 从训练数据集中采样得到， $p \in {1, 2}$， 并且 $\gamma \in p(\gamma)$。 $\gamma$ 的分布对于模型和生成输出的质量和有大的影响。 我们在 2.4 节中讨论了 $p(\gamma)$ 的选择。 