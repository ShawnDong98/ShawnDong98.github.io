---
layout:     post
title:      "【深度学习】SEMI-SUPERVISED CLASSIFICATION WITH GRAPH CONVOLUTIONAL NETWORKS "
subtitle:   ""
date:       2022-05-09
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - GNN & GCN
---

# Abstract

这篇文章提出了一种 scalable 的方法，用于在图结构数据上进行半监督学习，该方法基于一种直接作用于图的卷积神经网络的有效变体。

通过 Spectral 图卷积的局部一阶近似来激发卷积结构的选择。

模型在图边 的 数量上线性缩放，并学习对局部图结构和节点特征进行编码的隐层表示。

在 citation network 和 knowledge graph 数据集上的大量实验中，证明了该方法在很大程度上优于相关方法。
# Conclusion

这篇文章提出了一种新的图结构数据半监督分类方法。

该GCN模型使用了一种 layer-wise 的传播规则，该规则基于图上的 spectral convlutions 的一阶近似。

在大量网络数据集上的实验表明，提出的GCN模型能够以一种对半监督分类有用的方式对图结构和节点特征进行编码。

在这种情况下，模型在计算效率很高的同时，其性能明显优于最近提出的几个方法。