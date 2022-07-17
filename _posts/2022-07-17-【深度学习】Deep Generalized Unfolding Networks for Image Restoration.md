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