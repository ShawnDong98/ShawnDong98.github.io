---
layout:     post
title:      "【深度学习】ViTDet：Exploring Plain Vision Transformer Backbones for Object Detection"
subtitle:   ""
date:       2022-11-02
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - Detection
    - ECCV 2022
---

# Abstract

作者探索了朴素的、非层次化的视觉 Transformer（ViT）作为目标检测的骨干网络。

这种设计使原始的ViT架构能够进行微调，以进行目标检测，而无需重新设计用于预训练的层次化骨干。

通过最小的微调调整，所提出的普通骨干检测器可以实现有竞争力的结果。

令人惊讶的是，作者观察到：

（i）从单尺度特征图（没有常见的FPN设计）构建一个简单的特征金字塔就足够了

（ii）在很少的 cross-window propagation 块的帮助下使用窗口注意（不需要 shift）就足够了。

通过预训练为 Masked Autoencoders(MAE) 的普通ViT骨干，该检测器名为ViTDet，可以与之前基于层次化的主干的领先方法竞争，仅使用 ImageNet-1K 预训练在COCO数据集上达到高达 61.3 AP。



# Conclusion