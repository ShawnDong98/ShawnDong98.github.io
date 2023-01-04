---
layout:     post
title:      "【深度学习】Sovling Inverse Problems in Medical Imaging with Score-Based Generative Models"
subtitle:   ""
date:       2023-01-04
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - Diffusion
    - ICLR 2022
---

# Abstract

从部分观测重建医学图像是计算机断层扫描（CT）和磁共振成像（MRI）中的一个重要逆问题。

基于机器学习的现有解决方案通常训练一个模型，利用配对图像和观测的训练数据集，将观测结果直接映射到医学图像。

这些观测通常使用观测过程的固定物理模型从图像中合成，这阻碍了模型对未知观测过程的泛化能力。

为了解决这个问题，我们利用最近引入的基于分数的生成模型，提出了一种完全无监督的反向问题解决技术。

具体来说，我们首先在医学图像上训练一个基于分数的生成模型，以捕获其先验分布。

给定观测和测试时观测过程的物理模型，我们引入了一种采样方法来重建与之前和观察到的观测一致的图像。

我们的方法在训练期间不假设固定的观测过程，因此可以在测试时灵活地适应不同的观测过程。

从经验上讲，我们在 CT 和 MRI 的几项医学成像任务中观察到与监督学习技术具有可比或更好的性能，同时对未知观测过程的泛化要好得多。

# Introduction

计算机断层扫描（CT）和磁共振成像（MRI）是医学诊断常用的成像工具。从原始观测（CT的 sinogram 和 MRI 的 k-spaces）重建 CT 和 MRI 图像是众所周知的逆问题。具体来说，CT中的观测是通过从不同方向对物体的X射线投影给出的，MRI中的观测是通过检查具有磁场的物体的傅里叶光谱获得的。然而，由于获得CT的完整 sinogram 会导致患者过度电离辐射，并且测量 MRI 的整个 k-space 非常耗时，因此减少 CT 和 MRI 中的观测次数变得很重要。在许多情况下，只能提供部分观测，例如稀疏视图 sinograms 和下采样 k-spaces。由于这种信息丢失，CT 和 MRI 的逆问题往往是病态的，这使得图像重建特别具有挑战性。

# Sovling Inverse Problems in Medical Imaging with Score-Based Generative Models


