---
layout:     post
title:      "【机器学习】Subgradient Method"
subtitle:   ""
date:       2022-08-23
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 机器学习
    - 凸优化
---



考虑该问题

$$
\min_x f(x)
$$

$f$ 为凸函数， $\text{dom}(f) = \mathbb{R}^n$。 

**Subgradient mthod：** 选择一个初始值 $x^{(0)} \in \mathbb{R}^n$， 重复：

$$
x^{(k)} = x^{(k-1)} - t_k · g^{(k-1)}, \quad k = 1, 2, 3 ... 
$$

其中 $g^{(k-1)} \in \partial f(x^{(k-1)})$ 。