---
layout:     post
title:      "【d2l】Momentum"
subtitle:   ""
date:       2021-09-02
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - d2l
---


# Basics

## Leaky Averages

上一节讨论了将minibatch SGD作为加速计算的一种方法。它有一个好处是通过平均梯度减小了方差的大小。 小批量随机梯度下降可以由以下公式计算：


$$
g_{t, t-1} = \partial_w \frac{1}{\mid \mathcal{B}_t \mid} \sum_{i \in \mathcal{B_t}} f(x_i, w_{t-1}) = \frac{1}{\mid \mathcal{B}_t \mid} \sum_{i \in \mathcal{B}_t} h_{i, t-1} 
$$

为了使符号表示简单， 我们使用 $h_{i, t-1} = \partial_w f(x_i, w_{t-1})$ 表示对于样本 $i$ 在时间 $t-1$ 使权重更新的随机梯度下降。如果我们可以从方差减小这件事情上受益， 甚至可以不仅在一个 minibatch 上平均梯度， 那就太好了。 完成这一任务的一种方法是用 “leaky average” 替换梯度计算。 

$$
v_t = \beta v_{t-1} + g_{t, t-1}
$$

对于某些 $\beta \in (0, 1)$。 这有效地将当前梯度替换为在多个过去梯度上平均的梯度。$v$ 叫做动量。 将 $v$ 展开得到：

$$
v_t = \beta^2 v_{t-2} + \beta g_{t-1, t-2} + g_{t, t-1} = ... = \sum_{\tau = 0}^{t-1} \beta^\tau g_{t-\tau, t-\tau - 1}
$$

大的 $beta$ 导致更长程的平均， 而小的 $\beta$ 只做了小的纠正。新的梯度替换不再指向某一特定情况下最陡下降的方向，而是指向过去梯度的加权平均方向。这使得我们在不计算整个样本集梯度的情况下， 得到了整个样本集平均梯度的收益。

上面的推理形成了现在的加速梯度方法的基础 ，例如带动量的梯度。在优化问题是病态的情况下，它们还能更有效地解决问题。 

## An Ill-conditioned Problem

为了更好地理解动量法的几何性质，我们重新讨论梯度下降法，尽管目标函数不太好。我们使用 $f(x) = x_1^2 + 2x_2^2$， 一个有些变形的椭球目标。 我们进一步使这个函数变形：

$$
f(x) = 0.1 x_1^2 + 2x_2^2
$$
 
像之前一样，  $f$ 它的最小值在 $(0, 0)$。 这个函数在 $x_1$ 的方向上非常平。  让我们看看当我们像之前一样对这个新函数进行梯度下降时会发生什么。我们使用学习率 0.4。

```python
%matplotlib inline
import torch
from d2l import torch as d2l

eta = 0.4
def f_2d(x1, x2):
    return 0.1 * x1 ** 2 + 2 * x2 ** 2
def gd_2d(x1, x2, s1, s2):
    return (x1 - eta * 0.2 * x1, x2 - eta * 4 * x2, 0, 0)

d2l.show_trace_2d(f_2d, d2l.train_2d(gd_2d))
```


```
epoch 20, x1: -0.943467, x2: -0.000073
```

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1630562905068.png)

经过这样构造之后， $x_2$ 方向的梯度远比 $x_1$ 方向变化地更快。 如果我们选择小的学习率我们可以确保在 $x_2$ 方向上不会发散， 但是我们在 $x_1$ 方向上却难以收敛。 如果我们选择大学习率 $x_1$ 会快速地取得进展， 但是在 $x_2$ 上会发散。 下面的例子解释了从 0.4 到 0.6 缓慢增加学习率会发生什么。 $x_1$ 方向收敛，但是整体解的质量非常糟糕。

```python
eta = 0.6
d2l.show_trace_2d(f_2d, d2l.train_2d(gd_2d))
```

```
epoch 20, x1: -0.387814, x2: -1673.365109
```

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1630563188093.png)


## The Momentum Method

动量法允许我们解决上面描述的梯度下降问题。看看上面的优化轨迹，我们可能会直觉地认为平均过去的梯度效果会很好。在 $x_1$ 方向上累计梯度， 会增加每一步的距离。 在 $x_2$ 方向上梯度震荡， 累积的梯度将会由于震荡减少步长。 使用 $v_t$ 而不是使用梯度 $g_t$,  将会产生以下更新公式：

$$
v_t \leftarrow \beta v_{t-1} + g_{t, t-1}
$$

$$
x_t \leftarrow x_{t-1} - \eta_t v_t
$$

当 $\beta = 0$ 时， 恢复为普通的梯度下降。 在深入研究数学属性之前，让我们快速了解一下算法在实践中的表现。

```python
def momentum_2d(x1, x2, v1, v2):
    v1 = beta * v1 + 0.2 * x1
    v2 = beta * v2 + 4 * x2
    return x1 - eta * v1, x2 - eta * v2, v1, v2

eta, beta = 0.6, 0.5
d2l.show_trace_2d(f_2d, d2l.train_2d(momentum_2d))
```


```
epoch 20, x1: 0.007188, x2: 0.002553
```

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1630563941115.png)

正如我们所看到的，即使使用我们之前使用的相同的学习速率，动量仍然可以很好地收敛。让我们看看当我们减小动量参数时会发生什么。将它减小为一半 $\beta = 0.25$ 导致了一个很难收敛的轨迹。但无论如何， 这都要比没有动量要好。 