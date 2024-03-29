---
layout:     post
title:      "【深度学习】GDP：Generative Diffusion Prior for Unified Image Restoration and Enhancement"
subtitle:   ""
date:       2023-04-17
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - Diffusion
    - CVPR 2023
---

# Abstract

现有的图像恢复方法主要利用自然图像的后验分布。


然而，他们通常假设已知的退化，也需要监督训练，这限制了他们对复杂实际应用的适应。在这项工作中，我们提出了生成扩散先验（GDP），以无监督采样方式有效地对后验分布进行建模。

GDP 使用预训练去噪扩散生成模型（DDPM）来解决线性逆、非线性或盲问题。

具体来说，GDP系统地探索了条件引导，其经过验证，比常用的引导方式更实用。

此外，GDP 在去噪过程中优化退化模型参数，实现盲图像恢复的优势。

此外，我们设计了分层引导和基于 patch 的方法，使GDP能够生成任意分辨率的图像。

实验上，我们在几个图像数据集上展示了 GDP 的多功能性，用于线性问题，如超分辨率、去模糊、绘画和着色，以及非线性和盲问题，如暗光增强和HDR图像恢复。

在重建质量和感知质量的各种基准上，GDP的表现优于当前领先的无监督方法。

此外，GDP还可以很好地泛化到自然图像或从ImageNet训练集分布外的各种任务中具有任意大小的合成图像。

# Generative Diffusion Prior

在这项研究中，我们的目标是利用训练好的 DDPM 作为统一图像恢复和增强的有效先验，特别是处理各种类型的退化图像。 假设退化图像 $y$ 通过 $y = D(x)$ 捕获， 其中 $x$ 是原始的自然图像， $D$ 是退化模型。我们使用存储在一些先验中的 $x$ 的统计信息，并在 $x$ 的空间中搜索与 $y$ 最匹配的最优 $x$，将 $y$ 视为 $x$ 的退化观测。由于本文表1中 GAN-inversion 性能有限，以及之前作品[32、33、62、69]的应用受到限制，我们专注于研究一种更通用的图像先验，即在用于图像合成的大规模自然图像上训练的扩散模型。受[4、9、12、70、73]的启发，DDPM的反向去噪过程可以以退化的图像 $y$ 为条件。具体来说，等式 $3$ 中的反向去噪分布 $p_\theta(x_{t-1} \mid x_t)$ 变为条件分布 $p_\theta(x_{t-1} \mid x_t, y)$。 [15, 76] 证明：

$$
\log p_\theta(x_{t-1} \mid x_t, y) = \log (p_\theta(x_{t-1} \mid x_t) p(y \mid x_t)) + K_1 \\ 
\approx \log p(r) + K_2 \tag{7}
$$

