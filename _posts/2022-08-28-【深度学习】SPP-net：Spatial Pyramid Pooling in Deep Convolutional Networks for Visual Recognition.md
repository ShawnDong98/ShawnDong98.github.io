---
layout:     post
title:      "【深度学习】SPP-net：Spatial Pyramid Pooling in Deep Convolutional Networks for Visual Recognition"
subtitle:   ""
date:       2022-08-28
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - CV
    - Detection
    - TPAMI 2015
---

# Abstract

现有的深度卷积神经网络(CNNs)需要固定大小的输入图像(例如224 224)。这个需要是人工的并且可能会减少任意大小的图像的识别准确率。在这项工作中，作者为网络配备了另一种池化策略——空间金字塔池化，以消除上述要求。该网络结构叫做 SPP-net, 无论图像的大小多少， 其都能够生成固定长度的表征。Pyramid pooling 对于物体形变也是有效的。基于这些优势，SPP-net 应该在总体上改进所有基于 cnn 的图像分类方法。在ImageNet 2012数据集上，作者证明了SPP-net提高了各种CNN架构的准确性，尽管它们的设计不同。在Pascal VOC 2007和Caltech101数据集上，SPP-net使用单一的全图像表示，无需微调，就能获得最先进的分类结果。

SPP-net在目标检测方面的能力也很重要。使用SPP-net，只从整个图像计算一次特征图，然后在任意区域(子图像)中汇集特征来生成固定长度的表示，用于训练检测器。该方法避免了重复计算卷积特征。在处理测试图像中，该方法比R-CNN方法快 24-102x 倍，同时在Pascal VOC 2007上取得更好或相当的精度。

在2014年的ImageNet大尺度视觉识别挑战赛(ILSVRC)中，该方法在所有38个团队中在目标检测和图像分类方面排名第2和第3。

# Conclusion

