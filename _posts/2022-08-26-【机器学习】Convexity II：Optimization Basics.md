---
layout:     post
title:      "【机器学习】Convexity II: Optimization Basics"
subtitle:   ""
date:       2022-08-26
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 机器学习
    - 凸优化
---

# Optimization terminology

一个凸优化问题是：

$$
\max_{x \in D} f(x) \quad \text{subject to} \quad g_i(x) \leq 0, i = 1, ..., m \quad Ax=b
$$
其中 $f$ 和 $g_i, i = 1, ..., m$ 全是 convex 的， 并且 optimization domain 是 $D = \text{dom}(f) \cap \bigcap_{i=1}^m dom(g_i)$

- $f$ 叫做 $\color{red}\text{criterion}$ 或者 $\color{red}\text{objective}$ 函数
- $g_i$ 叫做 $\color{red}\text{inequality constraint}$ 函数
- 如果 $x \in D, g_i(x) \leq 0, i = 1, ..., m$， 并且 $Ax = b$， 那么 $x$ 叫做 $\color{red}\text{feasible point}$
- 对所有 feasible points $f(x)$ 的 $f(x)$ 的最小值叫做 $\color{red}\text{optimal value}$， 写作 $f^*$
- 如果 $x$ 是 feasible 的 并且 $f(x) = f^*$， 那么 $x$ 叫做 $\color{red}\text{optimal}$; 也叫做一个 $\color{red}\text{solution}$ 或者 $\color{red}\text{minimizer}$
- 如果 $x$ 是 feasible 的并且 $f(x) \leq f^* + \epsilon$， 那么 $x$ 叫做 $\color{red}\epsilon\text{-subotimal}$
- 如果 $x$ 是 feasible 的并且 $g_i(x) = 0$， 那么 $g_i$ 在 $x$ 是 $\color{red}\text{active}$ 的
- 凸最小化可以作为凹(concave)最大化来定位


$$
\min_x f(x) \quad \text{subject to} \quad g_i(x) \leq 0 i=1, ..., m  \quad Ax=b \quad i=1, ..., m \quad Ax = b \\
\Leftrightarrow \max_x -f(x) \quad \text{subject to} \quad g_i(x) \leq 0 \quad i=1, ..., m \quad Ax = b
$$

两者都是凸优化问题


# Solution set

令 $X_{opt}$ 表示凸问题的所有解的集合， 写作：

$$
X_{opt} = \text{argmin} \quad f(x) \quad \text{subject to} \quad g_i(x) \leq 0, i = 1, ..., m \quad Ax  = b
$$ 
Key property 1: $X_{opt}$ 是一个 $\color{red}\text{convex set}$

证明： 如果 $x, y$ 是解，那么对于 $0 \leq t \leq 1$
- $g_i(tx + (1 - t)y) \leq tg_i(x) + (1 - t) g_i(y) \leq 0$
- $A(tx + (1 - t)y) = tAx + (1 - t)Ay = b$
- $f(tx + (1 - t)y) \leq tf(x) + (1 - t)f(y) = f^*$

因此 $tx + (1 - t)y$ 也是一个解

Key proberty 2: 如果 $f$ 是 strictly convex， 那么 $\color{red}\text{solution is unique}$，如， $X_{opt}$ 包含一个元素。