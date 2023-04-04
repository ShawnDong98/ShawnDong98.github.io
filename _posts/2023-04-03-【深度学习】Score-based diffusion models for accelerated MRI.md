---
layout:     post
title:      "【深度学习】Score-based diffusion models for accelerated MRI"
subtitle:   ""
date:     2023-04-03
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - Diffusion
---

# Abstract

基于分数的扩散模型提供了一种使用数据分布的梯度对图像进行建模的强大方法。

利用先前的学习分数函数，在这里我们介绍了一种从给定观测条件分布中采样数据的方法，这样该模型可以很容易地用于解决成像中的逆问题，特别是accelerated MRI。

简而言之，我们训练了一个具有去噪得分匹配的连续时间依赖得分函数。

然后，在推理阶段，我们在数值 SDE 求解器和数据一致性步骤之间迭代，以实现重建。

我们的模型仅用训练需要的图像，但能够重建 complex-valued 数据，甚至扩展到并行成像。

所提出的方法与欠采样模式无关，并具有出色的泛化能力。

此外，由于其生成性质，我们的方法可以量化不确定性，这在标准回归设置下是不可能的。

除了所有优点外，我们的方法还具有非常强大的性能，甚至击败了经过全面监督训练的模型。

通过广泛的实验，我们验证了我们的方法在质量和实用性方面的优越性。


# Main Contributions


## Forward Measurement Model

在 accelerated MRI 中，我们考虑以下观测模型：

$$
y = Ax \tag{7}
$$

参数化前向观测矩阵 $A \in C^{m \times n}$ 被定义为：

$$
A := P_{\Omega} F S \tag{8} 
$$

其中 $S := {S^{(1)}; ...; S^{(c)}}$ 是 $c$ 个不同 coil 的 sensitivity map， $F$ 表示傅里叶变换， $P_{\Omega}$ 是对角矩阵表示给定采样模式 $\Omega$ 的欠采样操作。 Sensitivity map $S$ 被规范化，因此有：

$$
S^* S = I \tag{9}
$$

在 single-coil acquisition 的情况下， $S$ 简化为单位矩阵，因此有 $A_{(sc)} = P_{\Omega}F$。


## Reverse SDE for Accelerated MR Reconstruction

一个经典的找到等式 (7) 的解的方法是求解下列有约束的优化问题：

$$
\min_x \Psi(x) \qquad \text{subject to} \qquad y = Ax \tag{10}
$$

其中 $\Psi(·)$ 是从压缩感知理论中得到的 sparsity promoting regularizer， 例如 $l_1$ 小波变换以及 TV。 求解 Eq. (10) 通常包含 proximal 算法， 例如 variable splitting 或者 projection onto the convex sets (POCS)， 其解耦先验项和前向一致性项的优化。然后，人们可以交替解决两个子问题，以达到最佳状态。 

在贝叶斯角度， 我们立即看到 Eq. (10) 中的 $\Psi(x)$ 是数据的先验分布， 例如 $p(x)$。 因此， 我们可以想象更精准地估计复杂的先验分布以取得更高质量的样本。

话虽如此，与经典方法相比，所提出的方法的重要区别之一是，而不是对先验分布 $p(x)$ 进行建模, 我们利用它的随机样本。具体来说，从先验分布采样的样本可以从 Eq. (4) 中的反向 SDE 中获得，该 SDE 可以离散化，如算法1所示：


$$
x_i \leftarrow (\sigma_{i+1}^2 - \sigma_i^2)s_\theta(x_{i+1}, \sigma_{i+1}) + \sqrt{\sigma_{i+1}^2 - \sigma_i^2}z \tag{11}
$$

然后，（10）中约束上的数据一致性映射可以通过

$$
x_i \leftarrow x_i + \lambda A^* (y - Ax_i) = (I - \lambda A^*A)x_i + A^*y \tag{12}
$$

对于 $\lambda \in [0, 1]$， 其中 $A^*$ 表示 $A$ 的 Hermitian adjoint。 

我们对算子 $A$ 施加约束使得 $I - \lambda A^*A$ 是一个 non-expansive mapping：

$$
\|(I - \lambda A^* A)x - (I - \lambda A^*A)x'\| \leq \| x - x'\|, \qquad \forall x, x' \tag{13}
$$

例如 projection onto convex sets (POCS) 或者带有可控步长的标准梯度下降对应 non-expansive 数据一致性映射。在下文中，(9) 中的标准化步骤对于确保 $(I − \lambda A^*A)$ non- expansive 至关重要：

**Proposition 1.** 有了 Eq. (9) 的 sensitivity normalization， $(I - \lambda A^*A)$ 对于 $\lambda \in [0, 1]$ 是 non-expansive 的。

*Proof.* 使用谱范数的性质，我们有：

$$
\|A^*A\| = \|S^*F^*P^*_{\Omega} P_{\Omega}FS\| = \|S^*F^*P_{\Omega}FS\| \leq \|S^*F^*FS\| = \|S^*S\| = 1
$$

