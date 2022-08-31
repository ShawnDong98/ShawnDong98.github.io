---
layout:     post
title:      "【深度学习】HarDNet: A Low Memory Traffic Network"
subtitle:   ""
date:       2022-08-31
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - Segmentation
    - ICCV 2019
---

# Abstract

最先进的神经网络架构，如ResNet, MobileNet和DenseNet，已经在低 MACs 和小模型尺寸的对应产品上取得了卓越的精度。

但是，这些度量对于预测推断时间可能不准确。

作者认为，访问中间特征映射的 memory traffic 可能是决定推断延迟的一个因素，特别是在实时目标检测和高分辨率视频的语义分割等任务中。

作者提出了 Harmonic Densely Connected 网络，以实现高效率，在低 MACs 和 memory traffic。

与FC-DenseNet-103、DenseNet-264、ResNet-50、ResNet-152和SSD-VGG相比，新网络分别减少了35%、36%、30%、32%和45%的推理时间。

作者使用包括Nvidia profiler和ARM Scale-Sim在内的工具来测量 memory traffic，并验证推断延迟确实与 memory traffic 消耗成比例，并且所提出的网络消耗低 memory traffic。


# Conclusion

作者提出了一种新的度量方法，通过估计特征映射的 DRAM traffic 来评估卷积神经网络，这是影响系统功耗的一个关键因素。

当计算密度较低时，traffic 对推断时间的支配作用比模型大小和操作次数更显著。

作者使用 Convolutional Input/Output(CIO) 作为一个 DRAM traffic 的估计， 提出 Harmonic Densely Connected Networks(HarDNet)， 其取得了高 accuracy-over-CIO 并且通过增加计算密度取得了高计算效率。