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

# The DETR model

## Object detection set prediction loss


## DETR architecture

DETR 推断出一组固定大小的 $N$ 个预测，只需通过解码器，其中 $N$ 被设置为明显大于图像中的目标数量。训练的主要困难之一是根据真实目标（类别、位置、大小）进行评分。所提出的损失在预测和真实目标之间产生最佳的二分匹配，然后优化特定目标（边界框）损失。

用 $y$ 表示一组真实目标， $\hat y = {\hat y_i}_{i=1}^N$ 表示一组 $N$ 个预测。 




# Conclusion

这篇文章提出了DETR，这是一种基于 Transformer 和二分匹配损失的目标检测系统的新设计，用于直接集合预测。

该方法在 COCO数据集上实现了与优化的 Faster R-CNN 基线相当的结果。

DETR实现简单，具有灵活的架构，易于扩展为全景分割，并具有竞争性的结果。

此外，它在大型物体上的性能明显优于 Faster R-CNN，这可能要归功于对自注意力形成的全局信息的处理。

这种新的检测器设计也带来了新的挑战，特别是在训练、优化和小物体性能方面。

