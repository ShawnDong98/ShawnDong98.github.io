---
layout:     post
title:      "【深度学习】DDPM：Denoising Diffusion Probabilistic Models"
subtitle:   ""
date:       2022-11-30
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     true
tags:
    - 深度学习
    - CVPR 2020
---

# Abstract

这篇文章使用扩散概率模型提出了高质量的图像合成结果，这是一类受非平衡热力学考虑启发的隐变量模型。

作者的最佳结果是通过根据扩散概率模型和与 Langevin dynamics 的去噪分数匹配之间的联系设计的加权变分界训练获得的，可以解释为自回归解码的推广。

在无条件的CIFAR10数据集中，作者获得了9.46的 Inception 分数和 3.17 的最先进的FID分数。

# Background

扩散模型是形式为 $p_\theta(x_0) := \int p_\theta(x_{0:T})dx_{1:T}$ 的隐向量模型， 其中 $x_1, ..., x_T$ 是与数据 $x_0 \thicksim q(x_0)$ 相同维度隐向量。 联合分布 $p_\theta(x_{0:T})$ 被叫做逆过程， 它被定义为从 $p(x_T) = \mathcal{N}(x_T; 0, I)$可学习的高斯转移的马尔科夫链:

$$
p_\theta(x_{0:T}) := p(x_T) \prod_{t=1}^T p_\theta(x_{t-1} \mid x_t), \quad p_\theta(x_{t-1} \mid x_t) = \mathcal{N}(x_{t-1}; \mu_\theta(x_t, t), \Sigma_\theta(x_t, t)) \tag{1}
$$
扩散模型与其它类型的隐变量模型的区别在于，估计后验 $q(x_{1:T} \mid x_0)$， 被叫做扩散过程的前向过程，其是一个马尔科夫链， 这个过程逐渐根据方差策略 $\beta_1, ..., \beta_T$ 添加噪声到数据中：

$$
q(x_{1:T} \mid x_0) := \prod_{t=1}^T q(x_t \mid x_{t-1}), \quad q(x_t \mid x_{t-1}) := \mathcal{N}(x_T; \sqrt{1 - \beta_t}x_{t-1}, \beta_t I) \tag{2}
$$

训练是通过优化负对数似然的变分下限：

$$
\mathbb{E}[-\log p_\theta(x_0)] \leq \mathbb{E}_q[- \log \frac{p_\theta(x_{0:T})}{q(x_{1:T} \mid x_0)}] = \mathbb{E}_q [- \log p(x_T) - \sum_{t \geq 1} \log \frac{p_\theta(x_{t-1} \mid x_t)}{q(x_t \mid x_{t-1})}] =: L \tag{3}
$$
前向过程方差 $\beta_t$ 可以通过重参数学习或者作为一个超参数保持为常数， 反向过程的表达选择高斯条件 $p_\theta(x_{t-1} \mid x_t)$， 因为两种过程在 $\beta_t$ 很小的时候有相同的函数形式。前向过程的一个显著性质是它以闭式的形式在任意时间步采样 $x_t$: 使用记号 $\alpha_t := 1 - \beta_t$ 和 $\bar \alpha_t := \prod_{s=1}^t \alpha_s$， 我们有：

$$
q(x_t \mid x_0) = \mathcal{N}(x_t; \sqrt{\bar \alpha_t}x_0, (1- \bar \alpha_t)I) \tag{4}
$$

因此，通过优化随机梯度下降的 $L$ 随机项，可以进行高效训练。进一步的改进来自 variance reduction 通过重写 $L$ 为：

$$
\mathbb{E}_q[D_{KL} (q(x_T \mid x_0) \| p(x_T)) + \sum_{t>1} D_{KL}(q(x_{t-1} \mid x_t, x_0) \| p_\theta(x_{t-1} \mid x_t)) - \log_{p_\theta}(x_0 \mid x_1)] \tag{5}
$$
等式(5) 使用 KL 散度直接比较 $p_\theta(x_{t-1} \mid x_t)$ 和前向过程后验， 其可以以 $x_0$ 为条件追溯。

$$
q(x_{t-1} \mid x_t, x_0) = \mathcal{N}(x_{t-1}; \tilde \mu_t(x_t, x_0), \tilde{\beta}_t I) \tag{6}
$$

$$
\text{where} \quad \tilde \mu_t(x_t, x_0) := \frac{\sqrt{\bar \alpha_{t-1}} \beta_t}{1 - \bar \alpha_t} x_0 + \frac{\sqrt{\alpha_t}(1 - \bar \alpha_{t-1})}{1 - \bar \alpha_t} x_t \quad \text{and} \quad \tilde{\beta}_t := \frac{1 - \bar \alpha_{t-1}}{1 - \bar \alpha_t} \beta_t \tag{7}
$$

因此，等式5 所有 KL 散度和高斯噪声比较， 因此它们可以以 Rao-Blackwellized 形式以闭式表达计算， 不用高方差的蒙特卡洛估计。
 # Diffusion models and denoising autoencoders

扩散模型可能看起来是一类受限制的隐变量模型，但它们允许在实现中有很大程度的自由度。我们必须选择前向过程的方差 $\beta_t$ 和模型结构以及逆过程的高斯分布参数化。为了指导选择，作者在扩散模型和去噪分数匹配（第3.2节）之间建立了新的明确联系，从而为扩散模型建立了简化的加权变分下限目标（第3.4节）。归根结底，模型设计是基于简单和实验结果（第4节）。


## Forward process and $L_T$

作者忽视掉前向过程方差 $\beta_t$ 可以通过重参数化学习并且固定它们为常数(细节见第4节)。因此， 在实现中， 估计后验 $q$ 没有可学习的参数， 因此 $L_T$ 在训练中为常数并且可以被忽略。

## Reverse process and $L_{1:{T-1}}$

现在讨论在 $p_\theta(x_{t-1} \mid x_t) = \mathcal{N}(x_{t-1}; \mu_\theta(x, t), \Sigma_\theta(x_t, t)) \quad 1 < t \leq T$的选择。 首先作者设置 $\Sigma_\theta(x_t, t) = \sigma_t^2 I$  为没有训练时的依赖变量。实验上， $\sigma_t^2 = \beta_t$ 和 $\sigma_t^2 = \tilde \beta_t = \frac{1 - \bar \alpha_{t-1}}{1 - \bar \alpha_t} \beta_t$ 有相似的结果 。第一个选择对 $x_0 \thicksim \mathcal{N}(0, I)$是最优的, 第二个对 $x_0$ 设置为一个确定性的点事最优的。对于有着 coordinatewise unit variance 的数据， 这是两个极端的选择对应着逆过程熵的上界和下界。
 
 其次， 对于表达均值 $\mu_\theta(x_t, t)$， 受到以下 $L_t$ 的分析的启发， 作者提出一个特定的参数化。 有了$p_\theta(x_{t-1} \mid x_t) = \mathcal{N}(x_{t-1}; \mu_\theta(x_t, t), \sigma_t^2I)$：
 
 $$
 L_{t-1} = \mathbb{E}_q [\frac{1}{2\sigma_t^2} \|\tilde \mu_t(x_t, x_0) - \mu_\theta(x_t, t)\|^2] + C \tag{8}
 $$
其中 $C$ 是一个常数， 其不依赖于 $\theta$。 因此，我们看到最直接的 $\mu_\theta$ 参数化是一个模型， 其预测 $\tilde \mu_t$， 前向过程后验均值。

# Conclusion

作者使用扩散模型提出了高质量的图像采样，并发现了扩散模型和变分推断之间的联系， 该变分推断用于训练马尔可夫链、去噪分数匹配和annealed Langevin dynamics（以及扩展的基于能量的模型）、自回归模型和  progressive lossy compression。

由于扩散模型似乎对图像数据具有出色的归纳偏置，作者期待着研究它们在其他数据模态中的效用，以及作为其他类型生成模型和机器学习系统中的组成部分的实用性。

