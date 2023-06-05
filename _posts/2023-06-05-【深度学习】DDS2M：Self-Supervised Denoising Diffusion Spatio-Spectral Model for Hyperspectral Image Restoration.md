---
layout:     post
title:      "【深度学习】DDS2M：Self-Supervised Denoising Diffusion Spatio-Spectral Model for Hyperspectral Image Restoration"
subtitle:   ""
date:       2023-06-05
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - Diffusion
---


# Abstract

扩散模型最近引起了人们的极大兴趣，因为它们在图像恢复方面的性能令人印象深刻，特别是在噪声鲁棒性方面。

然而，现有的基于扩散的方法是在大量训练数据上训练的，在分布中表现非常好，但可能很容易受到分布转移的影响。

这对于缺乏数据的高光谱图像（HSI）恢复特别不合适。

为了解决这个问题，这项工作提出了一个用于HSI恢复的自监督扩散模型，即去噪扩散空间光谱模型（DDS2M），该模型的工作原理是在反向扩散过程中推断所提出的变分空间光谱模块（VS2M）的参数，仅使用退化的HSI，没有任何额外的训练数据。