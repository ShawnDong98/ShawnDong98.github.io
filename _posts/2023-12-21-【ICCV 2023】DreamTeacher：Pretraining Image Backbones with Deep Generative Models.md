---
layout:     post
title:      "【ICCV 2023】DreamTeacher：Pretraining Image Backbones with Deep Generative Models"
subtitle:   ""
date:       2023-12-21
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - ICCV 2023
    - Backbone
---
# Abstract

在这项工作中，我们介绍了一种自监督特征表示学习框架DreamTeacher，该框架利用生成网络对下游图像主干进行预训练。

我们提出从训练有素的生成模型中提取知识，转移到为特定感知任务精心设计的标准图像主干。

我们研究了两种类型的知识蒸馏：

1) 将学习到的生成特征蒸馏到目标图像主干上，作为在大型标记数据集（如ImageNet）上对这些主干进行预训练的替代方案；
2) 将带有任务头的生成网络获得的标签蒸馏到目标主干的 logits 上。

我们对多个生成模型、密集预测基准和几种预训练机制进行了广泛的分析。

我们实证发现，我们的DreamTeacher在整个领域中显著优于现有的自监督表示学习方法。

使用DreamTeacher进行无监督的ImageNet预训练，相比于ImageNet分类预训练，在下游数据集上取得了显著改进，展示了生成模型，尤其是扩散生成模型，作为在大型、多样化数据集上进行表示学习的一种有前景的方法，而无需手动标注。