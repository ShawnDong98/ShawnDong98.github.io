---
layout:     post
title:      "【d2l】Attention Pooling: Nadaraya-Watson Kernel Regression"
subtitle:   ""
date:       2021-04-17
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - d2l
---


# Attention Pooling: Nadaraya-Watson Kernel Regression

现在你知道了图10.1.3框架下注意力机制的主要组成部分。 概括地说，queries(volitional cues)和keys(nonvolitional cues)之间的相互作用实现attention pooling。注意力池化选择性地聚集 values (sensory inputs)来产生输出。在本节中，我们将更详细地描述注意力池化，让你从高层次上了解注意力机制在实践中是如何工作的。具体来说，1964年提出的Nadaraya-Watson核回归模型是一个简单而完整的例子，展示了机器学习的注意力机制。

```python
import torch
from torch import nn
from d2l import torch as d2l
```


## Generating the Dataset

为了简单起见，让我们考虑下面的回归问题:给定一个输入输出对的数据集 $\{(x_1, y_1), ..., (x_n, y_n)\}$, 如何学习 $f$ 对 任意的新输入 $x$, 去预测输出 $\hat y = f(x)$?

这里我们根据以下带有噪声项 $\epsilon$ 的非线性函数生成一个人工数据集：

$$y_i = 2\sin(x_i) + x_i^{0.8} + \epsilon \tag{10.2.1}$$

其中 $\epsilon$ 服从正态分布，均值为0，标准差为0.5。同时生成50个训练样本和50个测试样本。 为了以后更好地可视化注意力模式，训练输入被排序。


```python
n_train = 50  # No. of training examples
x_train, _ = torch.sort(torch.rand(n_train) * 5)  # Training inputs

def f(x):
    return 2 * torch.sin(x) + x**0.8

y_train = f(x_train) + torch.normal(0.0, 0.5, (n_train,))  # Training outputs
x_test = torch.arange(0, 5, 0.1)  # Testing examples
y_truth = f(x_test)  # Ground-truth outputs for the testing examples
n_test = len(x_test)  # No. of testing examples
n_test
```

输出:

```
50
```


下面的函数绘制了所有训练样本(用圆表示)、生成函数 $f$ 生成的 不含噪声项的ground-truth数据(用Truth标记)和学习到的预测函数(用Pred标记)。

