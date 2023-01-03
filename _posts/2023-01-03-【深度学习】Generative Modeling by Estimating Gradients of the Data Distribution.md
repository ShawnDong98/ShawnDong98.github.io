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

这篇博客文章关注的是生成建模的一个有前途的新方向。我们可以在大量的噪声扰动数据分布上学习分数函数(对数概率密度函数的梯度)，然后用朗之万型采样生成样本。

# Reference
1.[Generative Modeling by Estimating Gradients of the Data Distribution](https://yang-song.net/blog/2021/score/)