---
layout:     post
title:      "【深度学习】Spektral Data modes"
subtitle:   ""
date:       2022-05-16
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - GNN & GCN
---

# Data modes

当样本具有不同形状时，创建 mini-batches 可能很棘手。

在传统的神经网络中，我们习惯于拉伸、裁剪或填充数据，以便所有输入到模型的数据都是标准化的。例如，可以修改不同大小的图像，使其适合于形状 `[batch，width，height，channel]` 张量。序列可以填充，以便他们有形状 `[batch，time，channels]`。等等...

对于图，情况就有点不同了。

例如，定义 “cropping” 或 “stretching” 图的含义并不容易，因为这些都是假设像素的 “spatial closeness” 的 transformations (通常我们对图没有这种假设)。

此外，我们的数据集中并不总是有很多图。有时候，我们只是对一个大图的节点分类感兴趣。有时，我们可能有一个大的图，但它的节点特征有许多实例(图像的分类就是这样的一种情况:一个网格，多个像素值的实例)。

为了使 Spektral 在所有这些情况下都能工作，并考虑到处理不同大小的图的困难，我们引入了 `data modes` 的概念。


在 Spektral 中， 有四种 `data modes`:

- `single mode`: 我们只有一个图。节点分类任务通常采用该模式。
- `disjoint mode`: 我们表示了一批具有不相交并集的图。这给了我们一个大图，类似于 `single mode`，尽管有一些不同(见下文)。
- `batch mode`: 我们对图进行零填充，这样我们就可以将它们放入形状 `[batch，nodes，…]` 的密集张量中。这可能会更昂贵，但可以更容易地与传统 NNs 进行交互。
- `mixed mode`: 我们有一个邻接矩阵被许多图共享。我们将邻接矩阵保持在 `single mode` (为了性能，不需要为每个图重复它)，节点属性保持在 `batch mode`。

在所有数据模式中，我们的目标是通过将各自的 `x`、`a` 和 `e` 矩阵分组为单个张量 `x` 、`a` 和`e` 来表示一个或多个图。不同数据模式下这些张量的形状总结在下表中。


![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1652703689087.png)

在上表中，`batch` 是批大小，`nodes` 是节点的数量，`edges` 是边的数量，`n_feat` 和 `e_feat` 分别是节点和边特征的数量。

请务必阅读入门教程，以理解这些矩阵代表的一般图。


在下面的部分中，我们将更详细地描述这四种模式。特别地，我们讨论在每种情况下使用哪个 data `Loader`。

## Single mode

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1652703815748.png)

在 `single mode` 下，我们只有一个图:

- `A` 是形状为 `[nodes, nodes]` 的矩阵
- `X` 是形状为 `[nodes, n_feat]` 的矩阵
- `E` 是形状为 `[edges, e_feat]` ,  `A` 的每个非零条目对应一行，按行为主排序


一个非常常见的 single mode 数据集是Cora引文网络。

```python
>>> from spektral.datasets import Cora
>>> dataset = Cora()
>>> dataset
Cora(n_graphs=1)
```

正如所料，我们只有一个图

```python
>>> dataset[0]
Graph(n_nodes=2708, n_node_features=1433, n_edge_features=None, n_labels=7)

>>> dataset[0].a.shape
(2708, 2708)

>>> dataset[0].x.shape
(2708, 1433)
```