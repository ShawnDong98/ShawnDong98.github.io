---
layout:     post
title:      "【深度学习】TLC：Improving Image Restoration by Revisiting Global Information Aggregation "
subtitle:   ""
date:       2022-08-16
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - low-level CV
    - ECCV 2022
---

# Abstract

全局操作，如全局平均池，被广泛用于顶级性能的图像恢复。

它们通过输入特征沿着整个空间维度聚合全局信息，但在图像恢复任务的训练和推理过程中表现不同:它们基于不同的区域，即裁剪的patch(来自图像)和全分辨率图像。

本文回顾了全局信息聚合，发现推理过程中基于图像的特征分布与训练过程中基于patch的特征分布不同。

这种训练-测试的不一致性会对模型的性能产生负面影响，这是以往研究中严重忽视的问题。

为了减少不一致性，提高测试时的性能，作者提出了一种简单的方法，称为 Test-time Local Converter(TLC)。

TLC只在推断时将全局操作转换为局部操作，这样它们就聚集了局部空间区域内的特征，而不是整个大图像。

该方法可以应用于各种全局模块(如归一化、通道和空间注意力)，且成本可以忽略不计。

在不需要任何微调的情况下，TLC改进了几个图像恢复任务的最先进的结果，包括单图像运动去模糊、视频去模糊、离焦去模糊和图像去噪。

# Analysis and Approach

## Test-time Local Converter

为了减少训练和测试不一致并提高模型的测试时的性能，作者提出了一种名为 Test-time Local Converter（TLC）的测试时解决方案。

TLC没有改变训练策略或裁剪图像，而是在推理阶段直接更改特征级别的信息聚合区域范围。

如图1b所示， TLC 将空间信息聚合操作从全局转换为局部， 例如， 特征的每个像素都会在局部聚合其特征。

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1667890663161.png)

# Conclusion

这项工作揭示了由于全局操作的训练-测试不一致，在训练和推断之间的全局信息分布发生了转移，这对恢复模型的性能产生了负面影响。

作者提出了 simple yet test-time 的解决方案，称为 Test-time Local Converter，它取代了从整个空间维度到局部窗口的信息聚合区域，以缓解训练和推断之间的不一致性。

该方法不需要任何再训练或微调，并且提高了模型在各种任务中的性能。

