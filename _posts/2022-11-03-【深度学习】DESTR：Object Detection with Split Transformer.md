---
layout:     post
title:      "【深度学习】DESTR: Object Detection with Split Transformer"
subtitle:   ""
date:       2022-11-03
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - Detection
    - CVPR2022
---

# Abstract

Transformer 中的自注意力和交叉注意力提供了高模型能力，使其成为目标检测的可行模型。

然而，Transformer 的表现仍然落后于基于CNN的检测器。

这主要是因为：

a) 交叉注意力用于分类和边界框回归任务；

b) Transformer 的解码器初始化 content query 的能力很差；

c) 自注意力不能很好地解释某些有助于提升归纳偏置的先验知识；

这些限制通过相应的三项贡献得到解决。

首先，作者提出了一个新的 Detection Split Transformer （DESTR），将交叉注意力的估计分为两个独立的分支——一个是为分类定制的，另一个是为边界框回归定制的。

其次，作者使用迷你检测器中各个头的分类和回归嵌入初始化解码器中的 content queries。

最后，作者在解码器中增强了自注意力，以进一步考虑成对相邻目标查询。

在MS-COCO数据集上的实验表明，DESTR的表现优于DETR及其后续。

# Conclusion

作者提出了DESTR，其扩展了最近基于 Transformer 的目标检测器家族，有三个贡献：

1） 交叉注意力分为独立的分类和回归分支，因此注意力可以选择将注意力集中在各自任务的相关视觉线索上；

2） 迷你探测器用于学习和初始化解码器的内容和位置嵌入，并启用自适应推断数目标查询的数量；

3） 自注意力是通过对相邻的目标查询来估计的，因此每个查询的注意力可以通过对另一个查询的直接空间上下文来增强。

与C-DETR的强基线相比，这篇文章报告的一项消融研究显示了这些贡献及其组合的收益。

实验表明，在 COCO-val 和COCO test-dev数据集的标准评估设置下，DESTR 的表现优于SOTA Transformer 检测器，具有相似模型复杂度的情况下，其使用单尺度的特征在AP和AR上都有更好的表现。

对于局限性， 迷你检测器打破了DETR建立的良好流程。

然而，迷你检测器仅用于初始化内容查询，DESTR的最终检测不受迷你检测器预测的限制。

与任何目标检测系统一样，该系统可能会被滥用于恶意人类监控和侵犯隐私。