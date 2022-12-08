---
layout:     post
title:      "【深度学习】DDRM：Denoising Diffusion Restoration Models"
subtitle:   ""
date:       2022-12-08
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     true
tags:
    - 深度学习
    - Diffusion
---

# Abstract

图像恢复中的许多有趣的任务可以转换为线性逆问题。

最近一系列解决这些问题的方法使用随机算法，根据观测结果从自然图像的后验部分布进行采样。

然而，有效的解决方案通常需要特定问题的监督训练来模拟后验，而非特定问题的无监督方法通常依赖于低效的迭代方法。

这项工作通过引入去噪扩散恢复模型（DDRM）来解决这些问题，DDRM是一种高效的、无监督的后验采样方法。