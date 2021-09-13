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