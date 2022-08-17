---
layout:     post
title:      "【深度学习】CADyQ: Content-Aware Dynamic Quantization for Image Super-Resolution "
subtitle:   ""
date:       2022-08-17
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - ECCV 2022
---

# Abstract

尽管卷积神经网络(convolutional neural networks, CNNs)在图像超分辨率(SR)方面取得了突破性的进展，但由于卷积神经网络的计算复杂度较高，尚未得到广泛的应用。

量化是解决这一问题的有效方法之一。

然而，现有的方法无法对 bit-width 低于8位的SR模型进行量化，由于到处都是固定 bit-width 量化，导致精度损失严重。

提出了一种新的内容感知动态量化(CADyQ)方法，该方法基于输入图像的局部内容，自适应地将optimal bits 分配到 local regions 和 layers 中，以实现较高的 average bit-reduction 和较低的 accuracy loss。



# Conclusion