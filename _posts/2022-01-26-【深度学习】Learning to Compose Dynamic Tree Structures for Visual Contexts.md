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
这篇文章提出一种叫做 VCTree 的动态树结构捕获 task-specific 的视觉上下文， 将其编码可用于高级视觉任务， 如SGG和VQA。

相比于不带视觉上下文的模型， VCTree 在 VG 数据集的 SGG 上 和 VQA 在 VQA2.0 数据集上带来持续的收益。

为了验证VCTree 能够学习到 non-trivial 的上下文, 分别在 SGG 中进行了 category bias 实验 在 VQA 上进行了 question-answer 实验。

在未来，我们打算研究在上下文结构下的动态森林。