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

此外，作者提出增强 Atrous Spatial Pyramid Pooling 模块，该模块探测多个尺度的卷积效果，具有编码全局上下文的图像级特征，以进一步提高性能。

作者还详细介绍了实施细节，并分享了作者在训练系统方面的经验。

与之前没有 DenseCRF 后处理的 DeepLab 版本相比，提出的 “DeepLabv3” 系统有了显著改进，并实现了与PASCAL VOC 2012语义图像分割基准上其他最先进的模型的性能。

# Conclusion

作者提出的模型 “DeepLabv3” 使用带有上采样 filter 的 atrous 卷积来提取密集的特征图并捕获远程上下文。

具体来说，为了编码多尺度信息，作者提出的级联模块逐渐将 atrous rate 提高一倍，而作者提出的 atrous spatial pyramid pooling 模块，增强了图像级特征，探索了具有多种采样率和有效感受野的 filter 的特征。

实验结果表明，与之前的 DeepLab 版本相比，该模型有了显著改进，并在 PASCAL VOC 2012 语义图像分割基准上与其他最先进的模型实现了相当的性能。

