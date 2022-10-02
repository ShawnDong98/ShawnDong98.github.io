---
layout:     post
title:      "【深度学习】DETR：End-to-End Object Detection with Transformers"
subtitle:   ""
date:       2022-10-02
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - Detection
    - Arxiv 2020
---

# Abstract

这篇文章提出了一种将目标检测视为集合预测问题的新方法。

该方法简化了目标检测流程，有效地消除了对许多手工设计的组合的需求，如非极大值抑制过程或 Anchor 生成，这些过程或 Anchor 生成明确编码了对该任务的先验知识。

新框架的主要成分称为 DEtection TRansformer 或 DETR，是基于集合的全局损失，其通过二分匹配和Transformer码器解码器结构进行预测。

给定一组固定的学习目标 query，DETR对目标的关系和全局图像上下文进行推理，直接并行输出最终的预测集合。

与许多其他现代目标检测器不同，新模型在概念上很简单，不需要专门的库。

DETR在COCO目标检测数据集上展示了与高度优化的 Faster R-CNN 基线相当的准确性和运行时间性能。

此外，DETR可以很容易地泛化，以统一的方式产生全景分割。

# Conclusion

这篇文章提出了DETR，这是一种基于 Transformer 和二分匹配损失的目标检测系统的新设计，用于直接集合预测。

该方法在 COCO数据集上实现了与优化的 Faster R-CNN 基线相当的结果。

DETR实现简单，具有灵活的架构，易于扩展为全景分割，并具有竞争性的结果。

此外，它在大型物体上的性能明显优于 Faster R-CNN，这可能要归功于对自注意力形成的全局信息的处理。

这种新的检测器设计也带来了新的挑战，特别是在训练、优化和小物体性能方面。

