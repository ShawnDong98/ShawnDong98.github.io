---
layout:     post
title:      "【深度学习】Spatial as Deep(SCNN): Spatial CNN for Traffic Scene Understanding"
subtitle:   ""
date:       2022-09-29
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - Segmentation
    - AAAI 2018
---

# Abstract

卷积神经网络（CNN）通常通过逐层堆叠卷积操作来构建。

尽管 CNN 表现出从原始像素中提取语义的强大能力，但它在图像的行和列中捕获像素空间关系的能力尚未得到充分探索。

这些关系对于学习具有强形状先验但外观相干性较弱的语义对象很重要，例如交通车道，如图1（a）所示，这些车道经常被堵塞甚至没有绘制在路面上。

这篇文章提出了 Spatial CNN（SCNN），它将传统的 layer-by-layer 卷积推广到特征映射中的 slice-by-slice 卷积，从而使像素之间能够在层中的行和列之间传递。

这种 SCNN 特别适用于长长的连续形状结构或大型物体，具有很强的空间关系但外观线索较少，如交通车道、电线杆和墙壁。

作者将SCNN应用于新发布的非常具有挑战性的交通车道检测数据集和Cityscapse数据集。

结果表明，SCNN可以学习结构化输出的空间关系，并显著提高性能。

# Conclusion

这篇文章提出了 Spatial CNN，一种类似于CNN的方案，以实现空间层面的有效信息传播。

SCNN可以很容易地被整合到深层神经网络和端到端训练。

它在交通场景理解的两项任务中进行评估：车道检测和语义分割。

结果表明，SCNN可以有效保持长细结构的连续性，而在语义分割中，其扩散效应也被证明对大型物体有益。

具体来说，通过将 SCNN 引入 LargeFOV 模型，作者的20层网络在车道检测方面优于ReNet、MRF和非常深的ResNet-101。



