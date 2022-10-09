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

所提出的网络通过从网络阶段开始和结束时融合特征图来服从梯度的可变性，在实验中，在ImageNet数据集上以等效甚至更高的精度将计算减少了20%，并在 MS COCO 目标检测数据集的AP50方面明显优于最先进的方法。

# Conclusion