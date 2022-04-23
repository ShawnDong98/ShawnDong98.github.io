---
layout:     post
title:      "【深度学习】Training larger-than-memory PyTorch models using gradient checkpointing"
subtitle:   ""
date:       2022-04-23
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - 
---

在深度学习模型尺寸不断增长的时代，使用尖端技术的主要困难之一是将其加载到GPU上，毕竟，我们不能训练一个不能安装到你的设备上的模型。有各种各样的技术可以改善这个问题; 例如，分布式训练和混合精度训练。

在这篇文章中，我们将介绍另一种技术:  **gradient checkpointing**。简而言之，gradient checkpointing 的工作原理是在反向传播的时间重新计算深度神经网络的中间值(通常在正向传播时间存储)。这权衡了两次为内存重新计算这些值的时间成本和提前存储这些值的带宽成本。

在本文的最后，我们将看到一个示例基准，展示 gradient checkpointing 如何将模型的内存成本降低60%(以增加25%的训练时间为代价)。


# 神经网路是怎样使用显存的？

为了理解 gradient checkpointing 的作用，我们首先需要了解模型内存分配是如何工作的。

一个神经网络所使用的总内存基本上是两个组成部分的总和。

第一部分是模型使用的静态内存。虽然PyTorch模型中内置了一些固定消耗，但成本几乎完全由模型权重决定。目前生产中使用的现代深度学习模型总参数在100万到10亿之间。作为参考，1-1.5亿个参数是带有16gb GPU内存的NVIDIA T4的实际限制。


第二部分是模型的计算图所占用的动态内存。每次以训练模式通过神经网络，计算网络中每个神经元的激活; 然后，这个值存储在计算图中。必须为一批数据中的每个训练样本存储一个值，因此增加的非常迅速。总成本由模型大小和批量大小决定，并设置将适合GPU内存的最大批量大小的限制。

# gradient checkpointing 如何帮助？

大型模型在静态和动态方面都很昂贵。它们一开始很难适应GPU，一旦你把它们放到设备上，就很难训练，因为它们因为批量大小太小而无法收敛。

存在各种技术来改善其中一个或两个问题。 gradient checkpointing 就是这样一种技术。 

**Gradient checkpointing** 通过从计算图中省略一些激活值来工作。这减少了计算图所使用的内存，总体上降低了内存压力(并允许进程中使用更大的批处理大小)。

然而，存储激活的原因是在反向传播期间计算梯度时需要它们。在计算图中忽略它们会迫使PyTorch在它们出现的地方重新计算这些值，从而整体降低计算速度。

因此， gradient checkpointing  是计算机科学中存在于内存和计算之间的权衡的一个经典例子。

`torch.utils.checkpoint.checkpoint` 和 `torch.utils.checkpoint.checkpoint_sequential` 提供 gradient checkpointing，它实现了如下特性(根据文档中的注释)。在前向传播期间，PyTorch将输入元组保存给模型中的每个函数。在反向传播过程中，以即时的方式为每个函数重新计算输入元组和函数的组合，将其插入到需要它的每个函数的梯度公式中，然后丢弃。其净计算成本大致相当于每个样本在模型中向前传播两次的计算成本。

Gradient checkpointing 首次发表于2016年的论文 "Training Deep Nets With Sublinear Memory Cost"。 这篇文章声称 gradient checkpointing 算法将模型的动态内存开销 从O(n)(其中n是模型中的层数 )降低到O(sqrt(n))，并通过将一个 ImageNet 变体从 48GB 显存压缩到 7GB 的显存实验证明了这一点。


# Testing out the API
在 PyTorch API 中有两个不同 gradient checkpointing 方法，都在 `torch.utils.checkpoint` 命名空间中。两个中比较简单的一个，`checkpoint sequential`，被限制在 sequential 模型中(例如使用 `torch.nn.Sequential` wrapper 的模型); `checkpoint`，是它更灵活的等价物，可以用于任何模块。

下面是一个完整的代码示例(取自一个旧教程)，展示了 `checkpoint_sequential`：

```python
import torch
import torch.nn as nn

from torch.utils.checkpoint import checkpoint_sequential

# a trivial model
model = nn.Sequential(
    nn.Linear(100, 50),
    nn.ReLU(),
    nn.Linear(50, 20),
    nn.ReLU(),
    nn.Linear(20, 5),
    nn.ReLU()
)

# model input
input_var = torch.randn(1, 100, requires_grad=True)

# the number of segments to divide the model into
segments = 2

# finally, apply checkpointing to the model
# note the code that this replaces:
# out = model(input_var)
out = checkpoint_sequential(modules, segments, input_var)

# backpropagate
out.sum().backwards()
```

如您所见，`checkpoint_sequential` 是模块对象上的 `forward` 或 `__call__` 方法的替代品。`out` 和我们用 `model(input_var)` 得到的张量差不多; 关键的区别在于，它缺少累积值，并附加了一些额外的元数据，指示PyTorch在 `out.backward()` 期间重新计算这些值。

值得注意的是，`checkpoint sequential` 以一个段的整数值作为输入。 `checkpoint_sequential` 的工作原理是将模型分成 n 个纵向段，并对除最后一个段外的每个段应用 checkpointing。

这很简单，也很容易使用，但是有一些限制。你无法控制段的边界在哪里，也没有办法 checkpoint 整个模块。

另一种选择是使用更灵活的 checkpoint API。为了进行演示，考虑以下简单的卷积模型：


```python
class CIFAR10Model(nn.Module):
    def __init__(self):
        super().__init__()
        self.cnn_block_1 = nn.Sequential(*[
            nn.Conv2d(3, 32, 3, padding=1),
            nn.ReLU(),
            nn.Conv2d(32, 64, 3, padding=1),
            nn.ReLU(),
            nn.MaxPool2d(kernel_size=2)
        ])
        self.dropout_1 = nn.Dropout(0.25)
        self.cnn_block_2 = nn.Sequential(*[
            nn.Conv2d(64, 64, 3, padding=1),
            nn.ReLU(),
            nn.Conv2d(64, 64, 3, padding=1),
            nn.ReLU(),
            nn.MaxPool2d(kernel_size=2)
        ])
        self.dropout_2 = nn.Dropout(0.25)
        self.flatten = lambda inp: torch.flatten(inp, 1)
        self.linearize = nn.Sequential(*[
            nn.Linear(64 * 8 * 8, 512),
            nn.ReLU()
        ])
        self.dropout_3 = nn.Dropout(0.5)
        self.out = nn.Linear(512, 10)
		
	def forward(self, X):
        X = self.cnn_block_1(X)
        X = self.dropout_1(X)
        X = torch.utils.checkpoint.checkpoint(self.cnn_block_2, X)
        X = self.dropout_2(X)
        X = self.flatten(X)
        X = self.linearize(X)
        X = self.dropout_3(X)
        X = self.out(X)
        return X
```


这个模型有两个卷积块，一些 dropout 和一个 linear head(10个输出对应于CIFAR10中的10个类)。

这是使用 gradient checkpointing 的这个模型的更新版本：


```python
class CIFAR10Model(nn.Module):
    def __init__(self):
        super().__init__()
        self.cnn_block_1 = nn.Sequential(*[
            nn.Conv2d(3, 32, 3, padding=1),
            nn.ReLU(),
            nn.Conv2d(32, 64, 3, padding=1),
            nn.ReLU(),
            nn.MaxPool2d(kernel_size=2)
        ])
        self.dropout_1 = nn.Dropout(0.25)
        self.cnn_block_2 = nn.Sequential(*[
            nn.Conv2d(64, 64, 3, padding=1),
            nn.ReLU(),
            nn.Conv2d(64, 64, 3, padding=1),
            nn.ReLU(),
            nn.MaxPool2d(kernel_size=2)
        ])
        self.dropout_2 = nn.Dropout(0.25)
        self.flatten = lambda inp: torch.flatten(inp, 1)
        self.linearize = nn.Sequential(*[
            nn.Linear(64 * 8 * 8, 512),
            nn.ReLU()
        ])
        self.dropout_3 = nn.Dropout(0.5)
        self.out = nn.Linear(512, 10)
	def forward(self, X):
        X = self.cnn_block_1(X)
        X = self.dropout_1(X)
        X = checkpoint(self.cnn_block_2, X)
        X = self.dropout_2(X)
        X = self.flatten(X)
        X = self.linearize(X)
        X = self.dropout_3(X)
        X = self.out(X)
        return X
```

`checkpoint` (出现在 forward ) 接受一个模块 (或任何可调用对象，如函数) 及其参数作为输入。参数将在前向时被记住，然后在反向时用于重新计算其输出值。

为了使其工作，我们必须对模型定义进行一些额外的更改。

首先，你会注意到我们移除了卷积块的 `nn.Dropout` 层;这是因为 checkpointing 与 dropout 不兼容(回想一下，在模型中运行两次样本，dropout 将在每次传递中随机地丢弃不同的值，产生不同的输出)。基本上，任何在重新运行时表现出不等行为的层都不应该被 checkpointing (`nn.BatchNorm` 是另一个例子)。解决方案是重构模块，这样问题层就不会被排除在 checkpoint 段之外，这正是我们在这里所做的。

其次，您会注意到我们在模型中的第二个卷积块上使用了 checkpoint，而没有在第一个中使用。这是因为 checkpoint 通过检查输入张量的 `no_grad` 行为，天真地确定其输入函数是否需要梯度下降(例如，是否处于 `no_grad=True` 或 `no_grad=False` 模式)。模型的输入张量几乎总是在无grad=False模式，因为我们几乎总是对计算相对于网络权值的梯度感兴趣，而不是输入样本本身的值。因此，对模型w中的第一个子模块进行检查点