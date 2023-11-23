---
layout:     post
title:      "【深度学习】GMT-Net：Gated Multi-Resolution Transfer Network for Burst Restoration and Enhancement"
subtitle:   ""
date:       2023-11-23
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    -  CVPR 2023
    - 
---

# Abstract

多帧图像处理近年来变得越发流行。然而，这是一项具有挑战性的任务，因为单个连拍图像往往会遭受多重退化，并常常存在彼此之间的不对齐，导致出现鬼影和拉链伪像。现有的连拍图像恢复方法通常没有考虑帧间的相互关联和非局部上下文信息，这限制了这些方法在复杂情况下的表现。另一个关键挑战在于连拍帧的稳健上采样。现有的上采样方法不能有效地同时利用单阶段和逐步上采样策略的优势，这些策略包括传统和/或最新的上采样器。为了应对这些挑战，我们提出了一个新型的门控多分辨率转移网络（GMTNet），它能够从一组低质量的原始连拍图像中重建一个空间精确的高质量图像。GMTNet由三个模块组成，这些模块为连拍处理任务进行了优化：用于特征去噪和对齐的多尺度连拍特征对齐（MBFA）、用于多帧特征聚合的转置注意力特征融合（TAFM）以及用来上扩展融合特征并构建高质量输出图像的分辨率转移特征上采样器（RTFU）。对五个数据集的详细实验分析验证了我们的方法，并且为连拍超分辨率、连拍去噪和低光照连拍增强树立了新的行业标杆。


# Method

## Resolution Transfer Feature Up-sampler

