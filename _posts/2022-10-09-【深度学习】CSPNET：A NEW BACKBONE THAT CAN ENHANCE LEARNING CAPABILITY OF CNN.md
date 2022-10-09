---
layout:     post
title:      "【深度学习】CSPNET：A NEW BACKBONE THAT CAN ENHANCE LEARNING CAPABILITY OF CNN"
subtitle:   ""
date:       2022-10-09
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - Backbone
    - CVPR 2020
---

# Abstract

神经网络使最先进的方法能够在物体检测等计算机视觉任务上取得惊人的结果。

然而，这种成功在很大程度上依赖于昂贵的计算资源，这阻碍了没有设备的人使用最先进的技术。

这篇文章提出了Cross Stage Partial Network（CSPNet），以缓解以前的工作需要从网络架构角度进行大量推理计算的问题。

作者将问题归因于网络优化中的重复梯度信息。

所提出的网络通过从网络阶段开始和结束时融合特征图来服从梯度的多样性，在实验中，在ImageNet数据集上以等效甚至更高的精度将计算减少了20%，并在 MS COCO 目标检测数据集的AP50方面明显优于最先进的方法。

# Conclusion

这篇文章提出了CSPNet，使ResNet、ResNeXt和DenseNet等最先进的方法轻量化， 能够在移动GPU或CPU上运行。

主要贡献之一是，作者认识到冗余梯度信息问题，该问题导致优化效率低下，推理计算成本高昂。

作者提出利用 cross-stage 特征融合策略和截断梯度流来增强不同层内学习特征的多样性。

此外，作者提出了包含 Maxout 操作的 EFM，以压缩特征金字塔生成的特征映射，这在很大程度上减少了所需的内存带宽，因此推断的效率足以与边缘计算设备兼容。

实验表明，所提出的带有EFM的 CSPNet 在实时目标检测任务的移动GPU和CPU的准确性和推理率方面明显优于竞争对手。