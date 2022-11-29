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


# Method

在这节中，作者首先回顾了了最优传输问题的定义，然后演示了如何将目标检测中的标签分配转化成OT问题。作者还介绍了两种先进的设计，建议采用这两种设计来充分利用OTA。

##  Optimal Transport

最佳运输（OT）描述了以下问题：假设某个领域有 $m$ 个供应商和 $n$ 个需求者。

## OT for Label Assignment


## Advanced Designs


# Conclusion

这篇文章提出了一种基于优化理论的标签分配策略——最优传输分配。

OTA将目标检测中的标签分配程序设计为最佳传输问题，该问题旨在以最低的传输成本将标签从真实目标和背景传输到先验框。

为了确定每个真是标签所需的正标签数量，坐着进一步根据预测边界框和每个真实标签之间的IoU值提出一个简单的估计策略。

如实验所示，OTA 在 MS COCO 上实现了新的SOTA性能。

由于OTA可以很好地处理模棱两可的先验框的分配，它还比CrowdHuman数据集中的所有其他单阶段检测器优异，这表明其强大的泛化能力。