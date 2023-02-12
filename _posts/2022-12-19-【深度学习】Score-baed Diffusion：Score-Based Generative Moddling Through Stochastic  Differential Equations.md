---
layout:     post
title:      "【深度学习】Score-baed Diffusion：Score-Based Generative Moddling Through Stochastic  Differential Equations"
subtitle:   ""
date:       2022-12-19
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     true
tags:
    - 深度学习
    - Diffusion
    - ICLR 2021
---

# Abstract

从数据中创建噪声很容易；从噪声中创建数据是生成建模。

这篇文章提出了一个随机微分方程（SDE），通过缓慢注入噪声将复合数据分布平稳转换为已知的先验分布，以及相应的反向时间SDE，通过缓慢消除噪声将先验分布转换回数据分布。

至关重要的是，反向时间 SDE 仅取决于扰动数据分布的时间依赖梯度场（又名分数）。

通过利用基于分数的生成建模的进步，可以使用神经网络准确估计这些分数，并使用数值SDE求解器生成样本。

作者表明，该框架概括了以前基于分数的生成建模和扩散概率建模的方法，使得新的采样程序和新的建模能力。

特别是，作者引入了一个预测器-校正器框架，以纠正离散反向时间SDE演变中的错误。

作者还推导出了等效的神经ODE，该样本来自与SDE相同的分布，但还实现了精确的似然计算，并提高了采样效率。

此外，作者提供了一种解决基于分数的模型反向问题的新方法，如类条件生成、图像绘画和着色实验所证明的那样。

结合多种架构改进，作者在CIFAR-10上实现了无条件图像生成的破纪录性能，Inception score 为 9.89，FID为2.20，competitive likelihood 为2.99 bits/dim，并首次从基于分数的生成模型中演示了 $1024 \times 1024$ 图像的高保真生成。


# Introduction

两类成功的概率生成模型涉及以缓慢增加的噪声顺序损坏训练数据，然后学习扭转这种损坏，以生成数据。Score matching with Langevin dynamics (SMLD) 在每个噪声尺度估计 score (数据对数概率密度的梯度)， 然后在生成过程中使用郎之万采样从一系列离散噪声尺度中采样样本。Denoising diffusion probabilistic modeling (DDPM) 训练一系列概率模型逆转噪声损坏的每一步，使用你分部的函数形式的知识使得训练可追溯。对于连续状态空间，DDPM 训练目标隐式计算每个噪声尺度的分数。因此，将这两个模型类称为基于分数的生成模型。

基于分数的生成模型和相关技术已被证明在生成图像、音频、图形和形状方面是有效的。为了启用新的采样方法并进一步扩展基于分数的生成模型的能力，作者提出了一个统一的框架，通过随机微分方程（SDE）泛化之前的方法。

具体来说，作者考虑的是，根据扩散过程随着时间的推移而演变的连续分布，而不是用有限数量的噪声分布扰动数据。这个过程逐渐将数据点扩散到随机噪声中，并由指定的 SDE 给出，该 SDE 不依赖于数据，也没有可训练参数。通过逆转这个过程，我们可以将随机噪声平稳地塑造成数据，以便生成样本。至关重要的是，这个反向过程满足反向时间 SDE，将边缘概率密度作为时间函数的分数，可以从前向SDE导出。因此，我们可以通过训练时间依赖的神经网络来估计分数，然后使用数值 SDE 求解器生成样本，来近似反向时间 SDE。关键思想总结为图1。

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1676099388963.png)

作者提议的框架有几个理论和实践贡献：

**Flexible sampling and likelihood computation:** 使用任何通用 SDE solver 来集成反向时间 SDE 进行采样。此外，作者提出了两种对一般 SDE 不可行的特殊方法：(i) Predictor-Corrector (PC) 将数 值SDE求解器与基于分数的MCMC 方法相结合的采样器，如 Langevin MCMC 和 HMC；(ii) 基于概率流常微分方程（ODE）的确定性采样器。前者统一并改进了基于分数的模型的现有采样方法。后者允许通过黑盒ODE求解器进行快速自适应采样，通过隐编码进行灵活的数据操作，唯一可识别的编码，特别是精确的似然计算。


**Controllable generation:**  我们可以使用训练期间不可用的信息控制生成过程，因为条件反向时间 SDE 可以从无条件分数中有效地估计。这使类条件生成、图像绘制、着色和其他逆问题等应用程序都能够实现，所有这些都可以使用单个无条件的基于分数的模型实现，而无需重新训练。


**Unified framework:** 该框架提供了探索和调整各种SDE的统一方式，以改进基于分数的生成模型。SMLD 和 DDPM 的方法可以合并到该框架中，作为两个独立的 SDE 的离散化。尽管最近据报道 DDPM的样本质量高于SMLD，但作者表明，该框架允许的更好的架构和新的采样算法，SMLD可以赶上DDPM——它实现了CIFAR-10上新的最先进的Inception Score（9.89）和 FID Score（2.20），以及首次从基于分数的模型中高保真生成 $1024 \times 1024$ 图像。



# Background

## Denoising Score Matching With Langevin Dynamics (SMLD)

令 $p_{\sigma}(\tilde x \mid x) := N(\tilde x; x, \sigma^2 I)$ 表示一个扰动核， $p_{\sigma}(\tilde x) := \int p_{data}(x) p_{\sigma}(\tilde x \mid x)dx$， 其中 $p_{data}(x)$ 表示数据分布。考虑一个正噪声尺度的序列 $\sigma_{min} = \sigma_1 < \sigma_2 < ... < \sigma_N = \sigma_{max}$。 通常， $\sigma_{min}$ 足够小， 有 $p_{\sigma_{min}}(x) \approx p_{data}(x)$，  $\sigma_{max}$足够大， 有 $p_{\sigma_{max}} \approx N(x; 0, \sigma_{max} I)$。 Song&Ermon(2019) 等人提出一个 Noise Conditional Score Network (NCSN), 表示为 $s_{\theta}(x, \sigma)$ ， 其使用去噪分数匹配的加权和作为目标函数：

$$
\theta^* = \arg \min_{\theta} \sum_{i=1}^N \sigma_i^2 E_{p_{data}(x)}E_{p_{\sigma_i(\tilde x \mid x)}} [\| s_{\theta}(\tilde x, \sigma_i) - \nabla_{\tilde x} \log p_{\sigma_i}(\tilde x \mid x) \|_2^2]
$$


给定足够的数据和模型容量，对于 $\sigma \in {\sigma_i}_{i=1^N}$ 最优的基于分数的模型 $s_{\theta^*}(x, \sigma)$  几乎在所有位置上匹配到 $\nabla_x \log p_{\sigma}(x)$。 为了采样， Song & Ermon (2019) 为每个 $p_{\sigma_i}(x)$ 运行 Langevin MCMC M 步。

$$
x_i^m = x_i^{m-1} + \epsilon_i s_{\theta^*}(x_i^{m-1}, \sigma_i) +\sqrt{2 \epsilon_i} z_i^m, m = 1, 2, ..., M
$$


其中 $\epsilon_i > 0$ 是步长，$z_i^m$ 是标准正态分布。


## Denoising Diffusion Probabilistic Models (DDPM)

Sohl-Dickstein et al. (2015); Ho et al. (2020) 考虑一个正噪声尺度 $0 < \beta_1, \beta_2, ..., \beta_N < 1$ 。 对于每个训练数据点 $x_0 \thicksim p_{data}(x)$， 构造一个离散马尔科夫链 ${x_0, x_1, ..., x_N}$ ， 因此 $p(x_i \mid x_{i-1}) = N(x_i; \sqrt{1-\beta_i}x_{i-1}, \beta_i I)$, 可以推导得到 $p_{\alpha_i}(x_i \mid x_0) = N(x_i; \sqrt{\bar \alpha_i}x_0, (1- \bar \alpha_i) I)$， 其中 $\bar \alpha_i := \prod_{j=1}^i (1 - \beta_j)$。 类似于 SMLD， 我们可以表示扰动数据分布为 $p_{\alpha_i}(\tilde x) := \int p_{data}(x)p_{\alpha_i}(\tilde x \mid x)dx$。  规定噪声尺度使得 $x_N$ 分布接近 $N(0, I)$。 一个变分马尔科夫链逆过程被参数化为 $p_\theta(x_{i-1} \mid x_i) = N(x_{i-1}; \frac{1}{\sqrt{1 - \beta_i}}(x_i + \beta_i s_\theta(x_i, i)), \beta_i I)$， 并且用一个重加权的变分下界训练 ：

$$
\theta^* = \mathop{\text{argmin}}_\theta \sum_{i=1}^N (1 - \alpha_i) E_{p_{data}(x)} E_{p_{\alpha_i(\tilde x \mid x)}]}[\|s_\theta(\tilde x, i) - \| \nabla_{\tilde x} \log p_{\alpha_i}(\tilde x \mid x) \|_2^2] \tag{3}
$$

在求解 Eq.(3) 后得到最优模型 $s_{\theta^*}(x, i)$ ， 样本可以从 $X_N \thicksim N(0, I)$ 采样生成， 接下来按如下估计逆马尔科夫链：

$$
x_{i-1} = \frac{1}{\sqrt{1 - \beta_i}}(x_i + \beta_i s_{\theta^*}(x_i, i)) + \sqrt{\beta_i} z_i, \quad i = N, N-1, ..., 1 \tag{4}
$$

作者称这种方式为 ancestral sampling， 因为它相当于从图形模型 $\prod_{i=1}^N p_\theta(x_{i-1} \mid x_i)$ 中执行祖先采样。Eq.(1) 和 Eq.(3) 的目标都是去噪分数匹配目标的加权和， 这表明最优的模型 $s_{\theta^*}(\tilde x, i)$ 匹配扰动数据分布的分数 $\nabla_x \log p_{\alpha_i}(x)$。 值得注意的是， Eq.(1) 和 Eq.(3) 的权重， 也就是 $\sigma_i^2$ 和 $(1 - \alpha_i)$ 与以相同的形式与扰动核相关： $\sigma_i^2 \propto E[\| \nabla_x \log p_{\sigma_i} (\tilde x \mid x) \|_2^2]$ 和 $(1 - \alpha_i) \propto 1 / E[\| \nabla_x \log p_{\alpha_i}(\tilde x \mid x)\|_2^2]$。 
 

# Score-Based Generative Mideling With SDEs

具有多个噪声尺度的扰动数据是之前方法成功的关键。作者建议将这个想法进一步推广到无限数量的噪声尺度，以便扰动的数据分布随着噪声的加剧而根据SDE进行演变。框架的总览如图2所示。

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1676108141793.png)


## Perturbing  Data With SDEs


我们的目标是构建一个扩散过程 ${x(t)}_{t=0}^T$ 通过一个连续时间变量 $t \in [0, T]$ 索引， 例如 $x(0) \thicksim p_0$ 和 $x(T) \thicksim p_T$。 $p_0$ 是数据分布， $p_T$ 是先验分布。 扩散过程可以被建模为 SDE 的解：

$$
dx = f(x, t) dt + g(t) dw \tag{5}
$$

其中 $w$ 是标准 Wiener 过程， $f(·, t): R^d \rightarrow R^d$ 是 vector-value 函数， 叫做 $x(t)$ 的 drift 系数， $g(·): R \rightarrow R$ 是标量函数，叫做 $x(t)$ 的 diffusion 系数。为了便于陈述，我们假设扩散系数是一个标量，并且不依赖于 $x$，但我们的理论可以推广到在这些情况下成立（见附录A）。只要系数在状态和时间上都是全局 Lipschitz，SDE就有一个唯一的强解。我们这里将 $p_t(x)$ 表示为 $x(t)$ 的概率密度， 使用 $p_{st}(x(t) \mid x(s))$ 表示从 $x(s)$ 到 $x(t)$ 的 transition kernel， 其中 $0 \leq s < t \leq T$。 

通常，$p_T$ 是未构造的先验分布， 其不包含 $p_0$ 的信息， 例如是一个固定均值和方差的高斯分布。构造 Eq.(5) 中的 SDE 有多种方式， 其将数据分布扩散到固定的先验分布。


## Generating  Samples  by Reversing  the SDE

通过从 $x(T) \thicksim p_T$ 采样和逆过程， 我们可以得到样本 $x(0) \thicksim p_0$。 Anderson（1982）的一个显著结果表明，扩散过程的逆过程也是一个扩散过程，在时间上向后运行，并由反向时间SDE给出：

$$
dx = [f(x, t) - g(t)^2 \nabla_x \log p_t(x)]dt + g(t)d \bar w \tag{6}
$$


其中 $\bar w$ 是标准 Wiener 过程，时间从 $T$ 流向 $0$,  $dt$ 是无穷小的负时间步。一旦得到每个时间 $t$ 的边缘分布的分数 $\nabla_x \log p_t(x)$， 我们可以得到 Eq.(6) 的逆扩散过程， 并仿真它从 $p_0$ 采样。

## Estimating Scores for the SDE


分布的 score 可以通过在样本上用 score matching 训练一个 score-based 模型来估计。 为了估计 $\nabla_x \log p_t(x)$， 我们可以通过连续泛化 Eqs.(1) 和 (3) 训练一个时间依赖的基于分数的模型 $s_\theta(x, t)$ ：

$$
\theta^* = \arg \min_\theta E_t \{\lambda(t) E_{x(0)} E_{x(t) \mid x(0)}[\|s_\theta(x(t), t) - \nabla_{x(t)} \log p_{0t}(x(t) \mid x(0)) \|_2^2] \} \tag{7}
$$

这里 $\lambda : [0, T] \rightarrow R_{>0}$ 是正加权函数， $t$ 在 $[0, T]$ 上均匀采样， $x(0) \thicksim p_0(x)$ 和 $x(t) \thicksim p_{0t}(x(t) \mid x(0))$。 

# Conclusion

