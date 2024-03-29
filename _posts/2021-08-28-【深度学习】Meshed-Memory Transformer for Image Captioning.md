---
layout:     post
title:      "【深度学习】Meshed-Memory Transformer for Image Captioning"
subtitle:   ""
date:       2021-08-28
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - MMML
---


# Abstract

它在图像区域之间学习一个多级的关系表征， 在解码阶段使用一个网状的连接提取低级和高级特征。


# Introduction

相比于之前的image caption 算法有两个创新点：

- 图像区域和它们的关系以多级的形式编码， 低级关系和高级观测都被考虑在内。当建模这些关系时， 我们的模型通过保留一个 memory 向量学习和编码先验知识。
- 句子的生成也使用多层结构， 挖掘低级和高级视觉关系， 而不是仅从视觉模态获取单个输入。这通过一个可学习的门机制， 它在每个阶段对多层的贡献加权。

主要贡献如下：
- 提出一种全注意力的image captioning算法。 模型包括一个用于图像区域的多层编码器和一个用于生成句子的多层解码器。为了挖掘低级和高级的特征， 编码和解码都用 mesh-like 的结构连接， 并使用一个可学习的门控机制加权。
- 视觉编码器中， 图像区域之间的关系以多层的形式被编码， 它被建模为一个可学习的 memory 向量， 挖掘学习到的先验知识。
- $M^2$ Transformer 超过了所有之前提出的 image caption 模型， 在 COCO evaluation server 上取得了新SOTA。
- 与不同的在image captioning 上的全注意力结构进行了比较， 并且在npcaps数据集上验证了模型的表现。


# Related work

早期的方法基于简单模板的生成， 由目标检测的输出或者属性预测的输出填入。

随着深度学习的发展， 大部分的计数使用RNN作为语言模型， 使用一个或多个卷积网络的输出作为语言生成的条件。

在训练时， 开始阶段的方法是基于时间步的交叉熵训练， 强化学习的引入带来了极大的进步， 它使得使用不可微的评价指标来优化目标。

在图像编码时， 将单层注意力机制应用于空间知识上， 起初使用卷积特征， 后来使用目标检测提取的图像区域。

为了提高目标和它们之间关系的编码， Yao等人提出在图像编码阶段使用图卷积神经网络在目标间融合语义和空间关系。

与此同时， Yang等人使用多模态图卷积神经网络将场景图加入视觉表征。

Herdade等人对image captioning使用Transformer结构并且将检测的输入目标之间的几何关系融入进去。

Li等人通过一个额外的 tagger 使用 Transformer 模型发觉视觉信息和额外的语义知识。

Huang等人年引入一种注意力操作的拓展， 通过由上下文门控对最后参与的信息加权。


# Meshed-Memory Transformer 

见论文

