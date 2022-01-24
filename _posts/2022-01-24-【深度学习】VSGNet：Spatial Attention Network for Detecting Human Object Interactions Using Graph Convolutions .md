---
layout:     post
title:      "【深度学习】VSGNet: Spatial Attention Network for Detecting Human Object Interactions Using Graph Convolutions "
subtitle:   ""
date:       2022-01-24
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - 
---

# Abstract
全面的视觉理解需要检测框架， 其可以有效地学习和利用目标交互， 同时单独分析目标。

这是 **人-目标交互(Human-Object Interaction, HOI)检测任务** 的主要目标。

目标之间的 **相对空间推理** 和 **结构连接** 对于 **分析交互** 是必要的线索， 因此提出 VSGNet 架构来解决这个问题。

VSGNet 从 human-object 对中提取视觉特征， 根据 human-object 的空间位置对特征进行 refine， 并通过图卷积利用 human-object 对之间的结构连接。


# Discussions

## Differences with similar works 
将 VSGNet 与 使用空间关系、注意力机制 和 图卷积的方法进行了比较。

之前也有使用空间关系的方法。 这些方法要么直接使用空间关系映射进行分类， 要么将空间关系特征与其视觉特征拼接起来。直接使用空间关系特征分类忽略了视觉特征， 这会导致只学习交互标签和空间位置之间的关系。由于空间位置特征和视觉特征是两种完全不同的特征， 直接拼接并不像注意力机制一样更好地利用空间位置。这篇文章使用空间位置提取注意力权重以改变视觉特征， 可以更好地建模视觉特征和空间位置之间的关系。

注意力机制也被用于HOI任务。 iCAN 使用整个输入场景作为建模人或目标区域的注意力。这种方法没有考虑 pairs 之间的关系， 他们最后只考虑了空间关系。
## Summary



