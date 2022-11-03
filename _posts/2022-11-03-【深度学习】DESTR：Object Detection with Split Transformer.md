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

