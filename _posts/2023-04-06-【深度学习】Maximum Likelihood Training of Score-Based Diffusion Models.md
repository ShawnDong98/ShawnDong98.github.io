---
layout:     post
title:      "【深度学习】Maximum Likelihood Training of Score-Based Diffusion Models"
subtitle:   ""
date:       2023-04-06
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - Diffusion
    - NIPS 2021
---

# Abstract

基于分数的扩散模型通过逆转将数据扩散到噪声的随机过程来生成样本，并通过最大限度地减少分数匹配损失的加权组合来训练。

基于分数的扩散模型的对数似然可以通过与 continuous normalizing flows 的联系来计算，但对数似然并不通过分数匹配损失的加权组合直接优化。

我们表明，对于特定的加权方案，目标上界是负对数似然，从而实现基于分数的扩散模型的近似最大似然训练。

我们实证地观察到，最大似然训练始终如一地提高了跨多个数据集、随机过程和模型架构的基于分数的扩散模型的似然。

我们最好的模型在 CIFAR-10 和 ImageNet $32 \times 32$ 上实现了 2.83 和 3.76 bit/dim 的负对数似然，没有任何数据增强，与这些任务上最先进的自回归模型相当。

