---
layout:     post
title:      "【深度学习】OTA: Optimal Transport Assignment for Object Detection"
subtitle:   ""
date:       2022-11-06
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - Detection
    - CVPR 2021
---

# Abstract

目标检测标签分配的最新进展主要寻求为每个真实目标定义正/负训练样本。

这篇文章从全局角度创新地重新审视了标签分配，并提出将分配过程表述为最优传输（OT）问题——这是优化理论中一个经过充分研究的课题。

具体而言，我们将每个先验框(demander)和真实标签(supplier)对之间的单位运输成本定义为其分类和回归损失的加权和。

制定后，找到最佳分配解决方案，以最低的传输成本解决最佳传输计划，这可以通过Sinkhorn-Knopp迭代解决。

在COCO上，一个配备最佳传输分配(OTA)的FCOS-ResNet-50检测器可以在 1× scheduler 下达到40.7%的mAP，优于所有其他现有分配方法。


# Conclusion