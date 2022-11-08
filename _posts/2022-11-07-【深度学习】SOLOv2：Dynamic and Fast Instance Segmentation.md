---
layout:     post
title:      "【深度学习】SOLOv2: Dynamic and Fast Instance Segmentation"
subtitle:   ""
date:       2022-11-07
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - Detection
    - NIPS 2022
---

# Abstract

在这项工作中，作者设计了一个简单、直接和快速用于实例分割的具有强大性能的框架。

为此，作者按照SOLO方法的原则，提出了一种新颖有效的方法，称为SOLOv2。

首先，作者的新框架由高效和整体的实例 mask 表征方法赋能，该方案动态分割图像中的每个实例，而无需边界框检测。

具体而言，目标 mask 生成被解耦为 mask kernel 预测和 mask 特征学习，它们分别负责生成卷积核和要生成的特征图。

其次，SOLOv2 使用新的 matrix non-maximum suppression（NMS）技术显著减少了推断开销。

matrix NMS一次性执行具有并行矩阵操作的NMS，并产生更好的结果。

作者的 SOLOv2 在速度和准确性方面都优于大多数最先进的实例分割方法。


# Conclusion

在这项工作中，作者从三个方面引入了具有强大性能的动态快速实例分割解决方案。

- 作者提出学习自适应的动态卷积核，用于基于位置的 mask 预测，从而实现更紧凑但更强大的头部设计，并实现更好的结果。
- 作者以简单统一的方式重新设计了目标 mask 生成，从而预测了更准确的边界。
- 此外，与目标检测中的边界框 NMS 不同，对于直接实例分割，推理效率的瓶颈是 mask  的NMS。作者设计了一种简单且更快的NMS策略，称为Matrix NMS，用于 mask 的 NMS 处理，同时不牺牲 mask AP。

作者对MS COCO 和 LVIS 数据集的实验表明，在所提出的SOLOv2的准确性和速度方面都具有卓越的性能。作为实例级识别任务的多，作者表明，无需对框架进行任何修改，SOLOv2在全景分割方面具有竞争力。