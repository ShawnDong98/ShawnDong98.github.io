---
layout:     post
title:      "【d2l】Automatic Parallelism"
subtitle:   ""
date:       2021-09-14
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - d2l
    - 深度学习
---

深度学习框架(如MXNet和PyTorch)在后端自动构建计算图。通过使用计算图，系统知道所有的依赖关系，并可以有选择地并行执行多个不依赖的任务，以提高速度。例如，第12.2节中的图12.2.2分别初始化了两个变量。因此，系统可以选择并行执行它们。



通常，单个操作符将使用所有cpu或单个GPU上的所有计算资源。例如，点积操作符将使用所有CPU上的所有内核(和线程)。这同样适用于单个GPU。因此，并行化对于单设备计算机不是很有用。在多设备中，它更重要。虽然并行化通常与多个GPU相关，但加上本地CPU将略微提高性能。例如，参见[Hadjis et al.， 2016]，专注于结合GPU和CPU训练计算机视觉模型。有了自动并行化框架的便利，我们只需几行Python代码就可以实现同样的目标。更广泛地说，我们对自动并行计算的讨论主要集中在使用CPU和GPU的并行计算，以及计算和通信的并行化。



注意，我们至少需要两个GPU来运行本节中的实验。



#  Parallel Computation on GPUs

让我们从定义要测试的参考工作负载开始:下面的run函数使用分配给两个变量 $x_{gpu1}$ 和 $x_{gpu2}$ 的数据，在我们选择的设备上执行10次矩阵-矩阵乘法。

```python
devices = d2l.try_all_gpus()

def run(x):
    return [x.mm(x) for _ in range(50)]

x_gpu1 = torch.rand(size=(4000, 4000), device=devices[0])
x_gpu2 = torch.rand(size=(4000, 4000), device=devices[1])
```


现在我们将函数应用于数据。`torch.cuda.synchronize()` 等待CUDA设备上所有流中的所有内核完成。 它接受一个 `device` 参数， 它是我们要同步的设备。	如果参数为 None 的话， 它使用 `current_device()` 返回的设备。


```python
run(x_gpu1)
run(x_gpu2)  # Warm-up all devices
torch.cuda.synchronize(devices[0])
torch.cuda.synchronize(devices[1])

with d2l.Benchmark('GPU1 time'):
    run(x_gpu1)
    torch.cuda.synchronize(devices[0])

with d2l.Benchmark('GPU2 time'):
    run(x_gpu2)
    torch.cuda.synchronize(devices[1])
```