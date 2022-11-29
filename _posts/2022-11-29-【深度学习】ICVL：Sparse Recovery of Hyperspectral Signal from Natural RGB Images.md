---
layout:     post
title:      "【深度学习】ICVL：Sparse Recovery of Hyperspectral Signal from Natural RGB Images"
subtitle:   ""
date:       2022-11-29
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     true
tags:
    - 深度学习
    - HSI
    -  ECCV 2016
---

# Abstract

高光谱成像是一种重要的视觉模式，具有越来越大的兴趣和应用范围。

然而，后者源于这样一个事实，即现有设备在空间、光谱和/或时间分辨率方面都有限，同时既复杂又昂贵。

作者提出了一种低成本和快速的方法，可以直接从RGB中恢复高质量高光谱图像。

该方法首先利用高光谱先验，以便创建一个稀疏的高光谱签名及其相应的RGB投影词典。

然后，通过后者描述新的RGB图像有助于通过前者重建高光谱图像。

一个新的、比以往更大的高光谱图像数据库作为高光谱先验。

该数据库进一步允许以前所未有的规模评估其方法，并提供给研究界。

该方法快速、准确，尽管使用仅限RGB的输入，但仍提供高分辨率高光谱立方体。

# Conclusion