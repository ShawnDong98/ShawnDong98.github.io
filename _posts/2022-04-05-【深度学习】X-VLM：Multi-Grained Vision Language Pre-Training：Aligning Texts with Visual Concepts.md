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

