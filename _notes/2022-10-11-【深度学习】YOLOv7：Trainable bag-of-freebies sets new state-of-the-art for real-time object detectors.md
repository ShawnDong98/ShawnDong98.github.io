---
layout:     post
title:      "【深度学习】YOLOv7: Trainable bag-of-freebies sets new state-of-the-art for real-time object detectors"
subtitle:   ""
date:       2022-10-11
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - Detection
    - Arxiv 2022
---

# Abstract

在5 FPS到160 FPS的范围内，YOLOv7在速度和精度上都超过了所有已知的目标检测器，在GPU V100上具有30 FPS或更高， AP精度最高56.8%。

YOLOv7-E6 目标检测器（56 FPS V100，55.9% AP）的速度比基于 Transformer 的检测器 SWIN-L Cascade-Mask R-CNN（9.2 FPS A100，53.9% AP）快509%，精度高出 2% AP，比基于卷积的检测器 ConvNeXt-XL Cascade-Mask R-CNN (8.6 FPS A100, 55.2% AP)  速度快 551%， 精度高 0.7%
AP。

此外，作者只从头开始在MS COCO数据集上训练YOLOv7，不使用任何其他数据集或预训练的权重。


# Method


# Conclusion

这篇文章提出了一种新的实时目标检测器架构和相应的模型缩放方法。

此外，作者发现，目标检测方法的演变过程产生了新的研究课题。

在研究过程中，作者发现了重新数化模块的替换问题和动态标签分配的定位问题。

为了解决这个问题，作者提出了可训练的 bag-of-freebies 方法，以提高目标检测的准确性。

基于上述，作者开发了YOLOv7系列目标检测系统，该系统获得了最先进的结果。