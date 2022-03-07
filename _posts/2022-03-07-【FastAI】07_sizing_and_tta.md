---
layout:     post
title:      "【FastAI】07_sizing_and_tta"
subtitle:   ""
date:       2022-03-07
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - FastAI
---

# Training a State-of-the-Art Model

本章介绍了训练图像分类模型和获得最新结果的更高级技术。如果您想了解更多关于深度学习的其他应用，并稍后再讨论，您可以跳过它——稍后的章节不会假设对这种材料有了解。

我们将研究什么是规范化，一种称为 mixup 的强大数据增强技术，progressive resizing 方法和测试时间增强。为了展示所有这些，我们将使用ImageNet中名为Imagenette的子集从头开始训练模型（不使用迁移学习）。它包含一个来自原始ImageNet数据集10个不同的类别组成的子集，以便在我们想实验时更快地进行训练。

这比我们之前的数据集要难得多，因为我们使用的是全尺寸、全彩色图像，这些图像是不同大小、不同方向、不同光线等物体的照片。因此，在本章中，我们将介绍一些充分利用数据集的重要技术，特别是当您从头开始训练时，或使用迁移学习在与使用的预训练模型非常不同的数据集上训练模型时。


