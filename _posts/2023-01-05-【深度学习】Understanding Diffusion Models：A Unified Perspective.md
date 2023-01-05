---
layout:     post
title:      "【深度学习】Understanding Diffusion Models: A Unified Perspective"
subtitle:   ""
date:       2023-01-05
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - Diffusion
---

# Background:ELBO,VAE,andHierarchicalVAE

对于许多模态，我们可以认为我们观察到的数据是由相关的看不见的隐变量表示或生成的，我们可以用随机变量 $z$ 表示。

## Evidence Lower Bound

从数学上讲，我们可以想象通过联合分布建模的隐变量和我们观察到的数据 $p(x, z)$。 基于似然的生成模型是学习一个模型最大化所有观测 $x$ 的似然 $p(x)$。 我们有两种方法可以操纵这种联合分布以恢复纯粹我们观察到的数据 $p(x)$的似然； 我们可以显式地将隐变量 $z$ 边缘化(marginalize )：

$$
p(x) = \int p(x, z) dz \tag{1}
$$

或者根据概率的链式法则：

$$
p(x) = \frac{p(x, z)}{p(z \mid x)} \tag{2}
$$

直接计算并且最大化似然 $p(x)$ 是困难的， 因为在等式1中需要所有的隐变量 $z$ ， 这在复杂的模型里是无迹可寻的， 或者在等式2中访问真实隐编码器 $p(z \mid x)$。 然而，使用这两个等式， 我们可以得到叫做 Evidence Lower Bound (ELBO) 的项。 在这种情况下，Evidence 被量化为观测数据的对数似然。然后，最大化 ELBO 成为优化隐变量模型的代理目标；在最好的情况下，当 ELBO 被参数化并完美优化时，它完全等同于 Evidence。形式上，ELBO的方程是：

$$
E_{q_{\phi}(z \mid x)} [\log \frac{p(x, z)}{q_\phi(z \mid x)}] \tag{3}
$$

为了明确与 evidence 的关系，我们可以用数学书写：

$$
\log p(x) \geq E_{q_{\phi}(z \mid x)}[\log \frac{p(x, z)}{q_\phi(z \mid x)}] \tag{4}
$$


$q_\phi(z \mid x)$ 是用参数 $\Phi$ 估计真实后验分布 $p(z \mid x)$ 的变分分布。 在 VAE 中，我们通过调整参数 $\Phi$ 增大下界以最大化 ELBO， 我们得到一个模型能够建模真实数据分布并从中采样， 因此我们学习了一个生成模型。现在， 让我们进一步理解为什么 ELBO 是我们想要最大化的目标。




## VariationalAutoencoders

## HierarchicalVariationalAutoencoders