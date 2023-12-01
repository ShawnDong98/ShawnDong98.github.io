---
layout:     post
title:      "【ICCV 2023】SPIN：Lightweight Image Super-Resolution with Superpixel Token Interaction"
subtitle:   ""
date:       2023-12-01
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - ICCV 2023
    - 深度学习
---

# Abstract 

基于 Transformer 的方法在单图像超分辨率(SISR)任务上展示了令人印象深刻的结果。

然而，当应用于整个图像时，自注意力机制在计算上是十分昂贵的。

因此，现有的方法将低分辨率输入图像划分为小块，这些小块被单独处理然后融合以生成高分辨率图像。

尽管如此，这种传统的规则块划分过于粗糙且缺乏可解释性，导致在注意力操作过程中出现伪影和非相似结构干扰。

为了解决这些挑战，我们提出了一种新的 super token interaction network (SPIN)（SPIN）。我们的方法采用超像素对局部相似像素进行聚类，形成可解释的局部区域，并利用超像素内部注意力实现局部信息交互。它是可解释的，因为只有相似的区域相辅相成，不同的区域被排除在外。此外，我们设计了一种超像素交叉注意力模块，通过超像素的代理来促进信息传播。广泛的实验表明，所提出的SPIN模型在准确性和轻量级方面与最先进的超分辨率方法相比表现出色。