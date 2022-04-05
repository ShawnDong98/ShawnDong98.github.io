---
layout:     post
title:      "【深度学习】X-VLM：Multi-Grained Vision Language Pre-Training: Aligning Texts with Visual Concepts"
subtitle:   ""
date:       2022-04-05
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - 
---

# Abstract
现有的视觉语言预训练方法大多依赖于通过目标检测提取的以物体为中心的特征，并将提取的特征与文本进行细粒度的比对。

这篇文章认为物体检测可能不是视觉语言预训练的必要条件。

为此，这篇文章提出了一种新的方法X-VLM来进行多粒度的视觉语言预训练。

学习多粒度对齐的关键是定位相关文本对应的图像视觉概念，同时将文本与视觉概念对齐，其中对齐是多粒度的。

实验结果表明，X-VLM有效地利用学习对齐到许多下游视觉语言任务，并始终优于最先进的方法。
# Conclusion

现有的视觉语言模型将文本与图像的细粒度的物体中心特征或粗粒度图像整体特征进行对齐。这两种方法虽然有效，但仍存在一些不足。

这篇文章重构了现有数据集， 将其变为 image/region/object-text pairs， 并且提出了 X-VLM， 一种实现多粒度视觉语言预训练的方法。

模型的训练是通过在给定相关文本的图像中定位视觉概念，并将文本与相关的视觉概念对齐来驱动的，其中对齐是多粒度的。

在许多V+L任务上的实验，包括图像-文本检索、视觉推理和视觉定位，已经表明X-VLM优于现有的SoTA方法。

