---
layout:     post
title:      "【深度学习】HDNet：High-resolution Dual-domain Learning for Spectral Compressive Imaging "
subtitle:   ""
date:      2022-06-25 
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - HSI
---

# Abstract
深度学习的快速发展为高光谱图像的端到端重建提供了更好的解决方案。

然而，现有的基于学习的方法有两个主要缺陷。

首先，自注意力的网络通常会牺牲内部分辨率来平衡模型性能和复杂性，失去细粒度的高分辨率(HR)特征。

其次，即使以空间-光谱域学习(SDL)为重点的优化算法收敛到理想解，重构的HSI与真实值之间仍然存在显著的视觉差异。

因此，这篇文章提出了一个高分辨率 dual-domain 学习网络(HDNet)的HSI重建。

一方面，这篇文章提出的HR spatial-spectral attention 模块通过高效的特征融合，提供了连续且精细的像素级特征。

另一方面，在HSI重构中引入频域学习(FDL)来缩小频域差异。

动态的 FDL 监督迫使模型重构细粒度的频率，并补偿像素级损失造成的过度平滑和失真。

在 HDNet 中，HR pixel-level 的注意力和 frequency-level 的 refinement 相互促进HSI感知质量。
# Conclusion

这篇文章提出了一个高分辨率dual-domain 学习网络(HDNet)，包括 spatial-spectral-domain 学习和频率域学习，用于从 compressed measurement 数据重建HSI。

通过高效设计HR空间光谱注意力与特征融合模块，实现了细粒度像素级预测。

为了解决像素级损失造成的视觉差异，首次引入动态调整的频率级监督，以缩小重构的HSI与真实值之间的频域差异。

大量的可视化分析和定量实验证明，HDNet在像素级和频率级HSI重建方面都取得了较好的结果。