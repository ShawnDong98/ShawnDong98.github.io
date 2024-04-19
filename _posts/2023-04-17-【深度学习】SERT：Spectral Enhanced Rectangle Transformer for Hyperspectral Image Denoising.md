---
layout:     post
title:      "【深度学习】SERT：Spectral Enhanced Rectangle Transformer for Hyperspectral Image Denoising"
subtitle:   ""
date:       2023-04-17
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - HSI
    - CVPR 2023
---

# Abstract

去噪是高光谱图像（HSI）应用的关键一步。

尽管见证了深度学习的巨大力量，但现有的 HSI 去噪方法在捕获非局部自相似性方面受到限制。

Transformer 在捕获远程依赖性方面显示出潜力，但很少有人尝试使用专门设计的 Transformer 来模拟 HSI 的空间和光谱相关性。

在本文中，我们通过提出一个 spectral enhanced rectangle Transformer 来解决这些问题，推动它探索HSI的非局部空间相似性和全局光谱 low-rank 属性。

对于前者，我们水平和垂直地利用矩形的自注意力来捕捉空间领域的非局部相似性。

对于后者，我们设计了一个光谱增强模块，该模块能够提取空间光谱立方体的全局 low-rank 属性，以抑制噪声，同时实现非重叠空间矩形之间的交互。

对合成噪声 HSI 和真实噪声 HSI 进行了广泛的实验，显示了提出的方法在客观度量和主观视觉质量方面的有效性。

# Introduction

具有足够光谱信息的高光谱图像（HSIs）相比于RGB图像，能够提供更详细的特征以区分不同材料。因此，HSIs已被广泛应用于人脸识别[37, 38]、植被检测[4]、医学诊断[43]等领域。由于扫描设计[2]和大量波段，各波段中的光子数目受到限制。高光谱图像容易受到各种噪声的影响。除了视觉效果不佳外，这种不受欢迎的退化还会对下游应用产生负面影响。为了获得更好的视觉效果和HSI视觉任务的性能，去噪是HSI分析和处理的基本步骤。

