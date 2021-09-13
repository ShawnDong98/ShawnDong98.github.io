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

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1631497963583.png)



# Barriers and Blockers

有许多操作将迫使Python等待完成

- 很显然 `npx.waitall()` 等待直到所有计算完成，而不管计算指令是何时发出的。在实践中，除非绝对必要，否则使用这个操作符是一个坏主意，因为它会导致性能差。
- 如果我们只是想等待，直到一个特定的变量可用，我们可以调用 `z.wait_to_read()`。 在本例中，MXNet阻塞到计算完变量z, 才返回到Python。其他计算可以在以后继续进行。


让我们看看这在实践中是如何工作的。

```python
with d2l.Benchmark('waitall'):
    b = np.dot(a, a)
    npx.waitall()

with d2l.Benchmark('wait_to_read'):
    b = np.dot(a, a)
    b.wait_to_read()
```

```python
waitall: 0.0138 sec
wait_to_read: 0.0045 sec
```

这两种操作大约需要相同的时间来完成。除了明显的阻塞操作，我们建议您了解隐式阻塞器。打印变量显然需要变量是可用的，因此会导致阻塞。最后，通过 `z.asnumpy()` 和通过 `z.item()` 转换到NumPy标量都是阻塞的，因为NumPy没有异步的概念。它需要访问这些值，就像print函数一样。

频繁地将少量数据从MXNet的作用域复制到NumPy或复制回NumPy会破坏代码的性能，因为每个这样的操作都需要计算图来评估所有中间结果，然后才能进行其他操作。

```python
with d2l.Benchmark('numpy conversion'):
    b = np.dot(a, a)
    b.asnumpy()

with d2l.Benchmark('scalar conversion'):
    b = np.dot(a, a)
    b.sum().item()
```

```
numpy conversion: 0.0117 sec
scalar conversion: 0.0212 sec
```


# Improving Computation


在多线程系统上(即使是普通的笔记本电脑也有4个或更多线程，而在多套接字服务器上这个数字可能超过256)，调度操作的开销可能会非常大。这就是为什么计算和调度以异步和并行方式发生是非常可取的。为了说明这样做的好处，让我们看看如果将一个变量按顺序或异步方式加1多次会发生什么。我们通过在每次加法之间插入一个 ` wait_to_read` 的等待来模拟同步执行。

```python
with d2l.Benchmark('synchronous'):
    for _ in range(10000):
        y = x + 1
        y.wait_to_read()

with d2l.Benchmark('asynchronous'):
    for _ in range(10000):
        y = x + 1
    npx.waitall()
```

```
synchronous: 1.0607 sec
asynchronous: 0.8800 sec
```

Python前端线程和c++后端线程之间的一个稍微简化的交互可以总结如下: 前端命令后端将计算任务y = x + 1插入队列； 然后后端从队列接收计算任务并执行实际的计算；然后后端从队列接收计算任务并执行实际的计算。假设这三个阶段的持续时间分别为 $t_1$， $t_2$ 和 $t_3$。 如果我们不使用异步编程，执行10000个计算所花费的总时间大约是 $10000(t_1 + t_2 + t_3)$。 如果使用异步编程，执行10000次计算所花费的总时间可以减少到 $t_1 + 10000t_2 + t_3$（假设 $10000 t_2 > 9999 t_1$）， 因为前端不需要等待后端返回每个循环的计算结果。