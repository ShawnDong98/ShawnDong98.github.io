---
layout:     post
title:      "【深度学习】Score-baed Diffusion：Score-Based Generative Moddling Through Stochastic  Differential Equations"
subtitle:   ""
date:       2022-12-19
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     true
tags:
    - 深度学习
    - Diffusion
    - ICLR 2021
---

# Abstract

从数据中创建噪声很容易；从噪声中创建数据是生成建模。

我们提出了一个随机微分方程（SDE），通过缓慢注入噪声将复合数据分布平稳转换为已知的先验分布，以及相应的反向时间SDE，通过缓慢消除噪声将先验分布转换回数据分布。

至关重要的是，反向时间 SDE 仅取决于扰动数据分布的时间依赖梯度场（又名分数）。



# Conclusion