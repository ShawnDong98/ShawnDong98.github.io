---
layout:     post
title:      "【深度学习】Deblurring via Stochastic Refinement"
subtitle:   ""
date:       2022-12-08
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     true
tags:
    - 深度学习
    - Diffusion
    - CVPR 2022 
---

# Abstract
图像去模糊是一个病态问题，对给定的输入图像有多个合理的解。

然而，大多数现有方法都会对干净的图像进行确定性估计，并经过训练，以尽量减少像素级失真。

众所周知，这些指标与人类感知关系不佳，并经常导致不真实的重建。

这篇文章提出了一种基于条件扩散模型的盲去模糊替代框架。

与现有技术不同，作者训练了一个随机采样器，该采样器可以细化确定性预测器的输出，并能够为给定的输入生成一套多样化的合理重建。

与多个标准基准的现有最先进方法相比，这大大提高了感知质量。

与典型的扩散模型相比，所提出的预测和细化方法还可以实现更高效的采样。

# Introduction

# Conclusion