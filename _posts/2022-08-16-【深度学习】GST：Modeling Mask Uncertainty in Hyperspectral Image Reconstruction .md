---
layout:     post
title:      "【深度学习】GST：Modeling Mask Uncertainty in Hyperspectral Image Reconstruction "
subtitle:   ""
date:       2022-08-16
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - HSI
    - ECCV 2022
---

# Abstract


近年来，高光谱成像(HSI)引起了越来越多的研究关注，特别是基于编码孔径快照光谱成像(CASSI)系统的高光谱成像。

现有的深度HSI重构模型通常是在成对数据的基础上进行训练，以在CASSI中特定的光学硬件 mask 给出的二维压缩 measurements 上检索原始信号，在此期间 mask 在很大程度上影响重构性能，并可以作为控制数据增强的 “model hyperparameter”。

这种 mask-specific 的训练方式将导致硬件错误校准问题，从而为在不同硬件和噪声环境中部署深度HSI模型设置了障碍。

为了解决这一挑战，作者使用完整的变分贝叶斯学习处理为HSI引入 mask 不确定性，并通过受真实硬件启发的 mask 分解对其进行显式建模。

特别地，作者提出了一种新的基于图的自调整(GST)网络，以适应不同硬件中不同空间结构的 mask 的不确定性。

此外，作者开发了一个双层优化框架，以平衡HSI重建和不确定性估计，其负责 mask 的超参数属性。

# Methodology

## Preliminaries

**Hardware miscalibration.**  Deep HSI models 在参数 $\theta$ 和 mask $m$ 之间存在一种成对关系。但是 $m$ 和 $\theta$ 之间的校准问题将会导致明显的性能下降。考虑到昂贵的训练时间和硬件中存在的各种噪声，这种错误校准问题不可避免地影响了跨真实系统部署深度HSI模型的灵活性和鲁棒性。为了解决这个问题， 将模型 $f_\theta$ 和 多个 mask 一起建模。然而， 用随机 masks 直接训练单个网络不能在没有见过的 masks 上提供满意的表现，因为缺乏探索在 uncertainties 和 不同 mask 结构之间关系。

## Mask Uncertainty

建模 mask uncertainty 是有挑战性的， 由于：

- 2D mask 的高维度和 mask set 大小的限制
- mask 中多变的空间结构

受到 mask 值分布的启发， 其峰值为 0 和 1 的高斯分布， 将 mask 分为两部分：

$$
m = \tilde m + z
$$
假设 $z$ 中的每个像素服从一个高斯分布， 表示为 $p(z) = \mathcal{N}(\mu, \sigma)$。$\tilde m$ 表示具有特定空间结构的二值 mask。 


## Mask Uncertainty 

## Graph-based Self-Tuning Network

## Bilevel Optimization



# Conclusions

这项工作探索了在真实的CASSI系统中部署深度HSI模型时的一个实际的硬件错误校准问题。

解决方案是通过建模 mask 的不确定性来校准单个重建网络。

受真实 mask 观测的启发，作者提出了一种基于一种可能的 mask 分解的全变分贝叶斯学习方法。

以变分 mask 分布建模和HSI检索为目标，作者引入并实现了一种新的基于图的自调整(GST)网络，该网络在二层优化框架下进行HSI重构和不确定性推理。

该方法实现了平滑分布，并在两种不同的错误校准场景下取得了良好的性能。