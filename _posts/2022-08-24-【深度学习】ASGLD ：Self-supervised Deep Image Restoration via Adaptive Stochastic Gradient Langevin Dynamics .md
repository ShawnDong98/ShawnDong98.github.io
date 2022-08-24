---
layout:     post
title:      "【深度学习】ASGLD ：Self-supervised Deep Image Restoration via Adaptive Stochastic Gradient Langevin Dynamics "
subtitle:   ""
date:       2022-08-24
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - CVPR 2022
---

# Abstract

虽然监督深度学习已经成为解决许多图像恢复问题的突出工具，但人们对研究自监督或无监督方法越来越感兴趣，以解决收集真实图像的挑战和成本。

基于贝叶斯估计的神经网络，这篇文章提出了一种用于一般图像恢复问题的自监督深度学习方法。

neuralized estimator 的关键部分是一种自适应随机梯度 Langevin dynamics 算法，该算法可以有效地采样网络权值的后验分布。

该方法适用于压缩感知和 phase retrieval 两个图像恢复问题。

在这些应用上的实验表明，该方法不仅在图像恢复质量方面优于现有的非学习和无监督解，而且具有更高的计算效率。

# Conclusion