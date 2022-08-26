---
layout:     post
title:      "【深度学习】PP-YOLOv2: A Practical Object Detector "
subtitle:   ""
date:       2022-08-26
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - CV
    - arxiv 2021
---

# Abstract

effective 和 efficient 是实用的目标检测器的基本要求。

为了满足这两个问题，作者综合评估了一系列现有的改进，以提高PP-YOLO的性能，同时几乎保持推理时间不变。

这篇文章将分析一系列改进措施，并通过增量消融研究，实证评估它们对最终模型性能的影响。

通过结合多种有效的改进，作者将PP-YOLO在COCO2017 test-dev 中的性能从45.9% mAP提升到49.5% mAP。

由于已经取得了显著的性能提升，作者提出PP-YOLOv2。

在速度方面，PP-YOLOv2以68.9FPS和640x640输入大小运行。

采用TensorRT、FP16-precision和 batchsize = 1 的 Paddle inference 引擎，进一步提高了PP-YOLOv2的推理速度，达到106.5 FPS。

这样的性能超过了现有的具有大致相同数量参数的目标检测器(即YOLOv4-CSP, YOLOv5l)。