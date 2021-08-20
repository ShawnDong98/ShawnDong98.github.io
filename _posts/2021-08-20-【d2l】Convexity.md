---
layout:     post
title:      "【d2l】Convexity"
subtitle:   ""
date:       2021-08-20
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - d2l
    - 深度学习
---


凸性在优化算法设计中起着至关重要的作用。这主要是因为在这样的环境中分析和测试算法要容易得多。换句话说，如果算法即使在凸性设置下也表现不佳，那么我们通常就不应该期望在其他情况下看到很好的结果。此外，尽管深度学习中的优化问题一般是非凸的，但它们往往在局部极小点附近表现出凸的一些性质。

```python
%matplotlib inline
import numpy as np
import torch
from mpl_toolkits import mplot3d
from d2l import torch as d2l
```

# Definitions

在进行凸分析之前，我们需要定义凸集和凸函数。它们导致了通常用于机器学习的数学工具。

## Convex Sets

集合是凸性的基础。简单地说， 向量空间中的集合 $\mathcal{X}$ 如果对于任意的 $a, b \in \mathcal{X}$， $a$ 和 $b$ 的连线也在 $\mathcal{X}$ 中， 那么这个集合就是凸的。

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1629421562686.png)

定义本身并不是特别有用，除非你能对它们做些什么。假设 $\mathcal{X}$ 和 $\mathcal{Y}$ 是凸集。 那么 $\mathcal{X} \cap \mathcal{Y}$ 也是凸集。

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1629421697070.png)

我们可以用一些努力来加强这个结果： 给定凸集 $\mathcal{X_i}$， 它们的并集 $\cap_i \mathcal{X}_i$是凸的。 注意， 这个的逆命题是不成立的， 假设两个不相交的集合 $\mathcal{X} \cap \mathcal{Y} = \varnothing$。 现在选择 $a \in \mathcal{X}$ 并且 $b \in \mathcal{Y}$。 $a$ 和 $b$ 的连线的部分在 $\mathcal{X}$ 和 $\mathcal{Y}$ 的外面。

深度学习中的问题通常定义在凸集上。例如， $\mathbb{R}^d$， 一个d维实数向量的集合， 是一个凸集($\mathbb{R}$^d 上两个点的连线仍然在 $\mathbb{R}^d$ 上)。 在某些情况下我们处理有界长度的变量， 比如球的半径， 定义如 $\{x \mid x \in \mathbb{R}^d \text{ and } \|x\| \leq r\}$。


## Convex Functions

现在我们由凸集引入凸函数 $f$。 给定一个凸集 $\mathcal{X}$, 以及 $f： \mathcal{X} \rightarrow \mathbb{R}$, 对所有 $x, x' \in \mathcal{X}$ 以及 对所有 $\lambda \in [0, 1]$有如下关系， 那么函数是凸的：

$$
\lambda f(x) + (1 - \lambda)f(x') \geq f(\lambda x + (1 - \lambda) x') 
$$

为了说明这一点，让我们绘制一些函数，并检查哪些函数满足要求。下面我们定义几个函数，包括凸函数和非凸函数。

```python
f = lambda x: 0.5 * x**2  # Convex
g = lambda x: torch.cos(np.pi * x)  # Nonconvex
h = lambda x: torch.exp(0.5 * x)  # Convex

x, segment = torch.arange(-2, 2, 0.01), torch.tensor([-1.5, 1])
d2l.use_svg_display()
_, axes = d2l.plt.subplots(1, 3, figsize=(9, 3))
for ax, func in zip(axes, [f, g, h]):
    d2l.plot([x, segment], [func(x), func(segment)], axes=ax)
```

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1629422692493.png)

正如预期的那样，余弦函数是非凸函数，而抛物线函数和指数函数是凸函数。注意 $\mathcal{X}$ 是凸集是必要条件。 否则 $f(\lambda x + (1 - \lambda)x')$ 可能没有定义。


##  Jensen’s Inequality

给定一个凸函数 $f$， 一个最有用的数学工具是  Jensen 不等式。 这相当于对凸性定义的推广：

$$
\sum_i \alpha_i f(x_i) \geq f(\sum_i \alpha_i x_i) \text{ and } E_X[f(X)] \geq f(E_X[X])
$$

其中 $\alpha_i$ 是非负实数， $\sum_i \alpha_i = 1$ 并且 $X$ 是一个随机变量。 换句话说，凸函数的期望不小于一个期望的凸函数，而后者通常是一个更简单的表达式。为了证明第一个不等式，我们对求和中的一项反复应用凸性的定义。

Jensen不等式的一个常见应用是用一个简单的表达式来限定一个较复杂的表达式。例如，它的应用可以是关于部分观察到的随机变量的对数似然。也就是说，我们使用

$$
E_{Y \thicksim P(Y)} [- \log P(X \mid Y)] \geq - \log P(X)
$$

因为 $\int P(X) P(X \mid Y)dY = P(Y)$。 这可以用在变分方法中。这里 $Y$ 通常是未观测到的随机变量， $P(Y)$ 它可能的分布的最优猜测， $P(X)$ 是集成 $Y$ 后的分布。 例如， 聚类 $Y$ 可能是 聚类 标签 并且 $P(X \mid Y)$ 是应用 聚类标签的生成模型。