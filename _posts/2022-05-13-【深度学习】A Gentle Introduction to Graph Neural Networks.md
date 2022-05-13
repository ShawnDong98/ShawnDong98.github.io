---
layout:     post
title:      "【深度学习】A Gentle Introduction to Graph Neural Networks"
subtitle:   ""
date:       2022-05-13
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - GNN & GCN
---
神经网络已被用于利用图的结构和性质。我们探索了构建图神经网络所需的组件，并 motivate 了它们背后的设计选择。


![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1652404436505.png)

本文是两篇关于图神经网络的 Distill 出版物之一。请参 [https://distill.pub/2021/understanding-gnns/](https://distill.pub/2021/understanding-gnns/) ，以理解图像上的卷积如何自然地归纳为图上的卷积。

图无处不在; 现实世界中的对象通常是根据它们与其他事物的 connections 来定义的。一组对象以及它们之间的 connections 自然地表示为图。十多年来，研究人员已经开发出了操作图数据的神经网络(称为图神经网络，或GNNs)。最近的发展提高了他们的能力和表达能力。我们开始看到 antibacterial discovery、physics simulations 、fake news detection、traffic prediction 和 recommendation systems 等领域的实际应用。

本文探索和解释现代图神经网络。我们把这项工作分成四部分。首先，我们看看什么样的数据最自然地表达为图，以及一些常见的例子。其次，我们探讨了图与其他类型数据的不同之处，以及在使用图时我们必须做出的一些特殊选择。第三，我们构建一个现代GNN，通过模型的每个部分，从该领域的 historic 建模创新开始。我们逐渐从一个基本的实现过渡到最先进的GNN模型。第四，也是最后，我们提供了一个GNN PlayGround，您可以在其中使用真实的任务和数据集，以建立一个更强的直觉，了解 GNN 模型的每个组件如何对其做出的预测作出贡献。

首先，让我们确定什么是图。图表示实体集合(节点)之间的关系(边)。

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1652404864431.png)
为了进一步描述每个节点、边或整个图，我们可以在图的每个部分中存储信息。

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1652404924398.png)
我们还可以通过将方向性与边(有向的、无向的)联系起来来 specialize 图。

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1652404964562.png)
图是非常灵活的数据结构，如果现在看起来很抽象，我们将在下一节通过示例使其具体化。


# Graphs and where to find them
您可能已经熟悉了某些类型的图数据，例如社交网络。然而，图是数据的一种非常强大和通用的表示，我们将展示两种您可能认为不能被建模为图的数据: 图像和文本。尽管有违直觉，但我们可以通过将图像和文本视为图来了解它们的对称性和结构，并建立一种直觉，这将有助于理解其他不太像网格的图数据，我们将在后面讨论。


## Images as graphs

我们通常认为 图像 是带有通道的矩形网格，将它们表示为数组(例如 244x244x3 浮点数)。另一种理解图像的方法是将 图像 看作具有规则结构的图形，其中每个像素代表一个节点，并通过 边 与 相邻像素 连接。每个非边界像素正好有 8 个邻居，存储在每个节点上的信息是一个表示像素的 RGB 值的三维向量。

将图的连通性可视化的一种方法是通过它的邻接矩阵。我们对节点进行排序，在本例中，每个 smiley face 的 5x5 图像中 25 个像素， 用 $n_{nodes} \times n_{nodes}$ 的矩阵填充， 如果两个节点之间共享一条边。 请注意，下面的三种表示形式都是同一数据块的不同视图。

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1652405442690.png)

## Text as graphs

我们可以将文本数字化，方法是将索引与每个字符、单词或标记联系起来，并将文本表示为这些索引的序列。这创建了一个简单的有向图，其中每个字符或索引都是一个节点，并通过边连接到它后面的节点。

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1652405845729.png)

当然，在实践中，这通常不是文本和图像的编码方式:这些 图表示 是冗余的，因为所有的图像和文本都有非常规则的结构。例如，图像在其邻接矩阵中有一个 banded 结构，因为所有节点(像素)都连接在一个网格中。文本的邻接矩阵只是一条对角线，因为每个单词只与前一个单词和下一个单词连接。

## Graph-valued data in the wild

图 是描述您可能已经熟悉的数据的有用工具。让我们转向结构更加异构的数据。在这些示例中，每个节点的邻居数量是可变的(与图像和文本的固定邻居大小相反)。除了图之外，这些数据很难用其他方式表达。

**Molecules as graphs**： 分子是物质的基本组成部分，由三维空间中的原子和电子构成。所有粒子都相互作用， 但是当一对原子彼此保持稳定的距离时，我们就说它们有共价键。不同的原子对和键有不同的距离(如单键、双键)。将3D对象描述为 图 是一种非常方便和常见的抽象，其中节点是原子，边是共价键。这是两个常见的分子，以及它们的相关图。

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1652406246345.png)
![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1652406269582.png)



**社交网络作为图**。社交网络是研究人们、机构和组织的集体行为模式的工具。我们可以通过将个体建模为节点，将他们的关系建模为边，来构建一个代表一组人的图。

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1652406335270.png)

与图像和文本数据不同，社交网络没有相同的邻接矩阵。

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1652406370379.png)

**Citation networks as graphs.**  科学家在发表论文时经常引用其他科学家的研究成果。我们可以将这些引文网络可视化为一个图，其中每篇论文是一个节点，每个有向边是一篇论文与另一篇论文之间的引文。此外，我们还可以在每个节点中添加关于每篇论文的信息，比如在摘要的词嵌入。

**Other examples.** 在计算机视觉中，我们有时想在视觉场景中标记对象。然后，我们可以通过将这些对象视为节点，将它们的关系视为边来构建图。机器学习模型、编程代码和数学方程也可以用图来表达，其中变量是节点，边是将这些变量作为输入和输出的操作。您可能会在这些上下文中看到 “dataflow graph” 项。

现实世界的图的结构可能在不同类型的数据之间有很大的差异，有些图有很多节点，但它们之间的连接很少，反之亦然。在节点、边的数量和节点的连通性方面，图数据集可以有很大的差异(在给定数据集内和数据集之间)。

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1652406540027.png)

# What types of problems have graph structured data?

我们已经描述了一些实际的图例子，但是我们想对这些数据执行什么任务呢?图上有三种一般类型的预测任务: 图级、节点级和边级。

在图级任务中，我们预测整个图的单个属性。对于节点级任务，我们预测图中每个节点的某些属性。对于边级任务，我们想要预测图中边的属性或存在。

对于上面描述的三个级别的预测问题(图级、节点级和边级)，我们将展示以下所有问题都可以用一个 GNN 解决。但首先，让我们更详细地浏览一下这三类图预测问题，并提供每个问题的具体例子。

## Graph-level task

在图级任务中，我们的目标是预测整个图的属性。例如，对于一个用图表示的分子，我们可能想要预测这个分子闻起来像什么，或者它是否会与与疾病有关的受体结合。

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1652408208762.png)

这类似于 MNIST 和 CIFAR 的图像分类问题，我们希望将一个标签与整个图像相关联。对于文本，一个类似的问题是情感分析，我们想要立即识别整个句子的情绪或情感。

## Node-level task

节点级任务与预测图中每个节点的身份或角色有关。

节点级预测问题的典型例子是 Zach’s karate club 。这个数据集是一个单一的社交网络图，由两支空手道俱乐部中的一支在政治分歧后宣誓效忠的个人组成。随着故事的发展，Mr. Hi (Instructor) 和 John H(Administrator)之间的不和造成了空手道俱乐部的分裂。节点代表每个空手道练习者，边代表空手道之外的这些成员之间的互动。预测问题是区分一个给定的成员在不和之后是忠于 Hi 先生还是忠于John H先生。在本例中，节点到 Instructor 或 Administrator 的距离与这个标签高度相关。

# Reference

1. [https://distill.pub/2021/gnn-intro/](https://distill.pub/2021/gnn-intro/)