---
layout:     post
title:      "【深度学习】OCRNet：Segmentation Transformer: Object-Contextual Representations for Semantic Segmentation"
subtitle:   ""
date:       2022-08-31
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - Segmentation
    - ECCV 2020
---
# Abstract

这篇文章研究了语义分割中的上下文聚合问题。

基于像素的标签是该像素所属对象的类别，作者提出了一种简单而又客观的方法，object-contextual representations，通过利用对应对象类的表示来表征一个像素。

首先，作者在真实标签分割的监督下学习目标区域。

其次，作者通过聚集 object region 内像素的 representations 来计算 object region representation。
# Conclusion