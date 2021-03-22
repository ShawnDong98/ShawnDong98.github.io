---
layout:     post
title:      "【深度学习】BachGAN: High-Resolution Image Synthesis from Salient Object Layout"
subtitle:   ""
date:       2021-03-22
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - GAN
---


![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1616420919836.png)

Figure 1： 第一行：从语义分割图合成的图像。最下一行：从显着对象布局合成的高分辨率图像，它使用户可以通过仅绘制几个边界框来创建图像。

# Abstract

我们针对图像生成的更实际应用提出了一项新任务-通过显着物体布局生成高质量图像。此新设置允许用户仅提供显著对象的布局（即前景边界框和类别），并允许模型使用虚构的背景和匹配的前景完成绘图。这项新任务带来了两个主要挑战：（i）如何在没有分割图输入的情况下生成细粒度的细节和逼真的纹理； （ii）如何创建背景并将其无缝编织到独立对象中。为了解决这个问题，我们提出了背景幻觉生成对抗网络（BachGAN），它首先通过背景检索模块从一个大的候选池中选择一组分割图，然后通过背景融合模块对这些候选布局进行编码，为给定的对象幻觉出一个合适的背景。通过动态生成幻觉背景表示，该模型可以合成具有真实前景和完整背景的高分辨率图像。在Cityscapes和ADE20K数据集上的实验证明了BachGAN方法在生成图像的视觉保真度以及输出图像和输入布局之间的视觉对齐方面优于现有方法。