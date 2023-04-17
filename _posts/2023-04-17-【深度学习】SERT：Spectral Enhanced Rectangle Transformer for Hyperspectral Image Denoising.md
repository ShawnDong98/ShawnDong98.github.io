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

对于后者，我们设计了一个光谱增强模块，该模块能够提取空间光谱立方体的全局 low-rank 属性，以抑制噪声，同时实现非重叠空间矩形之间的相互作用。

