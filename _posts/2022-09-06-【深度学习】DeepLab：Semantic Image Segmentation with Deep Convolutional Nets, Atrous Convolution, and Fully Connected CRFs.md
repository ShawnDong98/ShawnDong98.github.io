---
layout:     post
title: '【深度学习】DeepLab：Semantic Image Segmentation with Deep Convolutional Nets, Atrous Convolution, and Fully Connected CRFs'
subtitle:   ""
date:       2022-09-06
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - TPAMI 2018
---

# Abstract

在这项工作中，作者用深度学习解决了图像语义分割任务，并作出了三个主要贡献，实验表明有实质性的实际价值。

首先，作者强调了带上采样 filters 的卷积， 叫做 "atrous convolution"， 作为密集预测任务的工具。

Atrous 卷积允许明确地控制分辨率，在深度卷积神经网络中计算特征响应。

它还允许我们在不增加参数数量或计算量的情况下，有效地扩大filter的感受野，以纳入更大的上下文。

其次，作者提出了一种基于 atrous spatial pyramid pooling(ASPP)的鲁棒性的多尺度目标分割算法。

ASPP以多个采样率和有效感受野的 filters 探测传入的卷积特征层，从而捕获目标以及在多个尺度上的图像上下文。

第三，作者结合 DCNN 和概率图模型的方法改进了目标边界的定位。

DCNN 中常用的最大池化和下采样的组合实现了不变性，但对定位精度有影响。

作者通过将最终DCNN层的响应与一个全连接的条件随机场(CRF)相结合来克服这一问题，这在定性和定量上都显示出来，以提高定位性能。

# Conclusion