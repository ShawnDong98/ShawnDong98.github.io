---
layout:     post
title:      "【深度学习】Swin Transformer： Hierarchical Vision Transformer using Shifted Windows "
subtitle:   ""
date:       2021-11-10
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - 
---


# Abstract

将transformer从语言迁移到视觉， 存在一些差异， 比如视觉上尺度与像素的高分辨率。 我们提出一种层级Transformer通过滑动窗口计算表征。 滑动窗口方法在允许跨窗口连接的情况下， 通过限制self-attention对非重叠局部窗口的计算提高了效率。 层级结构使得模型在不同尺度上有灵活性， 并且随着图像尺寸大小增大线性增加计算复杂度。


# Introduction

将语言域的高表现迁移到视觉域上的挑战可以解释为两种模态间的差异。一个差异是尺度。另外一个差异是图像有相比于文本多得多的像素。

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1636967260352.png)

如上图所示， 通过先从小的patch开始， 在深层的Transformer逐渐融合周围的patch构造层级的表征。线性计算复杂度通过在非重叠的窗口间计算Self-Attention实现。

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1637039706126.png)

Swin Transformer的一个关键设计是在连续的 self-attention 层之间窗口滑动。这种策略使得一个窗口中的所有 query patches 共享相同的 key set，在硬件上加速了内存的读取。


# Method

## Overall Architecture

Swin Transformer 的结构如下图所示。它首先通过 patch split 模块将 RGB 图像拆分为非重叠的 patches， 像ViT一样。每个 patch 被看做一个 "token"， 并且它的特征被设为原始RGB像素值的拼接。这里使用 patch 大小为 $4 \times 4$， 因此每个 patch 的特征维度为 $4 \times 4 \times 3 = 48$。

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1637040108750.png)

# Conclusion

这篇文章提出一种叫做 Swin Transformer的新的 Vision Transformer 的结构， 它会产生层级的特征表示， 并且对于输入图像的尺寸具有线性增长的计算复杂度。

Swin Transformer 的一个关键设计， 基于 shifted window 的 self-attention 在视觉人物上表现出有效性。


