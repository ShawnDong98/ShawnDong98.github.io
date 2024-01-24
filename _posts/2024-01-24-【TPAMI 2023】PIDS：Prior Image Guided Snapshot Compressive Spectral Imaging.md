---
layout:     post
title:      "【TPAMI 2023】PIDS：Prior Image Guided Snapshot Compressive Spectral Imaging"
subtitle:   ""
date:       2024-01-24
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - TPAMI 2023
    - 深度学习
---

# Abstract

具有丰富空间和光谱信息的光谱图像具有广泛的用途，然而，传统的光谱成像技术无可否认地需要较长时间来捕捉场景。

我们考虑的是“快照光谱光谱仪”的计算成像问题，即编码光圈快照光谱成像（CASSI）系统。为了实现快速和通用的重建算法，我们提出了一种基于先验图像引导的快照压缩成像方法。

通常，先验图像指的是双摄像头CASSI系统的附加未编码泛光相机捕捉的RGB测量。

我们认为RGB图像作为先验图像可以提供有价值的语义信息。

更重要的是，我们设计了先验图像语义相似性（PIDS）正则化项，以增强重建的光谱图像保真度。

特别是，PIDS被公式化为先验图像的总变差与恢复的光谱图像之间的差异。

然后，我们通过交替方向乘法器（ADMM）优化算法解决了PIDS正则化重建问题。

对各种数据集的全面实验表明了我们方法的卓越性能。