---
layout:     post
title:      "【深度学习】EfficientDet: Scalable and Efficient Object Detection"
subtitle:   ""
date:       2022-09-18
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - Detection
    - CVPR 2020
---

# Abstract
模型效率在计算机视觉中变得越来越重要。

这篇文章系统地研究了用于目标检测的中性网络架构设计选择，并提出了几个提高效率的关键优化方法。

首先，作者提出了一种加权双向特征金字塔网络（BiFPN），它允许轻松快速地进行多尺度特征融合。

其次，作者提出了一种复合缩放方法，该方法可以同时统一缩放所有主干、特征网络和 box/class 预测网络的分辨率、深度和宽度。

基于这些优化和更好的主干，作者开发了一个新的目标检测器系列，称为EfficientDet，在广泛的资源限制下，它始终比现有技术效率高。

特别是，通过单模型和单尺度，EfficientDet-D7 在 COCO test-dev 上实现了最先进的55.1 AP，具有 77M parameters和 410B FLOPs，比以前的检测器小4倍-9倍，使用比以前的检测器少13倍至42倍的FLOPs。


# BiFPN

在本节中，作者首先提出了多尺度特征融合问题，然后介绍了作者提出的 BiFPN 的主要思想：高效的双向跨尺度连接和加权特征融合。

## Problem Formulation

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1663507411895.png)

# Conclusion

这篇文章中，作者系统地研究了网络架构设计选择，以实现高效的目标检测，并提出了加权双向特征网络和定制化复合缩放方法，以提高准确率和效率。

基于这些优化，作者开发了一个新的检测器系列，名为EfficientDet，在广泛的资源限制中，它始终比现有技术实现更高的准确性和效率。

特别是，缩放的EfficientDet以比之前的目标检测和语义分割模型少得多的参数和 FLOPs 实现了最先进的准确性。
