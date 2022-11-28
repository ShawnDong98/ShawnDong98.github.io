---
layout:     post
title:      "【深度学习】FCOS: Fully Convolutional One-Stage Object Detection"
subtitle:   ""
date:       2022-11-02
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - Detection
    - ICCV 2019
---

# Abstract

我们提出了一种全卷积的单阶段目标检测器（FCOS），以逐像素预测方式解决目标检测问题，类似于语义分割。

几乎所有最先进的目标检测器，如RetinaNet、SSD、YOLOv3 和 Faster R-CNN，都依赖于预定义的先验框。

相比之下，作者提出的检测器 FCOS 是无先验框的，也是无提议区域的。

通过消除预先定义的先验框，FCOS完全避免了与先验框相关的复杂计算，例如在训练期间计算重叠。

更重要的是，我们还避免了与先验框相关的所有超参数，先验框通常对最终检测表现非常敏感。

凭借唯一的后处理非极大值抑制（NMS），使用 ResNeXt-64x4d-101 的FCOS在单模型和单尺度测试中实现了44.7%的AP，超过了之前的单阶段探测器，其优点是简单得多。

作者首次演示了一个更简单、更灵活的检测框架，提高了检测精度。

作者希望提出的 FCOS 框架可以作为许多其他实例级任务的简单而强大的替代品。



# Approach

在这篇文章中，作者首先以每像素预测的方式重新制定目标检测。接下来，作者展示了如何利用多级预测来改进召回并解决重叠边界框导致的模糊。最后，作者提出了 “centerness” 分支，它有助于抑制低质量检测到的边界框，并大大提高整体性能。

## Fully Convolutional One-Stage Object Detector

令 $F_i \in \mathbb{R}^{H \times W \times C}$ 表示一个主干 CNN 第 $i$ 层的特征图。


# Conclusion

作者提出了一种无先验框和无提议的单阶段检测器FCOS。

如实验所示，与流行的基于先验框的单阶段检测器（包括 RetinaNet、YOLO和SSD）相比，FCOS表现良好，但设计复杂性要小得多。

FCOS完全避免了与先验框框相关的所有计算和超参数，并以逐像素的预测方式解决目标检测，类似于语义分割等其他密集预测任务。

FCOS还在单阶段检测器中实现了最先进的性能。

作者还表明，FCOS可以在两阶段检测器 Faster R-CNN 中用作RPN，，并表现大幅优于其RPN。

鉴于其有效性和效率，作者希望 FCOS 可以成为基于先验框的主流检测器的强大而简单的替代品。

