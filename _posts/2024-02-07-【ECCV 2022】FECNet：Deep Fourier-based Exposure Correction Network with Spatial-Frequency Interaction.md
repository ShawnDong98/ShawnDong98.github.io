---
layout:     post
title:      "【ECCV 2022】FECNet：Deep Fourier-based Exposure Correction Network with Spatial-Frequency Interaction"
subtitle:   ""
date:    2024-02-07  
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - ECCV 2022
    - 
---

# Abstract

在错误曝光条件下捕获的图像不可避免地遭受亮度和结构的混合退化。

大多数现有的基于深度学习的曝光校正方法通常在空间域中分别恢复这些退化。

在本文中，我们提出了一种具有空间频率交互的曝光校正的新视角。

具体而言，我们首先通过傅里叶变换重新审视不同曝光图像的频率特性，其中幅度分量包含大多数亮度信息，相位分量与结构信息相关。

为此，我们提出了一种基于深度傅里叶的曝光校正网络（FECNet），包括一个幅度子网络和一个相位子网络，逐渐重建亮度和结构组件的表示。

为了促进学习这两个表示，我们引入了一个适用于这两个子网络的空间频率交互（SFI）块，它以两种格式互动处理局部空间特征和全局频率信息，以促进互补学习。

大量实验证明，我们的方法在参数较少的情况下取得了比其他方法更优越的结果，并且可以推广到其他图像增强任务，验证了其在广泛应用中的潜力。

