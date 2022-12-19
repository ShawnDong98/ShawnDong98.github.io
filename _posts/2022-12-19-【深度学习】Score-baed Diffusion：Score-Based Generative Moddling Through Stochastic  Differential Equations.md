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

作者表明，该框架概括了以前基于分数的生成建模和扩散概率建模的方法，允许新的采样程序和新的建模能力。

特别是，作者引入了一个预测器-校正器框架，以纠正离散反向时间SDE演变中的错误。

作者还推导出了等效的神经ODE，该样本来自与SDE相同的分布，但还实现了精确的似然计算，并提高了采样效率。

此外，作者提供了一种解决基于分数的模型反向问题的新方法，如类条件生成、图像绘画和着色实验所证明的那样。

结合多种架构改进，作者在CIFAR-10上实现了无条件图像生成的破纪录性能，Inception score 为 9.89，FID为2.20，competitive likelihood 为2.99 bits/dim，并首次从基于分数的生成模型中演示了 $1024 \times 1024$ 图像的高保真生成。

# Background

## Denoising Score Matching With Langevin Dynamics (SMLD)

令 $p_{\sigma}(\tilde x \mid x) := N(\tilde x; x, \sigma^2 I)$ 表示一个扰动核， $p_{\sigma}(\tilde x) := \int p_{data}(x) p_{\sigma}(\tilde x \mid x)dx$， 其中 $p_{data}(x)$ 表示数据分布。考虑一个正噪声尺度的序列 $\sigma_{min} = \sigma_1 < \sigma_2 < ... < \sigma_N = \sigma_{max}$。 通常， $\sigma_{min}$ 足够小， 有 $p_{\sigma_{min}}(x) \approx p_{data}(x)$，  $\sigma_{max}$足够大， 有 $p_{\sigma_{max}} \approx N(x; 0, \sigma_{max} I)$。 Song&Ermon(2019) 等人提出一个 Noise Conditional Score Network (NCSN), 表示为 $s_{\theta}(x, \sigma)$ ， 其使用去噪分数匹配的加权和作为目标函数：

$$
\theta^* = \arg \min_{\theta} \sum_{i=1}^N \sigma_i^2 E_{p_{data}(x)}E_{p_{\sigma_i(\tilde x \mid x)}} [\| s_{\theta}(\tilde x, \sigma_i) - \nabla_{\tilde x} \log p_{\sigma_i}(\tilde x \mid x) \|_2^2]
$$
给定足够的数据和模型容量，对于 $\sigma \in {\sigma_i}_{i=1^N}$ 最优的基于分数的模型 $s_{\theta^*}(x, \sigma)$  几乎咋所有位置上匹配到 $\nabla_x \log p_{\sigma}(x)$。 


## Denoising Diffusion Probabilistic Models (DDPM)




# Conclusion

