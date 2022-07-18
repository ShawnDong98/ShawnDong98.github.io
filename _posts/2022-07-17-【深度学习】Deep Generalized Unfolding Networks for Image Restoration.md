---
layout:     post
title:      "【深度学习】Deep Generalized Unfolding Networks for Image Restoration"
subtitle:   ""
date:       2022-07-17
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - CVPR 2022
---

# Abstract

深度神经网络(DNN)在图像恢复方面取得了巨大的成功。

然而，大多数DNN方法被设计成一个黑盒，缺乏透明性和可解释性。

尽管有人提出一些方法将传统优化算法与DNN相结合，但它们通常需要预先定义退化过程或手工制作的假设，使其难以处理复杂和真实的应用。

这篇文章提出了一种用于图像复原的深度泛化展开网络(DGUNet)。

具体地说，在不损失可解释性的情况下，将梯度估计策略集成到 Proximal Gradient Descent(PGD)算法的梯度下降步骤中，驱动它处理复杂和真实的图像退化。

此外，作者在不同的PGD迭代中设计了across proximal mapping 的 inter-stage 信息通路，通过一种多尺度和空间自适应的方式来纠正大多数深度展开网络(DUN)的固有信息损失。

通过整合灵活的梯度下降和 informative proximal mapping，将迭代PGD算法展开为一个可训练的DNN。

对各种图像恢复任务的广泛实验证明了该方法在最先进的性能、可解释性和泛化方面的优越性。

# Related Works

## Deep Unfolding Networks

深度展开网络(DUN)的主要思想是，传统的迭代优化算法可以通过一堆循环 DNN 块等价地进行叠加。这种对应关系最初应用于 deep plug-and-play（PNP）方法[44、57、74、92、94]，其利用训练好的 denoiser 隐式地将正则化项 $J(x)$ 表示为去噪问题。在PNP的启发下，DUN方法在特定任务中联作优化可训练的 denoiser，以端到端的方式进行训练。 例如，[16]联合优化了UNet作为ADMM [5]算法中的近似映射。然而，其网络结构与处理预定义图像退化的人工假设的退化假设密切相关。[88]使用 ResUNet 取代了 HQS [27] 算法中的近似映射。然而，退化过程也是手动设计的，其网络需要 scale factor、blur kernel 和 noise level 作为额外的输入，因此性能在很大程度上取决于所提供的 degradation factors 的准确性。[60、73、83]通过已知退化过程的PGD算法[4]解决了压缩感知。此外，由于每个阶段结束时的特征到图像的转换，大多数DUN方法都受到信息丢失的困扰。虽然[48]中的跳跃连接有利于信息传输，但其实现仍然原始，例如，特征融合是通过在近似映射模块的单个解码器层上串联来实现的。


# Methodology

## Traditional Proximal Gradient Descent

PGD 算法通过一个迭代函数估计等式$3$ 为一个迭代收敛问题：

$$
\hat x^k = \arg \max_x \frac{1}{2} \| x - (\hat x^{k-1} - \rho \nabla g(\hat x^{k -1 })) \|_2^2 + \lambda J(x) \tag{4}
$$

其中 $\hat x^k$ 表示第 $k$ 次迭代的输出， $g(·)$表示等式 $3$ 的数据保真度。 $\nabla$ 是微分操作， 齐备步长 $\rho$ 加权。数学上来说， 上面等式第一部分是一个梯度下降操作， 后面一部分可以通过近似操作 $prox_{\lambda, J}$ 求解。 因此， 它可分为两个子问题， 梯度下降和近似映射。

$$
v^k = \hat x^{k-1} - \rho A^T(A \hat x^{k-1} - y) \tag{5a}
$$

$$
\hat x^k = prox_{\lambda, J}(v^k) \tag{5b}
$$

PGD 算法迭代更新 $v^k$ 和 $\hat x^k$ 直到收敛。 ISTA[4] 是一个典型的基于 PGD 的算法， 其正则项定义为 $l_1$ 范数， $J(x) = \| x \|_1$。 因此， ISTA 中的近似映射通过一个 软阈值函数 得到： $\text{prox}_{\lambda, J} (v^k) = \text{sign}(v^k) \max(0, \mid v^k \mid - \lambda)$。 然而， 手工 $l_1$ 正则限制了表征能力， 并且其在其应用限制在少数几个退化已知的任务(例如压缩感知)。 这篇文章专注于改进传统PGD算法，通过具有鲁棒和泛化设计的深层神经网络来展开它。

## Proposed Deep Generalized Unfolding Network

所提出的 DGUNet 的整个网络结构如图 2 所示， 其是一个基于 DNN 的 PGD 算法的展开框架。 




# Conclusion and Discussion

本文提出了一种用于图像复原的深度泛化展开网络(DGUNet)。

开发的原则旨在结合基于模型的方法和深度学习方法的优点。

为此，将PGD优化算法展开到一个深度网络中，并将梯度估计策略集成到梯度下降步骤中，使其易于应用于复杂和真实的应用。

为了弥补DUN中固有信息的损失，设计了多尺度和空间自适应归一化的阶段间特征路径。

在众多图像复原任务上的广泛实验(包括十二个综合和真实测试集)证明了该方法在性能、可解释性和泛化性方面的优越性。