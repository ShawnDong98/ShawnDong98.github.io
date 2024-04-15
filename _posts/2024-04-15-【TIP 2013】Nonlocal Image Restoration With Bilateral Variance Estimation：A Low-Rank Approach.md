---
layout:     post
title:      "【TIP 2013】Nonlocal Image Restoration With Bilateral Variance Estimation：A Low-Rank Approach"
subtitle:   ""
date:      2024-04-15
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - TIP 2013
    - 
---

# Abstract

同时稀疏编码（SSC）或非局部图像表示在各种低级别视觉任务中显示出巨大潜力，导致了几种最先进的图像恢复技术，包括BM3D和LSSC。

然而，它仍然缺乏一个关于为什么SSC是自然图像类别中比传统稀疏编码更好的模型的物理合理解释。

与此同时，稀疏优化问题，特别是与字典学习纠缠在一起时，计算上难以解决。

在本文中，我们采用低秩方法对SSC进行处理，并从双边方差估计的角度提供一个概念简单的解释，即类似打包的 patch 的奇异值分解可以被视为汇集局部和非局部信息以估计信号方差。

这种观点启发我们开发了一种新型的图像恢复算法，称为空间自适应迭代奇异值阈值化（SAIST）。

对于噪声数据，SAIST将著名的BayesShrink从局部模型推广到非局部模型；对于不完整的数据，SAIST通过将字典学习的思想纳入到稀疏优化中，扩展了先前基于确定性退火的解决方案。

除了概念上的简单和计算上的效率，与图像去噪和完成实验中的几种最先进的方法相比，SAIST取得了非常有竞争力（通常更好）的客观性能。

我们的主观质量结果与现有技术相比较有利，特别是在高噪声水平和大量缺失数据的情况下。
