---
layout:     post
title:      "【深度学习】DAUHST: Degradation-Aware Unfolding Half-Shuffle Transformer for Spectral Compressive Imaging"
subtitle:   ""
date:       2022-06-22
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - HSI
---


# Abstract
在编码孔径快照光谱压缩成像(CASSI)系统中，采用高光谱图像重建(HSI)方法从 compressed measurement 数据中恢复空间光谱信号。

在这些算法中，deep unfolding 方法表现出良好的性能，但存在两个问题。

首先，它们没有从高度相关的CASSI 中估计退化模式和病态程度来指导迭代学习。

其次， 它们主要使用基于 CNN 的方法， 在捕获长程依赖时表现出局限性。

这篇文章提出了一个 principled Degradation-Aware Unfolding 框架(DAUF)，从 compressed image 和 physical mask 估计参数，然后使用这些参数来控制每次迭代。

此外，这篇文章还定制了一种新的 Half-Shuffle Transformer (HST)，它可以同时捕获 local contents 和 non-local dependencies。

通过将 HST 插入到 DAUF 中，建立了第一种基于 Transformer 的 deep unfolding 方法—— Degradation-Aware Unfolding Half-Shuffle  Transformer (DAUHST)，用于HSI重构。


# Introduction 
高光谱图像比普通RGB图像具有更多的光谱波段，可以存储更详细的信息。因此，HSI 被广泛应用于图像识别、目标检测、跟踪、医学图像处理、遥感等领域。为了获得 HSI ，传统的成像系统使用光谱仪沿着光谱或空间维度扫描场景，通常需要很长时间。这些成像系统无法捕捉动态物体。最近，快照压缩成像(SCI)系统已被开发用于以视频速率捕获HSI。在这些SCI系统中，编码孔径快照光谱成像(CASSI)以其令人印象深刻的性能脱颖而出。CASSI 使用编码孔径和 disperser 在不同波长调制 HSI 信号，然后混合所有调制信号产生二维压缩 measurement。随后，采用 HSI 复原方法解决CASSI逆问题，即从 measurement 恢复 HSI。这些方法分为 4 类:

- 基于模型的方法依赖于手工制作的图像先验，如 total variation，sparsity，low-rank等。这些方法有理论推到证明并且具有可解释性。此外，这些方法需要手工调整参数，这减慢了重构速度。同时，它们的表征能力和泛化能力也很有限。
- 即插即用(plug -and-play, PnP)算法将预训练的去噪网络插入传统的基于模型的方法，以解决HSI重构问题。然而，PnP方法中预训练的网络是固定的，不再训练，因此限制了性能。
- 端到端(E2E)算法使用一个强大的模型，通常是卷积神经网络(CNN)，来学习从measurement 到期望的 HSI 的端到端映射函数。端到端方法具有深度学习的能力。然而，他们从压缩 measurement 到底层光谱图像学到的是一种暴力映射，从而忽略了CASSI系统的工作原理。它们没有经过理论验证的特性、可解释性和灵活性，因为不同硬件系统的成像模型之间存在很大差异。
-  Deep unfolding 方法采用多级网络将 measurement 结果映射到 HSI 立方体中。每一阶段通常包括两个阶段，即先通过线性投影，然后将信号通过学习底层降噪先验的单阶段网络。在 deep unfolding 方法中，通过显式地刻画图像先验和系统成像模型，可以直观地解释网络结构。此外，这些方法还具有深度学习的力量，具有很大的潜力。然而，这一潜力尚未得到充分探索。

现有的深度展开算法存在两个问题:

- 迭代学习与CASSI系统高度相关。然而，目前的展开方法并没有在每次迭代中估计 CASSI 退化模式和病态度来调整线性投影和去噪网络。
- 现有的深度展开方法主要基于CNN，因此在捕捉非局部自相似性和远程依赖性方面存在局限性，而这两者对 HSI 重建至关重要。

# Conclusion

这篇文章弥补了以往 deep unfolding 方法存在的两个问题: 

1)它们不估计来自CASSI系统的信息参数来指导迭代学习

2) 它们主要基于CNN，在捕获远程依赖性方面显示出局限性。

为了解决这些挑战，首先制定了基于 principled MAP-based unfolding framework DAUF，从compressed measurement 和physical mask 估计参数。

然后，将获取 CASSI degradation patterns 和 ill-posedness degree 的关键线索的参数用于每次迭代，以 contextually scale 线性投影，并为去噪网络提供噪声水平信息。

其次，这篇文章提出了一种新的Transformer HST，它可以联合提取局部内容和建模非局部依赖。

通过将 HST 插入 DAUF， 得到首个基于 Transformer 的 unfolding 方法 DAUHST 用于 HSI 重构。