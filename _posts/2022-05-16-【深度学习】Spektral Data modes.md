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

