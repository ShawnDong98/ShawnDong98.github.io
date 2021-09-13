---
layout:     post
title:      "【d2l】Asynchronous Computation"
subtitle:   ""
date:       2021-09-13
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - d2l
    - 深度学习
---


今天的计算机是高度并行的系统，由多个CPU核(通常每个核有多个线程)、每个GPU有多个处理单元、每个设备通常有多个GPU组成。简而言之，我们可以同时处理许多不同的事情，通常是在不同的设备上。不幸的是，Python不是编写并行和异步代码的好方法，至少没有一些额外的帮助是不行的。毕竟，Python是单线程的，这在未来不太可能改变。MXNet和TensorFlow等深度学习框架采用异步编程模型来提高性能，而PyTorch使用Python自己的调度器，导致了不同的性能权衡。对于PyTorch，默认情况下，GPU操作是异步的。当你调用一个使用GPU的函数时，这些操作会排队到特定的设备上，但不一定会在之后执行。


因此，了解异步编程如何工作有助于我们开发更高效的程序， 异步编程主动减小计算需求和相互依赖。这允许我们减少内存开销并增加处理器利用率。


```python
import os
import subprocess
import numpy
import torch
from torch import nn
from d2l import torch as d2l
```


# Asynchrony via Backend


作为一个热身，考虑下面的简单问题:我们想生成一个随机矩阵并将其相乘。让我们在NumPy和PyTorch张量中都做一下，看看区别。注意 Pytorch 的张量定义在 GPU 上。

```python
# Warmup for GPU computation
device = d2l.try_gpu()
a = torch.randn(size=(1000, 1000), device=device)
b = torch.mm(a, a)

with d2l.Benchmark('numpy'):
    for _ in range(10):
        a = numpy.random.normal(size=(1000, 1000))
        b = numpy.dot(a, a)

with d2l.Benchmark('torch'):
    for _ in range(10):
        a = torch.randn(size=(1000, 1000), device=device)
        b = torch.mm(a, a)
```

```
numpy: 1.0163 sec
torch: 0.0011 sec
```

通过PyTorch的基准输出要快几个数量级。NumPy点乘是在CPU上执行的，而PyTorch矩阵乘法是在GPU上执行的，因此后者的速度预计会快得多。但巨大的时差表明一定还有其他原因。默认情况下，PyTorch中的GPU操作是异步的。强制PyTorch在返回完成所有计算之前发生的事情： 计算被后端执行，而前端将控制权返回给Python。

```python
with d2l.Benchmark():
    for _ in range(10):
        a = torch.randn(size=(1000, 1000), device=device)
        b = torch.mm(a, a)
    torch.cuda.synchronize(device)
```

```
Done: 0.0023 sec
```

一般来说，PyTorch有一个直接与用户交互的前端，例如通过Python，以及一个系统用来执行计算的后端。如图 12.2.1 所示， 用户可以用Python、c++等多种前端语言编写PyTorch程序。不管使用什么前端编程语言，PyTorch程序的执行主要发生在c++实现的后端。前端语言发出的操作被传递到后端执行。后端管理自己的线程，这些线程不断地收集和执行排队的任务。请注意，要实现此功能，后端必须能够跟踪计算图中各个步骤之间的依赖关系。否则，不可能并行化相互依赖的操作。

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1631497584373.png)

让我们看另一个简单的例子，以便更好地理解依赖关系图。


```python
x = np.ones((1, 2))
y = np.ones((1, 2))
z = x * y + 2
z
```

```
array([[3., 3.]])
```

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1631497621748.png)

当Python前端线程执行前三条语句中的一条时，它会简单地将任务返回到后端队列。当需要打印最后一条语句的结果时，Python前端线程将等待c++后端线程完成变量 z 的计算。这种设计的一个好处是，Python前端线程不需要执行实际的计算。因此，无论Python的性能如何，对程序的总体性能的影响都很小。图 12.2.3  说明前端和后端如何交互。