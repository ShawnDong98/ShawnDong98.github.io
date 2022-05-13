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

![](https://markdown.xiaoshujiang.com/img/spinner.gif "[[[1652404864432]]]" )
# Reference

1. [https://distill.pub/2021/gnn-intro/](https://distill.pub/2021/gnn-intro/)