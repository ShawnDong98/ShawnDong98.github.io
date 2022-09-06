---
layout:     post
title:      "【深度学习】DeepLab V3：Rethinking Atrous Convolution for Semantic Image Segmentation"
subtitle:   ""
date:       2022-09-06
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - Segmentation
    - Arxiv 2017
---

# Abstract

在这项工作中，作者重新审视了 atrous 卷积，这是一个在语义图像分割应用中显式调整 filter 视野以及控制深卷积神经网络计算的特征响应分辨率的强大工具。

为了解决在多个尺度上分割物体的问题，作者设计了在级联或并行中使用 atrous 卷积的模块，通过采用多个 atrous rate 捕获多尺度上下文。



# Conclusion