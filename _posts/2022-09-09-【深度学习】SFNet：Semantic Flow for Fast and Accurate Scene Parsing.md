---
layout:     post
title:      "【深度学习】SFNet：Semantic Flow for Fast and Accurate Scene Parsing"
subtitle:   ""
date:       2022-09-09
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - Segmentation
    - ECCV 2020
---

# Abstract

这篇文章重点设计了快速准确 scene parsing 的有效方法。

改进性能的常见做法是获得具有强大语义表示的高分辨率特征图。

两种策略被广泛使用—— atrous卷积和 feature pyramid 融合，它们要么是计算密集型的，要么是无效的。

受启发于相邻视频帧之间运动对齐的光学流的启发，作者提出了一个 Flow Alignment 模块(FAM), 用于学习相邻 level 特征图之间的 Semantic Flow，并有效和高效地将 high-level 分辨率特征广播到高分辨率特征。

进一步， 将该模块集成到通用特征金字塔结构中，即使在 ResNet-18 等轻量型骨干网络上，也比其他实时方法表现出更好的性能。

# Conclusion

这篇文章设计使用学习的 Semantic Flow 将特征金字塔生成的多级特征图与 scene parsing 任务对齐。通过提出的光流对齐模块，高级特征被很好地融合到高分辨率的低级特征图中。

通过丢弃 atrous 卷积以减少计算开销，并使用光流对齐模块来丰富低级特征的语义表示，网络实现了语义分割精度和运行时间效率之间的最佳权衡。

