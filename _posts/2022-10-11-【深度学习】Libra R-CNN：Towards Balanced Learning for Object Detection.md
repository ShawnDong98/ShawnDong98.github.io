---
layout:     post
title:      "【深度学习】Libra R-CNN：Towards Balanced Learning for Object Detection"
subtitle:   ""
date:       2022-10-11
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - Detection
    - CVPR 2019
---

# Abstract

与模型结构相比，训练过程对检测器的成功也至关重要，但在物体检测中受到的关注相对较少。

在这项工作中，作者仔细重新审视了检测器的标准训练实践，发现检测性能往往受到训练过程中不平衡的限制，不平衡通常由三个级别组成——样本级别、特征级别和目标级别。

为了减轻由此造成的不利影响，作者提出了Libra R-CNN，这是一个简单但有效的框架，旨在平衡学习目标检测。

它集成了三个新组件：IoU-balanced sampling, balanced feature pyramid 和 balanced L1 loss，分别用于减少样本、特征和目标的不平衡。

Libra R-CNN 受益于整体平衡的设计，显著提高了检测性能。

# Conclusion