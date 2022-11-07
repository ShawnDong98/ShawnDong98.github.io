---
layout:     post
title:      "【深度学习】SOLO: Segmenting Objects by Locations"
subtitle:   ""
date:       2022-11-07
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - Detection
    - ECCV 2020
---

# Abstract

这篇文章提出了一种新的的简单实例分割方法。

与许多其他密集的预测任务（例如语义分割）相比，任意数量的实例使实例分割更具挑战性。

为了预测每个实例的 mask，主流方法要么遵循 “检测然后分割” 策略（例如，Mask R-CNN），要么先预测嵌入向量，然后使用聚类技术将像素分组到单个实例中。

作者通过引入 “实例类别” 的概念，从全新的角度看待实例分割任务，该概念根据实例的位置和大小为实例中的每个像素分配类别，从而将实例内分割很好地转换为单样本分类可解决的问题。

作者展示了更简单、更灵活的实例分割框架工作，具有强大的性能，与Mask R-CNN实现了同等的准确性，并在准确率方面优于最近的单样本实例分割器。

作者希望，除了实例分割外，这个简单而强大的框架可以作为许多实例级识别任务的基线。

# Conclusion
