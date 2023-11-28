---
layout:     post
title:      "【深度学习】Quadformer：Vision Transformers with Mixed-Resolution Tokenization"
subtitle:   ""
date:      2023-11-28 
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - CVPRW 2023
---

# Abstract 

视觉 Transforemr 模型通过将输入图像分割成一个空间规则的等大小补丁网格来处理图像。

相反， Transformer 最初是为自然语言序列引入的，在那里每个标记代表一个子词——一个任意大小的原始数据块。

在这项工作中，我们将这种方法应用到视觉 Transformer 中，通过引入一种新的图像 Tokenizer 方案，用混合分辨率的 token 序列替换标准统一网格，其中每个 token 代表一个任意大小的图像块。

使用四叉树算法和一个新的显著性评分器，我们构建了一个图片块马赛克，在这个马赛克中，图像中的低显著性区域以低分辨率处理，将模型更多的容量路由到重要的图像区域。

使用与普通 ViTs 相同的架构，我们的 Quadformer 模型在控制计算预算的情况下，在图像分类上实现了显著的准确性提升。