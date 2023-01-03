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

当使用朗之万采样时，当数据位于高维空间时，初始样本极有可能位于低密度区域。因此，拥有一个不准确的基于分数的模型将从程序的一开始就偏离朗之万采样，阻止它生成具有数据代表性的高质量样本。

# Score-based generative modeling with multiple noise perturbations

在数据密度低的地区，如何绕过精确评分的困难? 我们的解决方案是用噪声扰动数据点，并在噪声数据点上训练基于分数的模型。当噪声幅度足够大时，它可以填充低数据密度区域，以提高估计分数的准确性。例如，这是当我们扰动两个高斯混合信号时，会发生的情况，这些高斯信号被额外的高斯噪声扰动。

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1672731661313.png)

然而，另一个问题仍然存在:我们如何为扰动过程选择一个合适的噪声尺度？ 较大的噪声显然可以覆盖更多的低密度区域，以获得更好的得分估计，但它会过度破坏数据，使其与原始分布发生显著变化。另一方面，较小的噪声对原始数据分布的破坏较小，但不能像我们希望的那样覆盖低密度区域。为了达到两全其美，我们同时使用多个尺度的噪声扰动。假设我们总是用各向同性高斯噪声扰动数据，并让总共有 $L$ 个递增的标准差 $\sigma_1 < \sigma_2 < ... < \sigma_L$。 我们首先用每个高斯噪声 $N(0，\sigma_i^2 I)，i=1,2，，L$ 扰动数据分布 $p(x)$ ，得到一个噪声扰动分布。 

$$
p_{\sigma_i}(x) = \int p(y) N(x; y, \sigma_i^2 I) dy
$$
注意我们可以轻易地通过采样 $x \thicksim p(x)$ 和计算 $x + \sigma_i z, z \thicksim N(0, I)$ ， 从 $p_{\sigma_i} (x)$ 采样。

接下来， 我们估计每个噪声扰动分布的分数函数， $\nabla_x \log p_{\sigma_i}(x)$， 用分数匹配通过训练  Noise Conditional Score-Based Model $s_\theta(x, i)$(也叫做  Noise Conditional Score Network，NCSN)， 有:

$$
s_\theta(x, i) \approx \nabla_x \log p_{\sigma_i}(x) \quad \text{for all } i = 1, 2, ..., L
$$

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1672732196779.png)

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1672732229666.png)

$s_\theta(x, i)$的训练目标是对所有噪声尺度的 Fisher divergences 的加权和：

$$
\sum_{i=1}^L \lambda(i) E_{p_{\sigma_i}(x)} [\| \nabla_x \log p_{\sigma_i}(x) - s_\theta(x, i)\|_2^2]
$$


其中 $\lambda(i) \in R_{>0}$ 是一个正加权函数， 通常被选择为 $\lambda(i) = \sigma_i^2$ 。 上述目标用分数匹配优化， 正如朴素基于分数的模型 $s_\theta(x)$ 的优化。

在训练 noise-conditional score-based model $s_\theta(x, i)$ 后， 对于 $i = L, L -1, ..., 1$， 我们可以运行郎之万采样生成样本。这个方法叫做退火郎之万采样， 因为噪声尺度 $\sigma_i$ 随时间递减。

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1672732763540.png)

下面是一些实用的建议，用于调整具有多个噪声尺度的基于分数的生成模型：

- 选择 $\sigma_1 < \sigma_2 < ... < \sigma_L$ 作为几何级数， $\sigma_1$ 足够小， $\sigma_L$ 可与所有数据点之间的最大成对距离相比较。$L$ 通常是几百或几千的数量级。
- 参数化基于分数的模型 $s_\theta(x, i)$ 用 U-Net 跳跃连接。
- 在测试时使用基于分数的模型的权重上应用指数移动平均


通过这样的最佳实践，我们能够在各种数据集上生成与GANs质量相当的高质量图像样本，如下所示：

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1672733044575.png)
# Score-based generative modeling with stochastic differential equations (SDEs)

正如我们已经讨论过的，添加多个噪声尺度对于基于分数的生成模型的成功至关重要。通过将噪声尺度的数量推广到无穷大，我们不仅获得了更高质量的样本，而且还获得了精确的对数似然计算，以及用于逆问题求解的可控生成。

## Perturbing data with an SDE

当噪声尺度的数量接近无穷大时，我们本质上用不断增长的噪声水平扰乱数据分布。在这种情况下，噪声扰动过程是一个连续时间随机过程，如下所示：

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1672734606584.png)

我们如何用简洁的方式表示一个随机过程?许多随机过程(特别是扩散过程)是随机微分方程(SDEs)的解。通常，SDE具有以下形式：

$$
dx = f(x, t)dt + g(t)dw
$$

其中 $f(·, t): R^d \rightarrow R^d$ 是一个被叫做漂移系数的 向量-值 函数， $g(t) \in R$ 是一个叫做扩散系数的实值函数， $w$ 表示标准布朗运动， $dw$ 可以视为有限白噪声。


# Reference
1.[Generative Modeling by Estimating Gradients of the Data Distribution](https://yang-song.net/blog/2021/score/)