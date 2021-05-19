---
layout:     post
title:      "【d2l】Region-based CNNs (R-CNNs)"
subtitle:   ""
date:       2021-05-19
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - d2l
---


基于区域的卷积神经网络(Region-based convolutional neural networks, or regions with CNN feature, R-CNNs)是将深度模型应用于目标检测的一种前沿方法\[Girshick et al.， 2014\]。在本节中，我们将讨论R-CNN和对它们的一系列改进:Fast R-CNN \[Girshick, 2015\]， Faster R-CNN \[Ren et al.， 2015\]，和Mask R-CNN \[He et al.， 2017a\]。由于篇幅限制，我们将只讨论这些模型的设计。


# R-CNNs

R-CNN模型首先从图像中选择几个提出的区域(例如，anchor boxes是一种选择方法)，然后标记它们的类别和边界框(例如，offsets)。然后，他们使用CNN进行前向计算，从每个提议的区域提取特征。然后，我们利用每个区域的特征来预测它们的类别和边界框。图13.8.1为一个R-CNN模型。

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1621403060813.png)

图13.8.1, R-CNN model

具体来说，R-CNN由四个主要部分组成：

- 对输入图像进行选择性搜索，选择多个高质量的提出区域\[Uijlings等，2013\]。这些被提议的区域通常在多个尺度上被选择，并且有不同的形状和大小。对每个区域的类别和ground-truth边界框进行标注。
- 将一个预先训练好的CNN以截断的形式放置在输出层之前。它将每个提出的区域转换为网络所需的输入维数，并使用前向计算输出从提出的区域中提取的特征。
- 以每个区域的特征和标注类别为样本，训练多个支持向量机进行目标分类。这里使用每个支持向量机来确定一个样本是否属于某个类别。
- 将每个区域的特征和标记的边界框结合为例，训练线性回归模型用于 ground-truth 边界框预测。
