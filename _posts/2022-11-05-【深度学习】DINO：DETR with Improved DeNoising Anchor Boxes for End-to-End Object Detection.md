---
layout:     post
title:      "【深度学习】DINO：DETR with Improved DeNoising Anchor Boxes for End-to-End Object Detection"
subtitle:   ""
date:       2022-11-05
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习 
    - Detection
    - Arxiv 2022
---

# Abstract

这篇文章提出 DINO（DETR with Improved deNoising anchOr boxes），一种最先进的端到端目标检测器。

与之前类似DETR的模型相比，DINO通过使用对比方法进行去噪训练、用于先验框初始化的 mixed query selection 方法以及用于边界框预测的 look forward twice scheme，在性能和效率方面有所提高。

在具有 ResNet-50 主干和多尺度特征的COCO上，DINO在12个 epoch 中实现了49.4AP，在24个epoch中实现了51.3AP，与之前最好的类似DETR模型DN-DETR相比，分别显著提高了+6.0AP和+2.7AP。

DINO在模型大小和数据大小上都能很好地扩展。

在没有技巧的情况下，在使用 SwinL 主干对Objects365数据集进行预训练后，DINO 在 COCO val2017（63.2AP）和 test-dev（63.3AP）上都获得了最佳结果。

与排行榜上的其他模型相比，DINO显著减少了其模型大小和预训练数据大小，同时取得了更好的结果。

# Conclution