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