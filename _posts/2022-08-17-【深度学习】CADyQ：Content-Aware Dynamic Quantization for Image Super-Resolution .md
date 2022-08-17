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

为此，引入一个可训练的 bit-selector 模块来确定每一层和给定的局部图像 patch 的合适的 bit-width 和量化级别。

该模块由 quantization sensitivity 控制， quantization sensitivity 由patch图像梯度的平均 magnitude 和层输入特征的标准差估计。

该 quantization pipeline 已在各种SR网络上进行了测试，并在多个标准基准上进行了广泛的评估。

计算复杂度的显著降低和恢复精度的提高清楚地表明了所提出的CADyQ框架对SR的有效性。

# Conclusion