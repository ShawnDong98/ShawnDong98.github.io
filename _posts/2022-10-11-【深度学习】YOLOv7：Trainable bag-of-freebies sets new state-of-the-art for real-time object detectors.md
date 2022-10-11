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

# Conclusion

在5 FPS到160 FPS的范围内，YOLOv7在速度和精度上都超过了所有已知的目标检测器，在GPU V100上具有30 FPS或更高的已知实时目标检测器中，精度最高56.8%的AP test-dev / 最小56.8% AP 。

YOLOv7-E6 目标检测器（56 FPS V100，55.9% AP）的速度比基于 Transformer 的检测器 SWIN-L Cascade-Mask R-CNN（9.2 FPS A100，53.9% AP）快509%，精度高出 2% AP，比基于卷积的检测器 ConvNeXt-XL Cascade-Mask R-CNN (8.6 FPS A100, 55.2% AP)  速度快 551%， 精度高 0.7%
AP。

此外，作者仅从头开始在MS COCO数据集上训练YOLOv7，不使用任何其他数据集或预训练的权重。