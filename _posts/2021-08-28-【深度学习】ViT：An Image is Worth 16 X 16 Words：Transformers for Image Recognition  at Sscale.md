---
layout:     post
title:      "【深度学习】ViT：An Image is Worth 16 X 16 Words: Transformers for Image Recognition  at Sscale"
subtitle:   ""
date:       2021-08-28
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - ICLR 2020
---

# Abstract

在视觉中，注意力通常和卷积神经网络组合起来或者替换掉特定的卷及网络以保持它们的整体结构。我们证明对CNNs的依赖不是必须的， 直接对图像patch序列使用transformer也可以在图像分类任务上表现地很好。


# Introduction 

当不适用强正则化在中等大小数据集上(比如ImageNet)训练， 模型产生的结果比同样大小的ResNet低几个百分点。

# RELATED WORK 

通常图像的自注意力需要计算每个像素值对其它像素值的权重。


# Method

## VISION TRANSFORMER (VIT)

为了处理 2D 图像， 将图像 $x \in \mathbb{R}^{H \times W \times C}$ reshape 成一个拉平的 2D patch 的序列 $x_p \in \mathbb{R}^{N \times (P^2 · C)}$。

因为Transformer的所有层输入都是一个大小为 D 的隐向量， 将patch拉平 并且通过一个可学习的线性投影 映射到 D 维。

分类头 在预训练时由一个带一个隐藏层的多层感知机实现， 在微调时是一个单线性层。

位置编码用来保存位置信息， 因为并没观察到使用 2D 的位置编码比 1D 的位置编码有更高的性能表现， 因此使用 1D 的位置编码。

多层感知机包含两个 GELU 非线性激活。

**归纳偏置**：在机器学习中，很多学习算法经常会对学习的问题做一些假设，这些假设就称为归纳偏置(Inductive Bias)。ViT中， MLP层是局部的并且具有平移不变性， 自注意力层是全局的。分辨率的调整和patch的提取是ViT中人为加入的唯一的归纳偏置的点。

**Hybrid Architecture**：在 hybrid 模型中，将卷积特征进行patch embedding。 patch的尺寸可以是1x1， 这意味着输入序列来自于仅仅将特征图的空间维度映射投影Transformer的维度。

## FINE-TUNING AND HIGHER RESOLUTION 

在微调时，将分类头换为一个零初始化的 $D \times K$ 的线性层， K表示类别数。

高分辨率在微调阶段比在预训练阶段有更高的收益。

patch大小不变， 图像分辨率变大， 预训练的位置编码会失去意义， 因此根据它们在原始图像中的位置， 对预训练的位置编码二维插值。

![](https://markdown.xiaoshujiang.com/img/spinner.gif "[[[1630116559889]]]" )