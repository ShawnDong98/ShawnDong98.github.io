---
layout:     post
title:      "【ICCV 2023】MRLPFNet：Multi-scale Residual Low-Pass Filter Network for Image Deblurring"
subtitle:   ""
date:       2024-01-08
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - ICCV 2023
    - 深度学习
---

# Abstract

我们提出了一种简单而有效的多尺度残差低通滤波网络（MRLPFNet），它联合探索图像细节和主结构，用于图像去模糊。

我们的工作是由一个观察所激发的，即模糊图像和清晰图像之间的差异不仅包含高频内容，还包括由于模糊影响而产生的低频信息，而使用标准的残差学习对于模拟模糊所扭曲的主结构则效果不佳。

考虑到低频内容通常对应于空间变化的主要全局结构，我们首先基于自注意力机制提出了一种可学习的低通滤波器，以适应性地探索全局上下文，从而更好地模拟低频信息。

然后我们将其嵌入到一个残差低通滤波（RLPF）模块中，该模块涉及到一个附加的完全卷积神经网络，使用标准的残差学习来模拟高频信息。

我们将RLPF模块构建成一个基于编码器和解码器架构的端到端可训练网络，并开发了基于小波的特征融合技术，以融合多尺度特征。

实验结果表明，我们的方法在常用基准测试上优于当前最先进的方法。