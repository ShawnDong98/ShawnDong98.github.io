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