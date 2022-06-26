---
layout:     post
title:      "【深度学习】ADMM-Net：Deep Tensor ADMM-Net for Snapshot Compressive Imaging "
subtitle:   ""
date:       2022-06-26
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - HSI
    - ICCV 2019
---


# Abstract

快照压缩成像(SCI)系统已被开发用于使用低维 off-the-shelf 传感器捕捉高维(>=3)信号，即将多个视频帧映射到单个 measurement 帧。

SCI系统的一个关键模块是一个准确的解码器，可以恢复原始视频帧。

然而，现有的基于模型的解码算法需要利用先验知识进行彻底的参数调优，由于运行时间过长，无法支持实际应用。

这篇文章提出了一种用于视频SCI系统的 Deep Tensor ADMM-Net，它可以在秒内提供高质量的解码。

首先，从一个标准的 tensor ADMM 算法开始，将其推理迭代展开到一个 layer-wise 结构中，并设计了一个基于张量运算的深度神经网络。

其次，网络不依赖于预先指定的稀疏表示域，而是通过随机梯度下降法学习低秩张量域。

值得注意的是，提出的 Deep Tensor ADMM-Net 具有潜在的数学解释。

在公共视频数据上的仿真结果表明，该方法的PSNR平均提高0.8 2.5 dB, SSIM平均提高0.07 0.1，提速1500-3600次。

在SCI相机捕获的真实数据上，实验结果显示了与最先进的方法相比较的视觉效果，但运行时间更短
# Conclusion

这篇文章为快照压缩成像系统提出了一种 Deep Tensor ADMM-Net，可以在秒内提供高质量的解码。

将低秩张量模型嵌入到 ADMM 框架中，并将迭代展开到神经网络阶段，因此网络具有潜在的数学解释。

在仿真和真实的 SCI 相机数据上的实验表明，提出的方法展示了优越的性能，并优于目前最先进的算法。
