---
layout:     post
title:      "【深度学习】Generative Modeling by Estimating Gradients of the Data Distribution"
subtitle:   ""
date:       2023-01-03
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - Diffusion
---

这篇博客文章关注的是生成建模的一个有前途的新方向。我们可以在大量的噪声扰动数据分布上学习分数函数(对数概率密度函数的梯度)，然后用朗之万型采样生成样本。这种生成模型方法通常被称为基于分数的生成模型，与现有模型家族相比具有几个重要的优势:无需对抗性训练的 GAN 级样本质量，灵活的模型架构，精确的对数似然计算，以及无需重新训练模型的逆问题解决。

# Introduction

现有的生成建模技术可以根据它们表示概率分布的方式大致分为两类。

- **基于似然的模型**， 通过(近似)最大似然直接学习分布的概率密度(或质量)函数。典型的基于似然的模型包括自回归模型、归一化流模型、基于能量的模型(EBMs)和变分自编码器(VAEs)。
- **隐式生成模型**， 其中概率分布隐式地表示为采样过程的模型。最突出的例子是生成对抗网络(GANs)，其中通过使用神经网络转换随机高斯向量来合成来自数据分布的新样本。

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1672728011571.png)

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1672728032162.png)
然而，基于似然的模型和隐式生成模型都有很大的局限性。基于似然的模型要么需要对模型架构进行严格限制，以确保可处理的归一化常数用于似然计算，要么必须依赖代理目标来近似最大似然训练。另一方面，隐式生成模型通常需要对抗性训练，这是出了名的不稳定，并可能导致模式崩溃。

在这篇博文中，将介绍另一种表示概率分布的方法，这种方法可能会规避这些限制。关键思想是对对数概率密度函数的梯度进行建模，这个量通常被称为(Stein)分数函数。这种基于分数的模型不需要有可处理的归一化常数，可以通过分数匹配直接学习。

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1672728173019.png)

基于分数的模型已经在许多下游任务和应用程序上实现了最先进的性能。这些任务包括图像生成(是的，比GANs更好!)、音频合成、形状生成和音乐生成。此外，基于分数的模型与归一化流模型有联系，因此允许精确的似然计算和表示学习。此外，建模和估计分数有助于逆问题的解决，应用如图像修补、图像着色、压缩感知和医学图像重建(例如，CT, MRI)。

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1672728261162.png)

这篇文章旨在向你展示基于分数的生成建模的动机和直觉，以及它的基本概念、属性和应用。


# The score function, score-based models, and score matching

假设我们有一个数据集 ${x_1, x_2，，x_N}$，其中每个点都独立于底层数据分布 $p(x)$ 。对于这个数据集，生成式建模的目标是将模型拟合到数据分布中，这样我们就可以通过从分布中采样来随意合成新的数据点。


为了建立这样一个生成模型，我们首先需要一种表示概率分布的方法。与基于似然的模型一样，其中一种方法是直接对概率密度函数(p.d.f.)或概率质量函数(p.m.f.)建模。设 $f_\theta(x) \in R$ 是一个由可学习参数 $\theta$ 参数化的实值函数。我们可以定义一个 p.d.f. 通过：

$$
p_\theta(x) = \frac{e^{-f_\theta(x)}}{Z_\theta}
$$

其中 $Z_\theta > 0$ 是依赖于 $\theta$ 的归一化常数，以便 $\int p_\theta(x) dx = 1$。 这里函数 $f_\theta(x)$ 通常被叫做未归一化的概率模型或者基于能量的模型。

我们可以训练 $p_\theta(x)$ 通过最大数据的对数似然：

$$
\max_\theta \sum_{i=1}^N  \log p_\theta(x_i)
$$
然而， 上式需要 $p_\theta(x)$ 被归一化概率密度函数。 这是不希望的， 因为为了计算 $p_\theta(x)$， 对于任意 $f_\theta(x)$， 我们必须评估规范化常数 $Z_\theta - a$， 这通常是无迹可寻的。 因此，为了使最大似然训练可行，基于似然的模型必须限制其模型架构(例如，自回归模型中的因果卷积，归一化流模型中的可逆网络)以使 $Z_\theta$ 有迹可循，或者近似归一化常数(例如，VAEs中的变分推理，或对比散度中使用的MCMC采样)，这可能计算成本很高。

通过对分数函数而不是密度函数建模，我们可以避免难以处理的常数归一化的困难。分布 $p(x)$ 的分数函数定义为：

$$
\nabla_x \log p(x)
$$

对这个分数函数建模的模型被叫做基于分数的模型， 表示为 $s_\theta(x)$。 基于分数的模型学习 $s_\theta(x) \approx \nabla_x \log p(x)$， 并且可以无需担心归一化常数被参数化。例如，我们可以很容易地用公式(1)中定义的基于能量的模型参数化基于分数的模型，通过：

$$
s_\theta(x) = \nabla_x \log p_\theta(x) = -\nabla_x f_\theta(x)  - \nabla_x \log Z_\theta = -\nabla_x f_\theta(x)
$$

注意到基于分数的模型 $s_\theta(x)$ 是独立于归一化常数 $Z_\theta$ 的。这极大地扩展了我们可以使用的模型家族，因为我们不需要任何特殊的结构来使规范化常数易于处理。

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1672729630091.png)

与基于似然的模型相似， 我们可以训练基于分数的模型通过最小化模型和数据分布之间的 Fisher divergence， 定义为：

$$
E_{p(x)} [\| \nabla_x \log p(x) - s_\theta(x)\|_2^2]
$$
直观地，Fisher散度比较了真实数据分数和基于分数的模型之间的 $\ell_2$ 平方距离。然而，直接计算这种差异是不可行的，因为它需要访问未知的数据分数 $\nabla_x \log p(x)$。 幸运的是，存在一种称为分数匹配的方法，可以在不知道真实数据分数的情况下最小化 Fisher divergence。分数匹配目标可以直接在数据集上估计，并使用随机梯度下降进行优化，类似于训练基于似然模型的对数似然目标(具有已知的归一化常数)。我们可以通过最小化分数匹配目标来训练基于分数的模型，而不需要对抗性优化。

此外，使用分数匹配目标为我们提供了相当大的建模灵活性。Fisher divergence 本身并不要求 $s_\theta(x)$ 是任何归一化分布的实际分数函数，它只是比较真实数据分数和基于分数的模型之间的 $\ell_2$ 距离，对 $s_\theta(x)$ 的形式没有额外的假设。事实上，对基于分数的模型的唯一要求是它应该是一个输入和输出维数相同的向量值函数，这在实践中很容易满足。

作为一个简短的总结，我们可以通过建模它的分数函数来表示一个分布，这个分布可以通过训练一个基于分数的自由形式架构模型来估计。




# Langevin dynamics

一旦我们有了训练好的基于分数的模型 $s_\theta(x) \approx \nabla_x \log p(x)$， 我们可以使用叫做郎之万采样的迭代的方式来从中采样。

郎之万采样提供 MCMC 过程以从分布 $p(x)$ 中采样， 仅需使用分数函数 $\nabla_x \log p(x)$。 特别地， 它从一个任意的先验分布 $x_0 \thicksim \pi(x)$ 初始化， 然后用以下方式迭代：

$$
x_{i+1} \leftarrow x_i + \epsilon \nabla_x \log p(x) + \sqrt{2 \epsilon} z_i, i = 0, 1, ..., K
$$

其中 $z_i \thicksim N(0, I)$ 。 当 $\epsilon \rightarrow 0$ 和 $K \rightarrow \infty$， $x_K$ 从上式中得到收敛到从 $p(x)$ 中采样的一个样本。在实践中，当 $\epsilon$ 足够小而 $K$ 足够大时，误差可以忽略不计。 


![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1672730681004.png)




注意到郎之万采样过程 $p(x)$ 仅通过 $\nabla_x \log p(x)$。 因为 $s_\theta(x) \approx \nabla_x \log p(x)$, 我们从基于分数的模型 $s_\theta(x)$ 中产生样本， 通过将其插入上式得到。


# Naive score-based generative modeling and its pitfalls

到目前为止，我们已经讨论了如何训练一个基于分数匹配的模型，然后通过朗之万采样生成样本。然而，这种朴素的方法在实践中收效有限，我们将讨论在以往的工作中很少注意到的分数匹配的一些陷阱。

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1672731063376.png)



关键的挑战是，在低密度区域，估计的分数函数是不准确的，在低密度区域，很少有数据点可用于计算分数匹配目标。这是预期的分数匹配最小化 Fisher divergence：

$$
E_{p(x)} [\| \nabla_x \log p(x) - s_\theta( x)\|_2^2] = \int p(x) \| \nabla_x \log p(x) - s_\theta \|_2^2 dx
$$
因为真实数据分数函数和基于分数的模型之间的 $\ell_2$ 差异被 $p(x)$ 加权， 当 $p(x)$ 很小的时候， 低密度区域很大程度上被忽视了。这种行为可能导致低于预期的结果，如下图所示：

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1672731522417.png)

当使用朗之万采样时，当数据位于高维空间时，初始样本极有可能位于低密度区域。


# Reference
1.[Generative Modeling by Estimating Gradients of the Data Distribution](https://yang-song.net/blog/2021/score/)