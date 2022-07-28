---
layout:     post
title:      "【深度学习】MPRNet：Multi-Stage Progressive Image Restoration"
subtitle:   ""
date:       2022-07-28
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - CVPR 2021
---

# Abstract

图像恢复任务要求在恢复图像时在空间细节和 high-level 的 contextualized 信息之间取得复杂的平衡。

这篇文章提出了一种新的 synergistic 设计，可以最优地平衡这些竞争目标。

这篇文章主要提议是一个多阶段的架构，逐步学习退化输入的恢复函数，从而将整个恢复过程分解为更易于管理的步骤。

具体地说，模型首先学习使用编码器-解码器架构的 contextualized 特征，然后将它们与保留局部信息的高分辨率分支结合起来。

在每个阶段，引入一种新的逐像素自适应设计，利用 in-situ supervised attention 来重新加权局部特征。

在这种多阶段架构中，一个关键组件是不同阶段之间的信息交换。

为此，这篇文章提出了一种 two-faceted 的方法，即信息不仅从早期到后期依次交换，而且特征处理块之间也存在横向连接，以避免信息的丢失。

由此产生的紧密相连的多阶段架构，被称为MPRNet，在包括图像解算、去模糊和去噪在内的一系列任务的10个数据集上提供了强大的性能提升。



#  Multi-Stage Progressive Restoration

图2所示的图像恢复框架包含三个逐步恢复图像的阶段。前两个阶段是基于编码器-解码器子网络学习广泛的上下文信息，由于大的感受野。由于图像恢复是位置敏感的任务(需要从输入到输出的像素到像素的对应)，因此最后阶段采用一个子网络来操作原始输入图像分辨率(不需要任何降采样操作)，从而在最终输出图像中保留所需的精细纹理。

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1659016762304.png)
# Conclusion

在这项工作中提出了一种多阶段的图像恢复架构，通过在每个阶段注入监督，逐步改善退化的输入。

作者设计制定了指导原则，要求在多个阶段进行互补的特征处理，并在它们之间进行灵活的信息交换。

为此，作者提出了 contextually-enriched 和 spatially accurate 阶段，以统一编码不同的特征集。

为了确保交互阶段之间的协同作用，作者提出了跨阶段的特征融合和注意力引导的早期到后期输出交换。

模型在众多基准数据集上获得了显著的性能提升。

此外，模型在模型大小方面是轻量级的，在运行时方面是高效的，这对于资源有限的设备来说非常有用。
