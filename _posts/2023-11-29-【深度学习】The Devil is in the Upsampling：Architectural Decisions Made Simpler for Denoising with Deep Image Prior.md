---
layout:     post
title:      "【深度学习】The Devil is in the Upsampling：Architectural Decisions Made Simpler for Denoising with Deep Image Prior"
subtitle:   ""
date:       2023-11-29
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习 
    - ICCV 2023
---

# Abstract

Deep Image Prior（DIP）表明，一些网络架构本质上倾向于在抵抗噪声的同时生成平滑图像，这种现象被称为 Spectrl Bias。

图像去噪是该属性的自然应用。虽然使用DIP消除了对大型训练集的需求，但需要克服两个通常相互交织的实际挑战：结构设计和噪声拟合。

由于对结构选择如何影响去噪结果的理解有限，现有的方法要么手工制作，要么从广阔的设计空间寻找合适的结构。

在这项研究中，我们从频率的角度证明，未学习的上采样是 DIP 去噪现象背后的主要驱动力。

这一发现导致了为每张图像确定合适结构的简单策略，而无需费力搜索。

广泛的实验表明，估计的架构实现了优于现有方法的去噪结果，参数减少了95%。

由于这种少的参数量，由此产生的架构不太容易发生噪声拟合。


#  Investigation and Method

## The importance of upsampling

我们首先确定了影响DIP去噪性能的核心架构组件。为此，我们通过从典型的编码器解码器架构[33]中删除编码器来分析仅解码器架构，因为解码器是重建最终图像的最小需求。我们的分析基础模型是一个6层卷积解码器（Conv-Decoder[10]），除最后一个回归层外，每层有128 3 × 3过滤器，然后是批标准化、ReLU激活和向上采样。我们进一步简化了设置，将空间滤波器替换为像素级1×1滤波器，构建了一个名为MLP解码器的非卷积变体。

MLP-解码器的结果如图3(a)所示，表明上采样发挥了至关重要的作用。去除上采样会导致降噪性能显著下降，而这种下降不能仅通过增加网络规模以解决欠参数化的问题来补偿。