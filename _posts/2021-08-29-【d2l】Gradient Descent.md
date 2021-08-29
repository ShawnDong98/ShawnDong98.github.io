---
layout:     post
title:      "【d2l】Gradient Descent"
subtitle:   ""
date:       2021-08-29
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - d2l
---


在这一节中，我们将介绍梯度下降的基本概念。虽然它很少直接用于深度学习，但理解梯度下降是理解随机梯度下降算法的关键。例如，由于过大的学习率，优化问题可能会发散。这种现象在梯度下降中已经可以看到。同样地，预处理是梯度下降中的一种常见技术，并可用于更高级的算法。

# One-Dimensional Gradient Descent

一维梯度下降就是一个很好的例子来解释为什么梯度下降算法可以降低目标函数的值。考虑一个连续可微的实值函数 $f: \mathbb{R} \rightarrow \mathbb{R}$。 用泰勒展开式得到：

$$
f(x + \epsilon) = f(x) + \epsilon f'(x) + O(\epsilon^2)
$$

也就是说 ，一阶估计 $f(x + \epsilon)$ 由 函数值 $f(x)$ 和 在 $x$ 处的一阶导数 $f'(x)$ 得到。假设小的 $\epsilon$ 向负梯度方向移动将减小 $f$ 并非不合理。为了保持简单， 我们选择固定步长大小 $\eta > 0$ 并且选择 $\epsilon = -\eta f'(x)$。 将它插入泰勒展开，我们得到：

$$
f(x - \eta f'(x)) = f(x) - \eta f'^2(x) + O(\eta^2 f'^2(x))
$$

如果导数 $f'(x) \neq 0$ 不会消失， 因为$\eta f'^2(x) > 0$, 我们将得到进展。此外，我们总可以选择足够小的 $\eta$ 使得高阶项变得无关紧要。因此我们得出：

$$
f(x - \eta f'(x)) \mathop{<}_{\approx} f(x)
$$

这意味着， 如果我们使用 

$$
x \leftarrow x - \eta f'(x)
$$

去迭代 $x$， 函数 $f(x)$ 的值可能下降。因此， 在梯度香江中我们首先选择一个初始值 $x$ 和 一个常数 $\eta > 0$ 并且使用他们连续地迭代 $x$， 直到停止条件达到。

为了简单， 我们选择目标函数 $f(x) = x^2$ 去解释如何实现梯度下降。 尽管我们知道 $x = 0$ 是最小化 $f(x)$ 的解， 我们仍然使用这个简单的函数来观察 $x$ 如何变化。

```python
%matplotlib inline
import numpy as np
import torch
from d2l import torch as d2l


def f(x):  # Objective function
    return x**2

def f_grad(x):  # Gradient (derivative) of the objective function
    return 2 * x
```

接下来， 我们使用 $x = 10$ 作为初始值， 并且假设 $\eta = 0.2$。 使用梯度下降迭代 $x$ 10次， 我们可以看到， 最终 $x$ 接近最优解。

```python
def gd(eta, f_grad):
    x = 10.0
    results = [x]
    for i in range(10):
        x -= eta * f_grad(x)
        results.append(float(x))
    print(f'epoch 10, x: {x:f}')
    return results

results = gd(0.2, f_grad)
```

```
epoch 10, x: 0.060466
```

优化 $x$ 的进展可以绘制如下：

```python
def show_trace(results, f):
    n = max(abs(min(results)), abs(max(results)))
    f_line = torch.arange(-n, n, 0.01)
    d2l.set_figsize()
    d2l.plot([f_line, results],
             [[f(x) for x in f_line], [f(x) for x in results]], 'x', 'f(x)',
             fmts=['-', '-o'])

show_trace(results, f)
```

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1630223985685.png)


## Learning Rate

学习率 $\eta$ 可以由程序设计设设置。 如果学习率太小， 将会导致 $x$ 更新地太慢， 需要更多地迭代次数得到更好的解。 为了展示在这种情况下会发生什么， 将相同优化问题的学习率 $\eta = 0.05$。 正如我们所看到的，即使经过10个步骤，我们仍然离最优解很远。


```python
show_trace(gd(0.05, f_grad), f)
```

```
epoch 10, x: 3.486784
```

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1630224194424.png)

相反， 如果我们使用过大的学习率， $\mid \eta f'(x) \mid$ 可能对于一阶泰勒展开公式过大。 $O(\eta^2) f'^2(x)$ 影响可能会非常大。 在这种情况下 ，我们不能保证 $x$ 的迭代将会使得 $f(x)$ 的值变得更小。 例如， 当我们把学习率设置为 $\eta = 1.1$， $x$ 冲过了最优解 $x = 0$ 并且固件发散。

```
show_trace(gd(1.1, f_grad), f)
```

```
epoch 10, x: 61.917364
```

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1630224400653.png)


## Local Minima

为了解释在非凸函数上会发生什么， 我们假设 $f(x) = x · cos(cx)$,  $c$为常数。 这个函数有无穷多个局部极小值。根据我们对学习率的选择以及问题条件设置的好坏程度，我们最终可能会得到许多解决方案中的一个。下面的例子说明了高学习率如何导致较差的局部最小值。

```python
c = torch.tensor(0.15 * np.pi)

def f(x):  # Objective function
    return x * torch.cos(c * x)

def f_grad(x):  # Gradient of the objective function
    return torch.cos(c * x) - c * x * torch.sin(c * x)

show_trace(gd(2, f_grad), f)
```

```
epoch 10, x: -1.528166
```

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1630224987106.png)

# 多变量梯度下降

现在我们对单变量情况有了更好的直觉，让我们考虑这样的情况，$x = [x_1, x_2, ..., x_d]^T$。也就是说， 目标函数 $f: \mathbb{R}^d \rightarrow  \mathbb{R}$ 将向量映射为标量。因此，它的梯度也是多元的， 它是一个由 $d$ 个偏导数组成的向量。

$$
\nabla f(x) = [\frac{\partial f(x)}{\partial x_1}, \frac{\partial f(x)}{\partial x_2}, ..., \frac{\partial f(x)}{\partial x_d}]^T
$$

梯度中的每个偏导元素 $\partial f(x) / \partial x_i$ 表示 分别对每个输入 $x_i$ $f$ 在 $x$ 处的变化率。 和之前一样，在单变量情况下，我们可以对多元函数使用相应的泰勒近似来得到我们的一些想法。

$$
f(x + \epsilon) = f(x) + \epsilon^T \nabla f(x) + O(\| \epsilon\|^2)
$$

换句话说，在 $\epsilon$ 的二阶项（$O(\|\epsilon\|^2)$）之前，最陡下降的方向是由负梯度 $-\nabla f(x)$ 给出的. 选择合适的学习率 $\eta > 0$ 产生原始的梯度下降算法。

$$
x \leftarrow x - \eta \nabla f(x)
$$

为了了解算法在实践中的表现，让我们构造一个目标函数