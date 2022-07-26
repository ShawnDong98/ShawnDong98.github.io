---
layout:     post
title:      "【深度学习】ADMM-Net：Deep Tensor ADMM-Net for Snapshot Compressive Imaging "
subtitle:   ""
date:       2022-06-26
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - HSI
    - ICCV 2019
---


# Abstract

快照压缩成像(SCI)系统已被开发用于使用低维 off-the-shelf 传感器捕捉高维(>=3)信号，即将多个视频帧映射到单个 measurement 帧。

SCI系统的一个关键模块是一个准确的解码器，可以恢复原始视频帧。

然而，现有的基于模型的解码算法需要利用先验知识进行彻底的参数调优，由于运行时间过长，无法支持实际应用。

这篇文章提出了一种用于视频SCI系统的 Deep Tensor ADMM-Net，它可以在秒内提供高质量的解码。

首先，从一个标准的 tensor ADMM 算法开始，将其推理迭代展开到一个 layer-wise 结构中，并设计了一个基于张量运算的深度神经网络。

其次，网络不依赖于预先指定的稀疏表示域，而是通过随机梯度下降法学习低秩张量域。

值得注意的是，提出的 Deep Tensor ADMM-Net 具有潜在的数学解释。

在公共视频数据上的仿真结果表明，该方法的PSNR平均提高0.8 2.5 dB, SSIM平均提高0.07 0.1，提速1500-3600次。

在SCI相机捕获的真实数据上，实验结果显示了与最先进的方法相比较的视觉效果，但运行时间更短


# Video SCI Systems and Tensor Model 

## Snapshot Compressing Imaging System

在 video SCI 系统 (例如, CACTI) 如图1所述， 考虑 $B$ 帧视频 $\mathcal{X} \in \mathbb{R}^{n_1 \times n_2 \times B}$ 是由 $B$ 个 sensing matrices(mask)  $\mathcal{C} \in \mathbb{R}^{n_1 \times n_2 \times B}$调制和压缩的， measurement 帧 $Y \in \mathbb{R}^{n_1 \times n_2}$ 可以表述为：

$$
Y = \sum_{b=1}^B \mathcal{C}^{(b)} \odot \mathcal{X}^{(b)} + N \tag{1}
$$

数学上, (1) 中的 measurement 可以用下面的线性等式表达：

$$
y = \Phi x + n \tag{2}
$$
其中 $y = Vec(Y) \in \mathbb{R}^{n_1n_2}$ 并且 $n = Vec(N) \in \mathbb{R}^{n_1n_2}$。相应地， 视频信号 $x \in \mathbb{R}^{n_1n_2B}$ 是：

$$
x = Vec(\mathcal{X}) = [Vec(\mathcal{X}^{(1)})^T, ..., Vec(\mathcal{X}^{(B)})^T]^T \tag{3}
$$
与传统的压缩感知不同， video SCI 中的 sensing matrix 是稀疏的并且呈现出对角块结构：

$$
\Phi = [\text{diag}(Vec(\mathcal{C}^{(1)})), ..., \text{diag}(Vec(\mathcal{C}^{(B)})) ] \tag{4}
$$

因此， 采样率这里等于 $1 / B$。 

因为 video 是沿着时间的帧序列， 将 video 表示为 3D/4D 数组(张量) 并且将 video SCI 解码任务视为从随机线性 measurements 重构一个三阶张量是很直观的。


## Tensor Operations

为了重构张量 $\mathcal{X} \in \mathbb{R}^{n_1 \times n_2 \times B}$,  SCI 解码器基于定义1中的 *Tesnor Nuclear-Norm* 定义。一个 3D 张量 $\mathcal{X}$ 通常可以被视为一个在三维空间中由 $n_1 \times n_2$ 的二维矩阵组成的。将张量 $\tilde{\mathcal{X}}$ 表示为 $\mathcal{X}$ 在频域表示， 在每个 tube 上通过傅里叶变换得到， 如 $\tilde X(i, j, :) = fft(\mathcal{X}(i, j, :))$ 。

**Definition 1. Tensor Nuclear-Norm (TNN)** 张量 $\mathcal{T}$ 的 tensor nuclear norm 被定义为 $\|T\|_{TNN} = \|\bar T\|_*$, 其中 $\|·\|_*$ 表示 matrix nuclear norm, 例如所有 frontal slices 的 奇异值的和 $\tilde{\mathcal{T}^{(b)}}, b \in \{1, ..., B\}$ ， 并且 $\bar{\mathcal{T}}$  表示三阶张量 $\tilde{\mathcal{T}}$ 的对角块形式：


$$
\bar{\mathcal{T}} \stackrel{\triangle}= \begin{matrix}
\left[\begin{array}{rr} 
\tilde{\mathcal{T^{(1)}}} & & & \\
& \tilde{\mathcal{T^{(2)}}} & & \\
& & \cdots & \\
& & & \tilde{\mathcal{T^{(B)}}}
\end{array}\right]
\end{matrix}  \in \mathbb{C}^{n_1 B \times n_2B} \tag{5}
$$

TNN 已经被证明在 tensor multi-rank 的 $l_1$范数的情况下是  tightest convex relaxation。通过泛化傅里叶变换到其他满秩时间-频率域变换， 将 $\|\mathcal{T}\|_{\Lambda, TNN} = \|\bar{\mathcal{T}}\|_{\Lambda, *}$ 表示为在变换 $\Lambda$ 下 $\mathcal{T}$ 的 TNN。




# Conclusion

这篇文章为快照压缩成像系统提出了一种 Deep Tensor ADMM-Net，可以在秒内提供高质量的解码。

将低秩张量模型嵌入到 ADMM 框架中，并将迭代展开到神经网络阶段，因此网络具有潜在的数学解释。

在仿真和真实的 SCI 相机数据上的实验表明，提出的方法展示了优越的性能，并优于目前最先进的算法。
