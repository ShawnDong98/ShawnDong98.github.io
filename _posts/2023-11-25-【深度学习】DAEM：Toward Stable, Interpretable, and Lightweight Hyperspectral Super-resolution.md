---
layout:     post
title:      "【深度学习】DAEM：Toward Stable, Interpretable, and Lightweight Hyperspectral Super-resolution"
subtitle:   ""
date:       2023-11-25
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - CVPR 2023
    - 深度学习
---

# Abstract

在真实应用中，现有的HSI-SR方法不仅在未知场景下表现不稳定，而且还因高计算消耗受限。在本文中，我们开发了一个新的协调优化框架，以实现稳定、可解释和轻量级的HSI-SR。具体来说，我们在一个新的概率框架下，创造了融合和退化估计之间的正向循环。估计出的退化作为指导应用于融合过程中，实现了对退化敏感的HSI-SR。在该框架下，我们建立了一个显式的退化估计方法，以解决之前方法中黑盒仿真导致的不确定性和不稳定性能问题。考虑到融合的可解释性，我们将光谱混合先验集成到融合过程中，这可以通过一个小型自动编码器轻松实现，从而显著降低了计算负担。基于光谱混合先验，我们进一步开发了一个局部微调策略以进一步减少计算成本。全面的实验表明，我们的方法在合成和真实数据集下优于现有技术水平。例如，在CAVE数据集下，我们实现了PSNR在2.3 dB的提升，模型大小减少了120倍，FLOPs减少了4300倍。


# The Proposed Method

## Explicit Degradation Estimation

在这里，我们的目标是明确捕捉固有的退化模式，期待稳定和精确的估计。与广泛认可的退化模型[36,39]类似，我们用各向异性高斯核模拟 PSF $C$：

$$
C_{i, j} = \frac{1}{2 \pi} \sqrt{|\Lambda|} exp (-\frac{1}{2}S^\top \Lambda S), \\
S = [i, j]^\top, i, j \in -s/2, ...., s/2,
$$

其中 $\Lambda \in \mathbb{R}^2$ 是高斯模糊核的协方差， 并且 $\Lambda$ 是对称正定矩阵。 因此，只有3个参数可以处理模糊内核。

相似地，SRF $R$ 也有简单的模式。 我们可以通过带有 $K$ 个成分的混合高斯估计 $R$ 的每列（仅仅 2K 个参数可以实现估计， 其明显少于此前的方法至少需要 $B \times b$ 个参数）

$$
R_{i, j}  = \sum_{k=1}^K \frac{1}{\sqrt{2\pi} \sigma_{j, k}} exp(-\frac{(i - \mu_{j, k})^2}{2 \sigma_{j, k}^2})
$$