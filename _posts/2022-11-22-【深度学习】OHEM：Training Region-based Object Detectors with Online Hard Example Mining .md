---
layout:     post
title:      "【深度学习】OHEM：Training Region-based Object Detectors with Online Hard Example Mining
"
subtitle:   ""
date:       2022-11-22
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - Detection
    - CVPR 2016
---

# Abstract
在卷积网络的浪潮上， 目标检测领域取得了显著的提高，但是他们的训练过程包含很多难以调整的启发式设计和超参数。

这篇文章提出了一种简单但出人意料地有效的在线困难样本挖掘（OHEM）算法，用于训练基于区域的卷积检测器。

作者的动机一如既往——检测数据集包含大量简单的样本和少量困难样本。

自动选择这些困难示例可以使训练更有效、更高效。

OHEM是一种简单直观的算法，消除了常用的几种启发式和超参数等。

但更重要的是，它在PASCAL VOC 2007和2012等基准上的检测性能得到了一致和显著的提高。

正如MS COCO数据集的结果所表明的那样，随着数据集的扩大和困难，其有效性会提高。

# Method
# Conclusion

作者提出了一种在线困难样本挖掘（OHEM）算法，这是一种训练基于区域的卷积检测器的简单有效的方法。

OHEM通过自动选择困难样本，消除了常用的几个启发式设计和超参数，从而简化了训练。

作者进行了广泛的实验分析，以证明该算法的有效性，这导致了更好的训练收敛性和标准基准检测精度的一致提高。

当将OHEM与其他正交方法一起使用时，作者还报告了PASCAL VOC 2007和2012的最新结果。

虽然作者在整个论文中使用了 Fast R-CNN，但 OHEM 可用于训练任何基于区域的卷积网络检测器。


