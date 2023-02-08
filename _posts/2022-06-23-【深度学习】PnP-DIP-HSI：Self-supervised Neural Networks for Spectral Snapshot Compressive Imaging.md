---
layout:     post
title:      "【深度学习】PnP-DIP-HSI：Self-supervised Neural Networks for Spectral Snapshot Compressive Imaging"
subtitle:   ""
date:       2022-06-23
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags: 
    - 深度学习
    - HSI
    - ICCV 2021
---


# Abstract

这篇文章考虑使用未经训练的神经网络来解决快照压缩成像(SCI)的重建问题， SCI使用一个二维(2D) detector 以压缩的方式捕获一个高维(通常是3D)数据立方体。

近年来建立了各种SCI系统来捕获高速视频、高光谱图像等数据，并通过深度神经网络获得最先进的重建。

然而，这些网络大多采用端到端方式，由大量数据进行训练，使用模拟的 ground truth-measurement pairs。

这篇文章受 deep image priors (DIP)和 deep decoders 等 untrained neural networks 的启发，开发了一个框架，将DIP集成到即插即用机制中，从而实现了一个用于光谱SCI重建的自监督网络。

大量的综合数据和真实数据结果表明，这篇文章提出的不需要训练的算法能够获得与训练网络相竞争的结果。

此外，通过将提出的方法与预训练的深度去噪先验相结合，取得了最先进的结果。

# Method

重构目标可公式化为：

$$
\hat x = \mathop{\text{argmin}}_x \frac{1}{2} \| y - Hx\|_2^2 + \lambda R(x)  \tag{5}
$$

以往在光谱 SCI 中使用包括 TV、sparsity 和 low-rank 等不同先验。


## Deep Image Prior (DIP) 


去除掉 $(5)$ 中的正则项 $R(x)$， deep image prior 假设想要的信号 $x$ 是神经网络 $T_\Theta(e)$ 的输出， 其中 $e$ 是一个随机向量并且 $\Theta$ 是神经网络要学习的参数。 DIP 求解下式：

$$
\min_{\Theta} \| y - HT_\Theta(e) \|_2^2 \tag{6}
$$

想要的重构信号是 $\hat x = T_\Theta(e)$。DIP 和 现有的深度神经网络的关键区别在于 $\Theta$ 从每个 measurement $y$ 学习。相比之下，现有的监督网络从训练数据中学习网络参数，然后在测试(推断)过程中固定网络参数。在 DIP 中， $\Theta$ 的训练本身是 $x $的重构过程。这个过程是无监督的， 在学习和重构的期间没有真实标签。

由于 data-cube 的第三维度被压缩为 2D measurement， 使用 DIP 能很好地重构空间信息，但有时不能很好的重构光谱信息。TV 先验通常能够较好地重构光谱信息，但是通常损失一些空间细节。这项工作结合了 DIP 先验和 TV 先验。


## Proposed Joint Framework

将两种先验施加在要重构的 spectral data-cube 上, 得到下列公式：

$$
(\hat x, \hat \Theta) = \mathop{\text{argmin}}_{x, \Theta} \frac{1}{2} \| y - Hx \|_2^2 + \lambda R(x), \quad \text{s.t} \quad x = T_\Theta(e) \tag{7}
$$
通过引入辅助变量 $b \in \mathbb{R}^{n_x n_y n_\lambda}$ 和平衡参数 $\mu$， 目标为最小化：

$$
\min_{x, \Theta} \frac{1}{2} \| y - H T_\Theta (e) \|_2^2 + \lambda R(x) + \mu \|x - T_\Theta(e) -b \|_2^2 \tag{8}
$$

使用 ADMM 将解分为三个子问题。

由于等式 $(7)$ 的两种先验， 作者在实验中发现由于 enforce DIP 的结果， $T_\Theta(e)$ 接近 measurement $y$,  不能融合两种先验的优点。因此作者提出最小化：

$$
\min_{x, \Theta} \frac{1}{2} \| y - Hx\|_2^2  + \lambda R(x) + \frac{\rho}{2} \| y - H T_\Theta(e) \|_2^2 \quad \text{s.t.} \quad x = T_\Theta(e) \tag{9}
$$
为了求解 $(9)$， 相似地， 使用一个辅助变量 $b \in \mathbb{R}^{nn_\lambda}$ 和平衡参数 $\mu$， 现在目标为最小化：

$$
(\hat x, \hat \Theta, \hat b) = \mathop{\text{argmin}}_{x, \Theta, b} \frac{1}{2} \| y - Hx \|_2^2 + \lambda R(x) - \frac{\mu}{2} \| b \|_2^2  \\
+ \frac{\rho}{2}\| y - HT_\Theta(e)\|_2^2  + \frac{\mu}{2}\|x - T_\Theta(e) - b\|_2^2 \tag{10}
$$
使用以下子问题迭代求解 $(10)$。  

1） $\Theta$ - subproblem: 给定 $x$ 和 $b$ ， 求解 $\Theta$ 通过：

$$
\hat \Theta = \mathop{\text{argmin}}_{\Theta} \frac{\rho}{2}\|y - HT_\Theta(e) \|_2^2 + \frac{\mu}{2} \|x - T_\Theta(e) - b \|_2^2 \tag{11}
$$

其强制 $T_\Theta(e)$ 接近 $x - b$。$T_\Theta(e)$ 现在扮演两个角色：

- 去噪 $x - b$
- 最小化 measuremetn loss $y - HT_\Theta(e)$

2） $x$ - subproblem， 求解：

$$
\hat x = \mathop{\text{argmin}}_x \frac{1}{2} \| y - Hx \|_2^2 + \lambda R(x) + \frac{\mu}{2}\| x - T_\Theta(e) - b \|_2^2
$$
通过引入 $u, v$ 使用 ADMM 使得最小化：

$$
\min_{x, u} \frac{1}{2} \|y - Hx\|_2^2 + \lambda R(u) + \frac{\mu}{2}\| x - T_\Theta(e) - b\|_2^2 \quad \text{s.t.} \quad u = x \tag{12}
$$

等式 $(12)$ 被重公式化为：

$$
\min_{x, u} \frac{1}{2} \| y - Hx \|_2^2 + \lambda R(u) + \frac{u}{2}\| x - T_\Theta(e) - b \|_2^2 \\ 
+ \frac{\eta}{2} \| x - u - v \|_2^2 - \frac{\eta}{2} \| v \|_2^2 \tag{13} 
$$
其可以通过下面两个子问题求解：

2.1) $x$-subproblem:

$$
\hat x = \mathop{\text{argmin}}_x \frac{1}{2}\| y - Hx \|_2^2 + \frac{\mu}{2} \| x - T_\Theta(e) - b\|_2^2 + \frac{\eta}{2}\|x - u - v\|_2^2 \tag{14}
$$

这是一个二次型， 由于 $H$ 的特殊结构， 他有 closed-form 的解：

$\hat x = (H^\top H + \mu I + \eta I)^{-1}[H^\top y + \mu(T_\Theta(e) + b) + \eta(u + v)]$。 

2.2) $u$ - subproblem： $\hat u = \text{argmin}_u \eta \|x - u - v \|_2^2 + \lambda R(u)$。 这是一个去噪问题， 依赖于所选择的 $R$， 有：

$$
\hat u = \mathcal{D}_\sigma(x - v) \tag{16}
$$
其中 $\sigma$ 是依赖于 $\lambda / \eta$ 的估计的噪声等级。

2.3） $v$ 由下式更新：

$$
v^{k+1} = v^{k} - (x^k - u^k) \tag{17}
$$

3) b 由下式更新：

$$
b^{k+1} = b^k - (x^k - T_\Theta^k(e)) \tag{18}
$$







# Conclusion

这篇文章提出了一种用于光谱快照压缩成像重建的自监督算法。

该框架使用未训练的神经网络直接从快照压缩成像系统捕获的 compressed measurement 学习先验信息。

因此，该算法不需要任何训练数据。

将这种未训练的基于先验的深度网络集成到即插即用的框架中，并通过 multipliers 算法的alternation direction 法求解。

通过使用与现有算法不同的范式，取得了与基于监督深度学习的算法相竞争的结果，这些算法需要大量的训练数据。

此外，将提出的框架与最近预训练的高光谱图像深度去噪网络相结合，以实现联合重建机制。

该联合算法在不同光谱快照压缩成像系统的合成数据集和真实数据集上提供了最先进的结果。



# Summary

重构目标：

$$
\hat x = \mathop{\text{argmin}}_{x, \Theta} \frac{1}{2} \| y - Hx \|_2^2 + \lambda R(x) \tag{1}
$$
引入 deep image prior：

$$
\hat x = \mathop{\text{argmin}}_{x, \Theta} \frac{1}{2} \| y - Hx \|_2^2 + \lambda R(x) \quad \text{s.t.} \quad x = T_\Theta(e) \tag{2} 
$$

$e$ 为随机向量。引入中间变量 $b$：

$$
\hat x = \mathop{\text{argmin}}_{x, \Theta} \frac{1}{2} \| y - H T_\Theta(e) \|_2^2 + \lambda R(x) + \mu \|x - T_\Theta(e)-b\|_2^2  \tag{3} 
$$

在实验中发现 $T_\Theta(e)$ 的结果接近 measurement $y$，因此转而提出最小化：

$$
\min_{x, \Theta} \frac{1}{2} \| y - Hx \|_2^2 + \lambda R(x) + \frac{\rho}{2} \| y - HT_\Theta(e)\|_2^2 \quad \text{s.t.} \quad x = T_\Theta(e) \tag{4}
$$

引入中间变量 $b$:

$$
(\hat x, \hat \Theta, \hat b) = \mathop{\text{argmin}}_{x, \Theta, b} \frac{1}{2} \| y - Hx \|_2^2 + \lambda R(x) - \frac{\mu}{2} \| b \|_2^2  \\
+ \frac{\rho}{2}\| y - HT_\Theta(e)\|_2^2  + \frac{\mu}{2}\|x - T_\Theta(e) - b\|_2^2 \tag{5}
$$
