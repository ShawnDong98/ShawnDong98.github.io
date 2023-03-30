---
layout:     post
title:      "【深度学习】SNIPS: Solving Noisy Inverse Problems Stochastically"
subtitle:   ""
date:       2023-03-30
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - NIPS 2021
---

# Abstract

在这项工作中，我们引入了一种名为 SNIPS 的新型随机算法，该算法从任何线性逆问题的后验分布中采样样本，其中假设观察结果被加性白色高斯噪声污染。

我们的解决方案结合了  Langevin dynamics 和 Newton 的想法，并利用了预训练的最小均方误差（MMSE）高斯去噪器。

所提出的方法依赖于后验分数函数的复杂推导，该函数包括退化算子的奇异值分解（SVD），以获得所需采样的 tractable 迭代算法。

由于其随机性，该算法可以为相同的噪声观测生成多个高感知质量样本。

我们展示了所提出方法的图像去模糊、超分辨率和压缩感知范式的能力。

我们表明，产生的样本锐利、详细且与给定的观测结果一致，它们的多样性暴露了正在解决的逆问题中固有的不确定性。


# Introduction

图像处理领域的许多问题可以转换为噪声线性逆问题。这一系列任务包括去噪、inpainting、去模糊、超分辨率、压缩感知和许多其他图像恢复问题。一个一般的线性逆问题被提出为：

$$
y = Hx + z \tag{1}
$$

我们的目标是从其观测 $y$ 中恢复信号 $x$，通过线性退化算子 $H$ 和加性高斯白噪声给出 $z \thicksim N(0, \sigma_0^2 I)$。在这项工作中，我们假设 $H$ 和 $\sigma_0$ 都是已知的。