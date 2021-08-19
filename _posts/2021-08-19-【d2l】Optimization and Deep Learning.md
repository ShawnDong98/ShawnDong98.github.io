---
layout:     post
title:      "【d2l】Optimization and Deep Learning"
subtitle:   ""
date:       2021-08-19
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - d2l
---


在本节中，我们将讨论优化和深度学习之间的关系，以及在深度学习中优化的挑战。对于深度学习问题，我们通常会先定义一个 **损失函数**。一旦我们有了损失函数，我们就可以使用优化算法来尝试最小化损失。在优化中，损失函数常被称为优化问题的目标函数。根据传统和惯例，大多数优化算法都是关于 **最小化** 的。如果我们需要最大化一个目标，有一个简单的解决方案: 翻转目标函数的符号。


# Goal of Optimization

虽然优化为深度学习提供了一种最小化损失函数的方法，但从本质上讲，优化的目标与深度学习的目标是完全不同的。前者主要关注最小化一个目标，而后者关注在给定有限数据的情况下找到一个合适的模型。在第4.4节中，我们详细讨论了这两个目标之间的区别。例如，训练误差和泛化误差一般是不同的: 由于优化算法的目标函数通常是基于训练数据集的损失函数，优化的目标是减少训练误差。然而，深度学习(或者更广义地说，统计推理)的目标是减少泛化误差。为了实现后者，除了使用优化算法减少训练误差外，还需要注意过拟合。

```python
%matplotlib inline
import numpy as np
import torch
from mpl_toolkits import mplot3d
from d2l import torch as d2l
```

为了说明上述不同的目标，让我们考虑经验风险和风险。如4.9.3.1节所述，经验风险是训练数据集上的平均损失，而风险是整个数据集上的期望损失。下面我们定义了两个函数:风险函数 $f$ 和 经验风险函数 $g$。假设我们只有有限数量的训练数据。$f$ 比 $g$ 曲线更加光滑一些。

```python
def f(x):
    return x * torch.cos(np.pi * x)

def g(x):
    return f(x) + 0.2 * torch.cos(5 * np.pi * x)
```

下图说明了训练数据集上经验风险的最小值可能与风险的最小值(泛化误差)处于不同的位置。


```python
def annotate(text, xy, xytext):  #@save
    d2l.plt.gca().annotate(text, xy=xy, xytext=xytext,
                           arrowprops=dict(arrowstyle='->'))

x = torch.arange(0.5, 1.5, 0.01)
d2l.set_figsize((4.5, 2.5))
d2l.plot(x, [f(x), g(x)], 'x', 'risk')
annotate('min of\nempirical risk', (1.0, -1.2), (0.5, -1.1))
annotate('min of risk', (1.1, -1.05), (0.95, -0.5))
```

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1629363198125.png)


# Optimization Challenges in Deep Learning

在本章中，我们将特别关注优化算法在最小化目标函数时的性能，而不是模型的泛化误差。在3.1节中，我们区分了优化问题中的解析解和数值解。在深度学习中，大多数目标函数都是复杂的，没有解析解。进而，我们必须使用数值优化算法。