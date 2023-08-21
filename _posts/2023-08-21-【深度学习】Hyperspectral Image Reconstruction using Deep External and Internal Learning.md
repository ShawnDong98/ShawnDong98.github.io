---
layout:     post
title:      "【深度学习】Hyperspectral Image Reconstruction using Deep External and Internal Learning"
subtitle:   ""
date:       2023-08-21
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - HSI
    - ICCV 2019
---

# Abstract

为了解决传统高光谱相机经常遭受的低 空间/时间 分辨率问题，编码快照高光谱成像系统最近引起了更多的关注。


从相应的编码图像中恢复高光谱图像（HSI）是一个病态逆问题，学习HSI的准确先验对于解决这个逆问题至关重要。


在本文中，我们提出了一种基于编码HSI重建的高效卷积神经网络（CNN）的方法，该方法从外部数据集中学习深度先验，并且从具有空间光谱约束的输入编码图像学习内部信息。

我们的方法可以有效地利用空间-光谱相关性，并充分表征 HSI 的多样性。

实验结果表明，我们的方法在综合定量度量和感知质量方面都优于最先进的方法。

# Introduction
