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
- $\color{red}\text{Positive semidefinite cone}$： $\mathbb{S}_+^n = \{X \in \mathbb{S} : X \succeq 0\}$， 其中 $x \succeq$ 0  表示 $X$ 是 positive semidefinite ($\mathbb{S}^n$ 是 $n \times n$ 对称矩阵的集合)

# Key properties of convex sets


- $\color{red}\text{Separating hyperplane theorem}$： 两个不想交的 convex sets 在超平面间有 separating

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1661258880612.png)

如果 $C, D$ 有非空 convex sets $C \cap D = \emptyset$， 存在 $a, b$ :

$$
C \subseteq \{x : a^\top x \leq b \} \\
D \subseteq \{x : a^\top x \geq b\}
$$

- $\color{red}\text{Supporting hyperplane theorem}$： 凸集的边界点有一个支撑超平面穿过它

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1661260089038.png)

如果 $C$ 是非空 convex set， $x_0 \in \text{bd}(C)$， 存在 $a$:

$$
C \subset \{x : a^\top x \leq a^\top x_0\}
$$

上述两个定理（seperating 和 supporting hyperplane 定理）都有部分相反；

# Operations preserving convexity

- $\color{red}\text{Intersection}$： 凸集的交是凸的
- $\color{red}\text{Scaling and translation}$ ： 如果 $C$ 是凸的， 那么：

$$
aC + b = \{ax + b : x \in C\}
$$
是凸的， 对于任意 $a, b$ 

- $\color{red}\text{Affine images and preimages}$： 如果 $f(x) = Ax + b$ 并且 $C$ 是凸的， 那么：

$$
f(C) = \{f(x) : x \in C\}
$$

是凸的， 如果 $D$ 是凸的， 那么：

$$
f^{-1}(D) = \{x : f(x) \in D\}
$$

是凸的


# Example: linear matrix inequality solution set

给定 $A_1, ..., A_k, B \in \mathbb{S}^n$， $\color{red}\text{linear matrix inequality}$ 是如下形式：

$$
x_1 A_1 + x_2 A_2 + ... + x_k A_k \preceq B
$$
对于变量 $x \in \mathbb{R}^k$。 让我们证明满足上述不等式的点 $x$ 的集合 $C$ 是凸的


Approach 1： 直接验证 $x, y \in C \Rightarrow tx + (1- t)y \in C$。 对于任意 $v$:

$$
v^\top(B - \sum_{i=1}^k (t x_i + (1 - t)y_i) A_i) v \geq 0
$$

Approach 2:  令 $f: \mathbb{R}^k \rightarrow \mathbb{S}^n$， $f(x) = B - \sum_{i=1}^k x_i A_i$。$C = f^{-1}(\mathbb{S}_+^n)$ 是凸集的 affine preimage。

$$

$$