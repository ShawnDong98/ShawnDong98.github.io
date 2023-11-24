---
layout:     post
title:      "【深度学习】SUDF：Spectral Bayesian Uncertainty for Image Super-resolution"
subtitle:   ""
date:       2023-11-24
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - CVPR 2023
---

# Abstract

最近，深度学习技术显著增强了图像超分辨率（SR）。由于黑匣子性质，在使用这些深层SR网络时，量化重建不确定性至关重要。以前SR不确定性估计主要集中在空间领域中捕获像素的不确定性。与图像SR高度相关的频率域中的SR不确定性很少被探索。在本文中，我们建议量化图像SR中的光谱贝叶斯不确定性。为了实现这一目标，首先提出了一个双域学习（DDL）框架。结合贝叶斯方法，DDL模型能够准确估计光谱不确定性，从而能够从每个频域对高频推理进行可靠性评估。