---
layout:     post
title:      "【深度学习】ADMM-Net: A Deep Learning Approach for Compressive Sensing MRI"
subtitle:   ""
date:       2023-06-02
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - NIPS 2016
---

# Abstract

压缩感知（CS）是快速磁共振成像（MRI）的有效方法。

它旨在从 k 空间中少量采样不足的数据中重建 MR 图像，并加速 MRI 中的数据采集。

为了提高当前核磁共振系统的重建精度和速度，在本文中，我们提出了两种新的深度架构，在基本版本和广义版本中称为ADMM-Nets。

ADMM-Nets是在数据流图上定义的，数据流图来自乘子交替方向法（ADMM）算法中的迭代程序，用于优化基于CS的通用MRI模型。

他们将采样的 k 空间数据作为输入并且输出重建的 MR 图像。

此外，我们扩展了我们的网络，以应对具有复数值的磁共振图像。

在训练阶段，网络的所有参数，例如 transforms 、  shrinkage 函数等，都是端到端的判别式训练。

在测试阶段，他们具有类似于ADMM算法的计算开销，但使用从数据中学习的优化参数进行基于CS的重建任务。

我们调查了网络结构中的不同配置，并在不同的采样率下对 MR 图像重建进行了广泛的实验。