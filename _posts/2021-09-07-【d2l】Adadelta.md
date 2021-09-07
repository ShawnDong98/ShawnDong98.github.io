---
layout:     post
title:      "【d2l】Adadelta"
subtitle:   ""
date:       2021-09-07
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - d2l
---

# Adadelta

Adadelta 是 AdaGrad的另一个变体。 主要的区别是它减少了坐标的自适应学习率的数量。此外，它使用变化量本身作为未来变化的校准，因此它实际上没有传统意义的学习率。

## The Algorithm

Adadelta 使用两个状态变量， $s_t$ 存储梯度的第二动量的 leaky average， $\Delta x_t$ 存储在模型本身参数的变化的第二动量的 leaky average。 

给定当前的参数 $\rho$， 与11.8 相似， 我们得到下面的 leaky 更新：

$$
s_t = \rho s_{t-1} + (1 - \rho) g_t^2
$$

与11.8不同的是， 我们使用缩放的梯度 $g_t'$ 更新：

$$
x_t = x_{t-1} - g_t'
$$

$g_t'$ 可以计算如下：

$$
g_t' = \frac{\sqrt{\Delta x_{t-1} + \epsilon}}{\sqrt{s_t + \epsilon}} \odot g_t
$$

其中 $\Delta x_{t-1}$ 是缩放梯度 $g_t'$  平方的 leaky average。 我们初始化 $\Delta x_0$ 为0， 并且在每个时间步更新 $g_t'$：

$$
\Delta x_t = \rho \Delta x_{t-1} + (1 - \rho) g_t'^2
$$

$\epsilon$ 用来控制数值稳定性

