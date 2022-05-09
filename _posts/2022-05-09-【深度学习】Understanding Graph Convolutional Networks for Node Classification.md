---
layout:     post
title:      "【深度学习】Understanding Graph Convolutional Networks for Node Classification"
subtitle:   ""
date:       2022-05-09
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - 
---

神经网络在过去的十年里取得了巨大的成功。然而，早期的神经网络只能使用 regular 数据或欧几里得数据来实现，而现实世界中的很多数据都是非欧几里得 的 图结构。数据结构的 non-regularity 导致了图神经网络的最新进展。在过去的几年里，各种各样的图神经网络被开发出来，图卷积网络(GCN)就是其中之一。GCNs也被认为是一种基本的图神经网络变体。

在本文中，我们将深入研究由 Thomas Kipf 和 Max Welling 开发的图卷积网络。我也将给出一些非常基本的例子，关于使用NetworkX构建我们的第一个图。在本文的最后，我希望我们能对图卷积网络的机制有更深入的了解。

# Convolution in Graph Neural Networks
如果你熟悉卷积神经网络中的卷积层，那么GCNs中的卷积基本上是相同的操作。它指的是将输入神经元与一组通常称为 `filter` 或 `kernel` 的权值相乘。 filters 在整张图像上作为一个滑动窗口使得 CNN 从邻近单元学习特征。在同一层中，整个图像将使用相同的 filter，这被称为权重共享。例如，使用CNN对 猫 和 非猫 的图像进行分类，将在同一层中使用相同的 filter 来检测猫的鼻子和耳朵。

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1652062947000.png)

GCN 执行相似的操作， 模型通过 inpect 邻近的节点学习特征。 CNN 和 GNN 的主要区别在于，CNN 是专门针对 regular (Euclidean) 结构化数据构建的，而 GNNs 是 CNNs 的广义版本，节点连接的数量是不同的，节点是无序的((irregular on non-Euclidean structured data))。

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1652063112754.png)

GCNs本身可以分为两种主要算法，**Spatial Graph Convolutional Networks ** 和 **Spectral Graph Convolutional Networks**。

# Fast Approximate Spectral Graph Convolutional Networks

原始的 Spectral GCN 背后的 idea 受到 signal/wave 传播的启发。我们可以把 Spectral GCNs 中的信息传播看作是信号沿节点的传播。Spectral GCNs利用  graph Laplacian matrix 的特征分解实现了这种信息传播方法。简单地说，特征分解帮助我们理解图的结构，从而对图的节点进行分类。这有点类似于主成分分析(PCA)和线性判别分析(LDA)的基本概念，我们使用特征分解来降低维数并执行聚类。

在这种方法中，除了考虑节点特征(或所谓的输入特征)外，我们还将考虑前向传播方程中的 `Adjacency Matrix(A)`。`A` 是一个矩阵，表示前向传播方程中节点之间的边或连接。在前向传播方程中插入 `A`，使模型能够学习基于节点连通性的特征表示。为了简单起见，忽略偏置 `b`。得到的GCN可以看作是一个 message passing 网络形式的 Spectral Graph Convolution 的一阶近似，其中信息沿着图内的相邻节点传播。通过添加邻接矩阵作为一个额外的元素，前向传播方程将是：

$$H^{[i + 1]} = \sigma(W^{[i]}H^{[i]}A^*)$$

`A*` 是 `A` 的 normalized 版本。为了更好地理解为什么我们需要 normalize `A`，以及在 GCN 的前向传播过程中会发生什么，让我们做一个实验。

