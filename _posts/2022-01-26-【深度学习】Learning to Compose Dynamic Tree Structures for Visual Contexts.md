---
layout:     post
title:      "【深度学习】Learning to Compose Dynamic Tree Structures for Visual Contexts"
subtitle:   ""
date:       2022-01-26
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - Scene Graph
---

# Abstract

这篇文章提出组合动态树结构， 其将图像中的目标置于视觉上下文中， 帮助如场景图生成和VQA等视觉推理任务。

VCTree 比现有的包括链式和全连接图的结构化目标表征有两个关键优势：1) 二叉树编码了在目标之间的并行和层次化的关系。 2) 动态结构不同于图像到图像或任务到任务， 其使得在目标之间更多地 content/task-specific message passing。

为了构造一个 VCTree， 设计了一个 score 函数， 其在每个目标对之间计算 task-dependent  validity， 这个树是从 score matrix 中得到的 maximum spanning tree 的二叉树版本。

视觉上下文通过双向 TreeLSTM 编码， 并且根据 task-specific 模型解码。

提出一种将端任务监督学习与树结构强化学习结构起来的学习方法， 其中前者的评价结果作为后者的 self-critic。

# Conclusion
