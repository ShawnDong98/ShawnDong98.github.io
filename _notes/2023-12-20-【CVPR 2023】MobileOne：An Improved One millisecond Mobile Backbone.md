---
layout:     post
title:      "【CVPR 2023】MobileOne: An Improved One millisecond Mobile Backbone"
subtitle:   ""
date:       2023-12-20
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - CVPR 2023
    - 深度学习 
    - Backbone
---

# Abstract

面向移动设备的高效神经网络主干通常针对诸如FLOPs或参数数量等指标进行优化。

然而，这些指标可能与移动设备部署时网络的延迟关联不大。

因此，我们通过在移动设备上部署若干适合移动设备的网络，对不同指标进行了广泛分析。

我们识别并分析了近期高效神经网络中的架构和优化瓶颈，并提供了缓解这些瓶颈的方法。

为此，我们设计了一种高效的主干网络MobileOne，其变体在iPhone12上的推理时间低于1毫秒，同时在ImageNet上达到了75.9%的顶级准确率。

我们展示了MobileOne在高效架构中实现了业界领先性能，同时在移动设备上的速度比其他架构快许多倍。我们的最佳模型在ImageNet上的表现与MobileFormer相似，但速度快38倍。

我们的模型在ImageNet上比EfficientNet获得了相似的延迟下2.3%更高的顶级准确率。

此外，我们展示了我们的模型在多个任务上的泛化能力——图像分类、目标检测和语义分割，与现有高效架构相比，在移动设备上部署时在延迟和准确性上都有显著提升。
