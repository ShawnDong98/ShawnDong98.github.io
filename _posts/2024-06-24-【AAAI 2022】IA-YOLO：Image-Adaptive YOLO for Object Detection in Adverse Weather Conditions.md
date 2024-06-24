---
layout:     post
title:      "【AAAI 2022】IA-YOLO：Image-Adaptive YOLO for Object Detection in Adverse Weather Conditions"
subtitle:   ""
date:      2024-06-24
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - AAAI 2022
    - 
---

# Abstract

尽管基于深度学习的目标检测方法在传统数据集上取得了令人鼓舞的结果，但在恶劣天气条件下捕获的低质量图像中定位目标仍然具有挑战性。

现有的方法要么难以平衡图像增强和目标检测任务，要么常常忽略对检测有益的潜在信息。

为了解决这个问题，我们提出了一种新的图像自适应YOLO (IA-YOLO) 框架，其中每幅图像都可以自适应地增强以获得更好的检测性能。

具体来说，我们提出了一个可微图像处理（DIP）模块，该模块考虑了YOLO检测器的恶劣天气条件，其参数由一个小型卷积神经网络（CNN-PP）预测。

我们以端到端的方式联合学习CNN-PP和YOLOv3，这确保了CNN-PP可以以弱监督的方式学习适当的DIP以增强检测图像。

我们提出的IA-YOLO方法可以自适应地处理正常和恶劣天气条件下的图像。

实验结果非常令人鼓舞，证明了我们提出的IA-YOLO方法在雾天和暗光场景中的有效性。