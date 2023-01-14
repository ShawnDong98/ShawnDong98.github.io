---
layout:     post
title:      "【深度学习】CenterMask : Real-Time Anchor-Free Instance Segmentation"
subtitle:   ""
date:       2023-01-14
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - Detection
    - CVPR 2020
---

# Abstract

这篇文章提出了一种简单而高效的无先验框实例分割，称为CenterMask，它添加了一个新的空间注意力引导掩码（SAG-Mask）分支，以与Mask R-CNN[9]可以相比的无先验框单阶段物体探测器（FCOS [33]）。

SAG-Mask 分支插入 FCOS 目标检测器，使用空间注意力图预测每个检测到的边界框上的分割 mask，这有助于关注信息像素并抑制噪声。

作者还提出了一种改进的骨干网络 VoVNetV2，具有两种有效的策略：（1）残差连接以缓解更大的 VoVNet 的优化问题[19 ]和（2）effective Squeeze-Excitation (eSE)  处理原始 SE 的通道信息丢失问题。

通过 SAG-Mask 和 VoVNetV2，作者设计了 CenterMask 和 CenterMask-Lite 各种大小的模型。

使用相同的ResNet-101-FPN主干，CenterMask 达到38.3%，以更快的速度超过了之前所有最先进的方法。

# CenterMask

在本节中，首先，我们回顾了无先验框目标检测器FCOS[33]，这是 CenterMask 的基本目标检测部分。

接下来，作者展示了 CenterMask 的原型，并描述了提出的空间注意力引导 mask 分支（SAG-Mask）如何设计为插入FCOS 检测器。

## FCOS

## Architecture

## Adaptive RoI Assignment Function

## Spatial Attention-Guided Mask

## VoVNetV2 backbone

## Implementation details

![表格](./attachments/1673669603638.table.html)