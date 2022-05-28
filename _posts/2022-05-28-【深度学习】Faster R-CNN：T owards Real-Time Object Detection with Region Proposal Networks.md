---
layout:     post
title:      "【深度学习】Faster R-CNN: T owards Real-Time Object Detection with Region Proposal Networks"
subtitle:   ""
date:       2022-05-28
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - 目标检测
---


# Abstract
最先进的物体检测网络依赖于区域提议算法来假设物体的位置。

SPPnet[1]和Fast R-CNN[2]等技术的进步减少了这些检测网络的运行时间，暴露出区域提议的计算成为瓶颈。

在这项工作中，引入了一个区域提议网络(RPN)，它与检测网络共享全图像卷积特征，从而实现了几乎 cost-free 的区域提议。

RPN是一个全卷积的网络，它可以同时预测每个位置的目标边界和 objectness scores。

对RPN进行端到端训练，生成高质量的区域提议，用于Fast R-CNN进行检测。

进一步将 RPN 和 Fast R-CNN 合并成一个网络，通过共享它们的卷积特征，使用最近流行的带有注意力机制的神经网络术语，RPN组件告诉统一的网络往哪里看。

对于非常深的VGG-16模型[3]，检测系统在GPU上的帧率为5帧/秒(包括所有步骤)，同时在PASCAL VOC 2007、2012和MS COCO数据集上实现了最先进的目标检测精度，每个图像只有300个提议。

在ILSVRC和COCO 2015年的比赛中，Faster R-CNN 和 RPN 是获得多个赛道第一名的参赛作品的基础。

# Conclusion

这篇文章提出了RPN，以高效和准确地生成区域提议。

通过和下游目标检测网路共享卷积特征， 区域提议的步骤几乎是 cost-free 的。

该方法能够使一个统一的、基于深度学习的目标检测系统以接近实时的帧率运行。

学习后的RPN也提高了区域提议的质量，从而提高了整体目标检测的准确性。