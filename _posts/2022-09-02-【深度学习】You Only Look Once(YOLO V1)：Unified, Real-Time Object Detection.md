---
layout:     post
title:      "【深度学习】You Only Look Once(YOLO V1): Unified, Real-Time Object Detection"
subtitle:   ""
date:       2022-09-02
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - CVPR 2016
    - Detection
---

# Abstract

作者提出了一种新的目标检测方法YOLO。先前的目标检测工作将分类器重用于检测。这篇文章将目标检测定义为空间分离的bbox和相关的类概率的回归问题。在一次评估中，单个神经网络直接从完整图像预测 bbox 和类概率。由于整个检测 pipeline 是一个单一的网络，因此可以在检测性能上直接进行端到端优化。

base YOLO模型以每秒45帧的速度实时处理图像。网络的一个小版本，Fast YOLO，处理速度惊人的155帧每秒，同时仍然实现了两倍于其他实时探测器的mAP。与最先进的检测系统相比，YOLO产生更多的定位错误，但更不可能预测背景误报。 最后，YOLO学习目标的一般表示。

# Conclusion

这篇文章引入了目标检测的统一模型YOLO。该模型简单易于构建并且可以直接在整张图像上训练。与基于分类器的方法不同，YOLO是在一个直接对应检测性能的损失函数上训练的，整个模型是联合训练的。

Fast YOLO是文献中最快的通用目标检测器，YOLO推动了实时目标检测的最先进技术。YOLO还可以很好地泛化到新的领域，使其成为依赖于快速、健壮的目标检测的应用的理想选择。
