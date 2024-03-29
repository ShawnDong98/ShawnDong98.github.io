---
layout:     post
title:      "【深度学习】ADMM-Net: A Deep Learning Approach for Compressive Sensing MRI"
subtitle:   ""
date:       2023-06-02
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - NIPS 2016
---

# Abstract

压缩感知（CS）是快速磁共振成像（MRI）的有效方法。

它旨在从 k 空间中少量采样不足的数据中重建 MR 图像，并加速 MRI 中的数据采集。

为了提高当前核磁共振系统的重建精度和速度，在本文中，我们提出了两种新的深度架构，在基本版本和广义版本中称为ADMM-Nets。

ADMM-Nets是在数据流图上定义的，数据流图来自乘子交替方向法（ADMM）算法中的迭代程序，用于优化基于CS的通用MRI模型。

他们将采样的 k 空间数据作为输入并且输出重建的 MR 图像。

此外，我们扩展了我们的网络，以应对具有复数值的磁共振图像。

在训练阶段，网络的所有参数，例如 transforms 、  shrinkage 函数等，都是端到端的判别式训练。

在测试阶段，他们具有类似于ADMM算法的计算开销，但使用从数据中学习的优化参数进行基于CS的重建任务。

我们调查了网络结构中的不同配置，并在不同的采样率下对 MR 图像重建进行了广泛的实验。

由于基于模型的方法和深度学习方法的优势相结合，ADMM-Nets以快速的计算速度实现了最先进的重建精度。


# Introduction

压缩感知（CS）旨在恢复信号，允许数据采样率远低于奈奎斯特率，是信号处理和机器学习领域的一种流行方法[1]。如今，磁共振成像（MRI）引入了CS方法，实现了最成功的 CS 应用之一，称为压缩感知 MRI（CS- MRI）[2]。MRI是一种非侵入性且广泛使用的成像技术，为临床诊断提供功能和解剖学信息，包括数据采集和图像重建处理。成像质量极大地影响了随后的图像分析和处理，这对医生和计算机都很有用。然而，长时间的扫描和等待时间可能会导致运动伪影和患者的混乱。所有这些事实都表明，核磁共振成像的成像速度是一个根本性的挑战。CS-MRI 方法通过从 k 空间（即傅里叶空间）中的一些采样数据重建高质量的 MR 图像来解决这个问题，这大大减少了扫描时间。

一般来说，CS-MRI 被表述为惩罚性的逆问题，问题的解为重建的磁共振图像。与数据先验相关的模型的正则化是 CS-MRI 模型中提高成像精度的关键组成部分。根据CS理论，在去除k-空间中采样不足导致的 aliasing artifacts 之前，信号稀疏性很重要[3]。通过这种方式，可以在特定变换域[3]、[4]或基于通用字典的子空间[5]中探索稀疏正则化，以实现更高的加速度系数或提高重建性能。相应的稀疏正则化通常由 $l_q$（$q \in [0, 1]$）正则化器定义。除了图像的稀疏表征外，图像的非局部相似性也被广泛用于 CS-MRI 模型。为了提高重建质量，[8]对局部和非局部信息的组合进行了研究。所有这些方法都通过个人经验决定了稀疏表示和稀疏正则化的表述，考虑到核磁共振重建的质量和速度要求，这通常是次优的。总之，在CS-MRI中选择最佳变换域/子空间和相应的正则化仍然是一项具有挑战性的任务。为了优化 CS-MRI 模型，有三种类型的算法，包括基于梯度的算法[3]、变量分裂算法[9]、[10]、[11]和运算符分裂算法[12]。乘子交替方向法（ADMM）是 CS-MRI 中广泛使用的变量分裂算法，已被证明是有效的，普遍适且有收敛保证[13]，[14]。它给定 CS-MRI 模型的增强拉格朗日函数，并将变量分解为子组，这些子组也可以通过解决几个简单的子问题进行优化。虽然 ADMM 通常对优化有效，但确定影响 CS-MRI 重建精度和速度的最佳参数（例如更新率、惩罚参数）也并非易事。

最近，由于强大的数据学习能力，深度神经网络在图像分类和分割方面取得了令人兴奋的成功。 此外，回归型深度网络在图像去噪和超分辨率方面提供了最先进的性能。在这项工作中，我们有兴趣将深度学习方法和压缩感知的逆问题与 MR 图像重建中的应用进行衔接。

在这篇文章中，我们设计了两个有效的深度结构，灵感来自 ADMM 算法，优化了 CS-MRI 模型，从欠采样的 k 空间数据中重建高质量的 MR 图像。我们首先定义了一个由数据流图表示的深度架构，该图来自用于优化通用 CS-MRI 模型的 ADMM 迭代程序。ADMM中的操作表示为图形节点，两个操作之间的数据流由有向边表示。然后，我们将此数据流图推广到两个不同的深度网络，称为 Basic-ADMM-Net 和 Generic-ADMM-Net，灵感来自两个不同版本的ADMM算法。此外，我们扩展了我们的网络，以应对被称为Complex-ADMM-Net的复数值 MR 图像。这些深度网络由多个阶段组成，每个阶段都对应于 ADMM 算法中的迭代。给定一个欠采样的 k 空间数据，它在网络上流动并输出重建的 MR 图像。深度网络中的所有参数（例如，image transforms、shrinkage 函数、penalty 参数、更新率等）都可以从训练 k 空间中欠采样的数据对和通过 L-BFGS 优化和反向传播[19]在深层架构上使用完全采样的数据重建图像中进行判别式学习。所有实验都表明，所提出的深层网络在重建精度和速度方面都是有效的。

这项研究的主要贡献可以总结如下：

- 我们通过重新制定 ADMM 算法，将通用的 CS-MRI 模型求解为 CS-MRI 的深度网络，提出了两个新的深度 ADMM-Nets。CS-MRI 模型和 ADMM 算法中的参数都是从数据中判别出来的。
- 广泛的实验表明，ADMM-Nets 以快速的计算速度在 MR 图像重建中实现了最先进的准确性。
- 我们提出的ADMM-Nets自然结合了传统 CS-MRI 模型和深度学习方法的优点，这些方法可以潜在地应用于其他逆问题，如图像反卷积、通用的压缩感知应用。

这项工作的初步版本已在早些时候的一次会议上提出。本文从几个方面扩展了初始版本，以推进我们的方法。首先，我们将 ADMM-Net 推广到更通用的网络结构（即 Generic-ADMM-Net），以实现更高的 MR 图像重建质量。其次，我们扩展了网络来重建复数值的 MR 图像，这在临床诊断中更有用。第三，我们广泛评估了不同宽度和深度的ADMM-Nets，并通过更多的比较实验证明了网络的优势。我们还与最近发布的几种压缩感知 MRI 深度学习方法进行了比较，并确认我们的方法在这些深度学习方法中是有利的。


# ADMM-Net for CS-MRI

在本节中，我们首先介绍一个通用的 CS-MRI 模型和相应的 ADMM 迭代程序。然后，我们定义了一个从 ADMM 迭代派生的数据流图。最后，我们推广这个数据流图来构建我们深度 ADMM-Nets。

## General CS-MRI Model and ADMM Algorithm

作为起点，我们考虑通过通用压缩感知 MRI（CS-MRI）模型重建磁共振图像。

**General CS-MRI Model:** 假设 $x \in C^N$ 是要重建的 MRI 图像， $y \in C^{N'}$ 是欠采样的 k-space 数据。 根据 CS 理论，重建的图像可以通过解决以下优化问题来估计：

$$
\hat x = arg min_x {\frac{1}{2} \| Ax - y \|_2^2 + \sum_{l=1}^L \lambda_l g(D_lx)} \tag{1}
$$

其中 $A = PF \in R^{N' \times N}$ 是一个观测矩阵， $P \in R^{N' \times N}$ 欠采样矩阵， $F$ 是一个傅里叶变换。$D_l$ 表示一个滤波操作的变换矩阵， 例如离散小波变换(DWT)， 离散余弦变换(DCT)等， $g(·)$ 是来自数据先验的正则函数， 例如稀疏先验的 $l_q$ 正则其。 $\lambda_l$ 是正则化参数。

上述优化问题可以通过 ADMM 算法有效解决。以下求解器是两种形式的 ADMM 算法，取决于不同的辅助变量。

**ADMM solver I:** 通过在变换域中引入独立的辅助变量 $z = {z_1, z_2, ..., z_L}$ ， 等式（1）等价于：

$$
\min_x \frac{1}{2} \|Ax - y\|_2^2 + \sum_{l=1}^L \lambda_l g(z_l) \\
s.t. z_l = D_l x, \quad \forall l \in {1, 2, ..., L} \tag{2}
$$

它的增强的拉格朗日函数是：

$$
L_p(x, z, \alpha) = \frac{1}{2} \|Ax - y \|_2^2 + \sum_{l=1}^L[\lambda_l g(z_l) + <\alpha_l, D_lx - z_l> + \frac{\rho_l}{2}\|D_lx - z_l\|_2^2] \tag{3}
$$

其中 $\alpha = {\alpha_l}$ 是拉格朗日乘子表示对偶变量， $\rho = {\rho_l}$ 是惩罚参数。为了简单， 我们使用缩放的定义 $\beta_l = \frac{\alpha_l}{\rho_l}(l \in {1, 2, ..., L})$， ADMM通过求解下面三个子问题交替优化 ${x, z, \beta}$:

$$
\begin{cases}
\text{arg}\min_x \frac{1}{2} \|Ax - y\|_2^2 + \sum_{l=1}^L \frac{\rho_l}{2} \|D_lx + \beta_l - z_l \|_2^2 \\
\text{arg}\min_z \sum_{l=1}^L [\lambda_l g(z_l) + \frac{\rho_l}{2}\|D_lx + \beta_l - z_l\|_2^2] \\
\text{arg}\min_\beta \sum_{l=1}^L <\beta_l, D_l x - z_l>
\end{cases} \tag{4}
$$
将 $A = PF$ 带入等式(4)， 然后这三个子问题有如下的解：

$$
\begin{cases}
X^{(n)}: x^{(n)} = F^T[P^TP + \sum_{l=1}^L \rho_l FD_l^TD_lF^T]^{-1}[P^Ty + \sum_{l=1}^L\rho_lFD_l^T(z_l^{(n-1)} - \beta_l^{(n-1)})], \\
Z^{(n)}: z_l^{(n)} = S(D_lx^{(n)} + \beta_l^{(n-1)}; \lambda_l / \rho_l), \\
M^{(n)}: \beta_l^{(n)} = \beta_l^{(n-1)} + \eta_l (D_l x^{(n)} - z_l^{(n)})
\end{cases} \tag{5}
$$
其中 $n \in {1, 2, ..., N_s}$ 表示第 n 个迭代并且上标 T 分别指实数和复数的转置和共轭转置运算符。操作 $x^{(n)}$ 可以通过快速傅里叶变换高效地计算，因为 $P^T P + \sum_{l=1}^L \rho_l F D_l^T D_l F^T$ 是一个对角矩阵。 $S(·)$ 是一个参数为 $\lambda_l / \rho_l, l \in {1, 2, ..., L}$ 的非线性 shrinkage 函数。 它通常是一个软或硬的阈值函数，分别对应于 $l_1$ 和 $l_0$ 正则化器的稀疏正则化。 参数 $\eta_l$ 是更新乘子的更新率。


**ADMM solver II**: 通过在空间域（图像域）引入辅助变量 $z$， 等式（1）等价于：

$$
\min_{x, z} \frac{1}{2}\|Ax - y\|_2^2 + \sum_{l=1}^L \lambda_l g(D_l z) \qquad s.t. \quad z = x \tag{6}
$$


通过这种方式， 他的增广拉格朗日函数是：

$$
L_p(x, z, \alpha) = \frac{1}{2} \|Ax - y\|_2^2 + \sum_{l=1}^L \lambda_l g(D_l z) + <\alpha, x-z> + \frac{\rho}{2}\|x - z\|_2^2 \tag{7}
$$

使用缩放的拉格朗日乘子 $\beta = \frac{\alpha}{\rho}$， 我们可以表达子问题为：

$$
\begin{cases}
\text{arg} \min_x \frac{1}{2} \|Ax - y\|_2^2 - \frac{\rho}{2}\|x + \beta - z\|_2^2, \\
\text{arg} \min_z \sum_{l=1}^L \lambda_l g(D_l z) + \frac{\rho}{2}\|x + \beta -z \|_2^2 \\
\text{arg} \max_\beta<\beta, x -z>
\end{cases} \tag{8}
$$

一种求解第二个子问题的方式是直接应用梯度下降算法，其产生ADMM算法的迭代：

$$
\begin{cases}
X^{(n)}: x^{(n)} = F^T(P^TP + \rho I)^{-1}[P^Ty + \rho F(z^{(n-1) - \beta^{(n-1)}})], \\
Z^{(n)}: z^{(n, k)} = \mu_1 z^{(n, k-1)} + \mu_2(x^{(n)} + \beta^{(n-1)}) - \sum_{l=1}^L \tilde \lambda_l D_l^T H(D_l z^{(n, k -1)}), \\
M^{(n)}: \beta^{(n)} = \beta^{(n-1)} + \tilde \eta (x^{(n)} - z^{(n)})
\end{cases} \tag{9}
$$

其中 I 是一个大小为 $N \times N$ 的单位矩阵。



**ADMM solver II:** 