---
layout:     post
title:      "【深度学习】IR-SDE： Image Restoration with Mean-Reverting Stochastic Differential Equations"
subtitle:   ""
date:       2023-02-14
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - Diffusion
    - Arxiv 2023
---
# Abstract

这篇文章提出了一种用于通用图像恢复的随机微分方程（SDE）方法。

关键结构包括 mean-reverting SDE，将高质量图像转换为对应的退化图像， 其是固定高斯噪声的平均状态。

然后，通过模拟相应的反向时间SDE，我们能够恢复低质量图像的来源，而无需依赖任何特定于任务的先验知识。

关键的是，所提出的均值 mean-reverting SDE 有一个闭式解，允许我们计算真实时间依赖的分数，并通过神经网络学习它。

此外，作者提出了一个最大概率目标来学习最佳反向轨迹，该轨迹稳定了训练并改善了恢复结果。

在实验中，作者证明提出的方法在 image deraining, deblurring, 和 denoising 的定量比较中实现了极具竞争力的性能，为两个去污数据集设置了新的最先进的性能。