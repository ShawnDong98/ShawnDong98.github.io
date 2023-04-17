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