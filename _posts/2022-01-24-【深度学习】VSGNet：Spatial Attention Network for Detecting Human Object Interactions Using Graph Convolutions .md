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

