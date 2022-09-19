---
layout:     post
title:      "【深度学习】FPN：Feature Pyramid Networks for Object Detection"
subtitle:   ""
date:       2022-09-19
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - Detection
    - Arxiv 2017
---

# Abstract

特征金字塔是识别系统中检测不同尺度物体的基本组成部分。

但最近的深度学习目标检测器避免了金字塔的表征，部分原因是它们是计算和内存密集型的。

这篇文章利用深度卷积网络固有的多尺度金字塔层次结构，以少量的额外成本构建特征金字塔。

开发了一个具有横向连接的自上而下的架构，用于构建各种尺度的高级语义特征图。

这种架构被称为特征金字塔网络（FPN），在几个应用程序中作为通用特征提取器进行了重大改进。

在基本的 Faster R-CNN 系统中使用FPN，该方法在 COCO 检测基准上实现了最先进的单模型结果，超过了所有现有的单模型结果，包括COCO 2016 Challenge 获胜者。



# Conclusion