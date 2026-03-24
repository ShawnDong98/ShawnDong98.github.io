---
layout:     post
title:      "【机器学习】Proximal Gradient Descent"
subtitle:   ""
date:       2022-08-23
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 机器学习
    - 凸优化
---
# Composite functions

假设：

$$
f(x) = g(x) + h(x)
$$

- $g$ 是凸的，可微的， $\text{dim}(g) = \mathbb{R}^n$ 
- $h$ 是凸的， 不一定可微

如何 $f$ 是可微的，梯度下降更新为：

$$
x^+ = x - t · \nabla f(x)
$$

最小化 $x$ 附近的 **quadratic approximation**， 用 $\frac{1}{t} I $ 替换 $\nabla^2 f(x)$:

$$
x^+ = \mathop{\text{argmin}}_z f(x) + \nabla f(x)^\top (z - x) + \frac{1}{2t}\| z - x \|_2^2
$$

