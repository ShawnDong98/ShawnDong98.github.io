---
layout:     post
title:      "【深度学习】VisualGPT: Data-efficient Adaptation of Pretrained Language Models for Image Captioning "
subtitle:   ""
date:       2021-08-23
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - MMML
---

# Abstract

这篇提出了一种利用预训练语言模型先验语言知识的image caption模型，叫做VisualGPT。

提出了SRAUs模块 平衡使用图片中的视觉信息和来自预训练语言模型的先验语言信息。

# Introduction

半监督的方法收集image-caption对可能产生不正确的训练数据； 从互联网上爬取的数据不能覆盖特定领域的数据， 比如X光图像。

预训练语言模型通过自监督学习可以获得丰富的语言和语义知识。

比较了MSCOCO 和 WikiText-2 的词性分布。 发现， MSCOCO有75%的名词，但是只有14%的动词。在image caption中有效地使用预训练语言模型， 需要小心的平衡从预训练获得的语言知识和视觉输入信息。

主要有以下两点贡献：

- 提出的结构将文本模态的权重快速应用到跨模态任务中。
- SRAUs 不仅可以平衡学习视觉和文本模态的特征， 还不容易落入零梯度的区域


# Related Work

早期的方法集中在将提取的目标、属性和关系填入模板。

使用目标区域编码图像被证明有效(Bottom-up feature)。

强化学习使得可以使用不可微的评价指标优化模型。

Feng 等人提出不使用配对的image-caption 监督 来进行 无监督captioning。

Kim 等人通过从辅助的不配对的 image-caption 数据中学习提高数据效率。

# Background on Transformer 

传统的transformers， encoder只有最后一层的输出会被使用。 Meshed-Memory transformers 中 encoder 的所有层都会通过相同的 编码器解码器 注意力。

AoA 模块可以用来在cross-attention后融合视觉和语言信息。

# VisualGPT

假设 "人"、“卡车”、“狗”等视觉词模型需要依赖于视觉信息。而限定词或者连接词仅需要依赖于语言知识。

