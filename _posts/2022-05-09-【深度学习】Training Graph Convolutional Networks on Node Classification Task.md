---
layout:     post
title:      "【深度学习】Training Graph Convolutional Networks on Node Classification Task"
subtitle:   ""
date:       2022-05-09
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - GNN & GCN
---

本文介绍了使用Spektral API实现图卷积网络(GCN)的过程，[Spektral API](https://graphneural.network/getting-started/) 是一个基于Tensorflow 2的图深度学习Python库。我们将使用 CORA 数据集进行半监督节点分类，类似于Thomas Kipf和Max Welling(2017)在原始GCN论文中提出的工作。

# Dataset Overview

CORA citation network 数据集由2708个节点组成，每个节点代表一篇文献或一篇技术论文。节点特征是bag-of-words 表示，表示文档中存在一个词。因此，vocabulary 和节点特征包含1433个单词。

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1652082019232.png)

我们将数据集视为无向图，其中边表示一个文档是否引用另一个文档，反之亦然。此数据集中没有边特征。该任务的目的是将节点(或文档)划分为7个不同的类，与论文的研究领域相对应。这是一个具有 Single Mode 数据表示设置的 single-label multi-class 分类问题。

这个实现也是  Transductive Learning 的一个例子，其中神经网络在训练期间看到所有数据，包括测试数据集。这与 Inductive Learning 形成对比，Inductive Learning 是一种典型的监督学习，在训练过程中测试数据是分开的。

# Text Classification Problem

既然我们要根据文本特征对文档进行分类，那么机器学习处理这个问题的常见方法是将其视为监督文本分类问题。使用这种方法，机器学习模型将只根据文档自身的特征来学习每个文档的隐藏表示。

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1652082309214.png)
如果每个类都有足够的标记示例，这种方法可能会很好地工作。不幸的是，在现实世界的情况下，标记数据可能是昂贵的。

**那么是否存在解决这个问题的另一种方法？**

技术论文除了自身的文本内容外，通常还会引用其他相关论文。从直观上看，被引用的论文很可能属于类似的研究领域。

在这个  citation network 数据集中，除了它自己的文本内容， 我们希望利用每篇论文的引文信息。因此，数据集现在已经变成了一个 paper 的 network。

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1652082581617.png)

使用这种配置，我们可以利用图神经网络，如图卷积网络(GCNs)，来建立一个模型，学习文档之间的互联以及它们自己的文本特征。GCN模型不仅会根据自己的特征，还会根据邻近节点的特征来学习节点(或文档)的隐藏表示。因此，我们可以减少标记样本的数量，并利用 `邻接矩阵(A)` 或图中的节点连通性实现半监督学习。

> 图神经网络可能有用的另一种情况是，每个样本本身没有不同的特征，但样本之间的关系可以丰富特征表示。

# Implementation of Graph Convolutional Networks

## Loading and Parsing the Dataset

在这个实验中，我们将使用构建在Tensorflow 2上的Spektral API来构建和训练一个GCN模型。尽管Spektral 提供内置函数来加载和预处理CORA数据集，但在本文中，我们将从这里下载原始数据集，以便更深入地理解数据预处理和配置。




# Reference
1. [Training Graph Convolutional Networks on Node Classification Task](https://medium.com/towards-data-science/graph-convolutional-networks-on-node-classification-2b6bbec1d042)