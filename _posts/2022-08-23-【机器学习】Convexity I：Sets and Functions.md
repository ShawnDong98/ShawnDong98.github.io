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

$\color{red}{\text{Convex set}}$： $C \subseteq \mathbb R^{n}$ ：

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


# Examples of convex sets

- 空集， 点， 线
- $\color{red}{\text{Norm ball}}$ : $\{x: \| x \| \leq r\}$, 给定范数 $\| · \|$， 半径为 $r$
- $\color{red}\text{Hyperplane}$ : $\{x : a^\top x = b\}$， 给定 $a, b$
- $\color{red}\text{Halfspace}$ ： $\{x : a^\top x \leq b\}$
- $\color{red}\text{Affine space}$ ： $\{x ： Ax = b\}$， 给定 $A, b$
- $\color{red}\text{Polyhedron}$ ： $\{x : Ax \leq b\}$， 其中不等号解释为 componentwise
-  $\color{red}\text{Simplex}$： plolyhedra 的特殊情况， 给定 $\text{conv}\{x_0, ..., x_k\}$， 其中这些点是 affinely independent 的


# Cones

$\color{red}\text{Cone}$： $C \subseteq \mathbb{R}^n$:

$$
x \in C \Rightarrow tx \in C \quad \text{for all} \quad t \geq 0
$$

$\color{red}\text{Convex cone}$： cone 也是凸的， 例如：

$$
x1, x2 \in C \Rightarrow t_1x_1 + t_2x_2 \in C \quad \text{for all} \quad t_1, t_2 \geq 0
$$

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1661256386114.png)

$x_1, ..., x_k \in \mathbb{R}^n$ 的 $\color{red}\text{Conic combination}$ ： 任意线性组合：

$$
\theta_1 x_1 + ... + \theta_k x_k
$$
其中 $\theta_i \geq 0, i = 1, ..., k$。

$\color{red}{\text{Conic hull}}$ 是所有 conic combination。

# Examples of convex cones

- $\color{red}\text{Norm cone}$: $\{(x, t): \| x \| \leq t\}$ ， 对于一个范数 $\| · \|$。 在 $\ell_2$ 范数 $\| · \|_2$ 下， 叫做 $\color{red}\text{second-order cone}$
- $\color{red}\text{Normal cone}$： 给定集合 $C$ 和 点 $x \in C$, 我们可以定义：

$$
\mathcal{N}_C(x) = \{g : g^\top x \geq g^\top y, \quad \text{for all} \quad y \in C\}
$$
![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1661256944056.png)