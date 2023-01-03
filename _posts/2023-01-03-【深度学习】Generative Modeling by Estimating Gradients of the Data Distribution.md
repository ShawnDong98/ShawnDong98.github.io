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

# Reference
1.[Generative Modeling by Estimating Gradients of the Data Distribution](https://yang-song.net/blog/2021/score/)