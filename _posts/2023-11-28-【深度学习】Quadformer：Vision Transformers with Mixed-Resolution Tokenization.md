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

#  Background and related work

**Existing methods for image tokenization.** 一些方法使用CNN主干从输入图像创建表示，使用 activation volumes 作为 token[10,42]。另一类专为图像生成设计的视觉 Transformers 使用矢量量化网络来学习离散 token 的码本，也使用统一的二维网格[7，24]。一些极少的有方法完全放弃空间 tokenization，并使用一种称为 token learning 的技术，其中每个 token 都会汇总整个图像中的信息[29]。


# Method

## Saliency-based Quadtrees

**Quadtrees for RGB images.** Quadtrees 是递归地将二维空间分割成象限树的数据结构，其中每个内部节点正好有四个子节点。树中的每个节点代表由轴对齐的矩形或正方形定义的特定空间区域。在表示RGB图像的四叉树中，每个叶子都包含图像块的压缩表示，通常是该图像块的副本，下采样到一些预定的大小。

通常，RGB图像的二叉树是由自上而下的算法（算法1）构建的，该算法迭代选择按评分函数排名的“最重要”图像块，并将其拆分为4个图像块，有效地使用4倍的像素来表示选定的图像区域。我们称这个评分功能为“图像块打分器”。

我们使用 Quadtree 算法作为 tokenizer，将图像拆分成混合分辨率的图像块马赛克，然后将其输入标准 Transformer 模型。我们试验了几个图像块评分器（图3）：通常用于 Quadtree 图像压缩的 pixel-blur scorer ，一种使用神经表示估计显著性的新 feature-based scorer，以及一个 Grad-CAM oracle scorer ，它利用标签感知的显著性方法，并为我们希望实现的评分质量提供了一个松散的上限。


![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1701141018907.png)

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1701144093376.png)