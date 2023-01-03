---
layout:     post
title:      "【深度学习】Generative Modeling by Estimating Gradients of the Data Distribution"
subtitle:   ""
date:       2023-01-03
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - Diffusion
---

这篇博客文章关注的是生成建模的一个有前途的新方向。我们可以在大量的噪声扰动数据分布上学习分数函数(对数概率密度函数的梯度)，然后用朗之万型采样生成样本。这种生成模型方法通常被称为基于分数的生成模型，与现有模型家族相比具有几个重要的优势:无需对抗性训练的 GAN 级样本质量，灵活的模型架构，精确的对数似然计算，以及无需重新训练模型的逆问题解决。

# Introduction

现有的生成建模技术可以根据它们表示概率分布的方式大致分为两类。

- **基于似然的模型**， 通过(近似)最大似然直接学习分布的概率密度(或质量)函数。典型的基于似然的模型包括自回归模型、归一化流模型、基于能量的模型(EBMs)和变分自编码器(VAEs)。
- **隐式生成模型**， 其中概率分布隐式地表示为采样过程的模型。最突出的例子是生成对抗网络(GANs)，其中通过使用神经网络转换随机高斯向量来合成来自数据分布的新样本。

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1672728011571.png)

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1672728032162.png)
然而，基于似然的模型和隐式生成模型都有很大的局限性。基于似然的模型要么需要对模型架构进行严格限制，以确保可处理的归一化常数用于似然计算，要么必须依赖代理目标来近似最大似然训练。另一方面，隐式生成模型通常需要对抗性训练，这是出了名的不稳定，并可能导致模式崩溃。

在这篇博文中，将介绍另一种表示概率分布的方法，这种方法可能会规避这些限制。关键思想是对对数概率密度函数的梯度进行建模，这个量通常被称为(Stein)分数函数。这种基于分数的模型不需要有可处理的归一化常数，可以通过分数匹配直接学习。

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1672728173019.png)

基于分数的模型已经在许多下游任务和应用程序上实现了最先进的性能。这些任务包括图像生成(是的，比GANs更好!)、音频合成、形状生成和音乐生成。

# Reference
1.[Generative Modeling by Estimating Gradients of the Data Distribution](https://yang-song.net/blog/2021/score/)