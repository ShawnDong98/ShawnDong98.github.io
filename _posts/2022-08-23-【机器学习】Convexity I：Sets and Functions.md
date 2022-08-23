---
layout:     post
title:      "【机器学习】Convexity I: Sets and Functions"
subtitle:   ""
date:       2022-08-23
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 机器学习
    - 凸优化
---

凸优化问题是以下形式：

$$
\min_{x \in D} f(x) \quad \text{subject to} \quad g_i(x) \leq 0, i = 1, ..., m \quad h_j(x) = 0, j=1, ..., r
$$

其中 $f$ 和 $g_i, i =1, ..., m$ 都是凸的， $h_j, j=1, ..., r$ 是 affine。 

特殊的性质： 任意局部最小值都是全局最小值。


# Convex sets

$\color{red}{\text{Convex set}}$： $C \in \mathbb R^{n}$ ：

$$
x, y \in C \Rightarrow tx + (1 - t)y \in C \quad \text{for all} \quad 0 \leq t \leq 1
$$
简单来说，连接任何两个元素的线段完全在集合中

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1661255260945.png)

$x_1, ..., x_k \in \mathbb{R}^n$ 的$\color{red}{\text{Convex combination}}$ ： 任意线性组合：

$$
\theta_1 x_1 + ... + \theta_k x_k
$$

$\theta_i \geq 0, i = 1, ..., k$， 并且 $\sum_{i=1}^k \theta_i = 1$ 。 

集合 $C$ 的 $\color{red}{\text{Convex hull}}$ $\text{conv}(C)$ 是所有元素的 convex combinations。 并且总是凸的。