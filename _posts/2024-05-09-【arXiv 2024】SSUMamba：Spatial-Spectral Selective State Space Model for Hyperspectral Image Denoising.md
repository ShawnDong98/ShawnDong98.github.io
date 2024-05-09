---
layout:     post
title:      "【arXiv 2024】SSUMamba: Spatial-Spectral Selective State Space Model for Hyperspectral Image Denoising"
subtitle:   ""
date:      2024-05-09
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    -  深度学习
    - arXiv 2024
---

# Abstract

高光谱图像（HSI）去噪是一项关键的预处理过程，因为噪声源自图像内部机制和环境因素。

利用HSI的领域特定知识，如光谱相关性、空间自相似性和空间-光谱相关性，对基于深度学习的去噪至关重要。

现有方法通常受到运行时间、空间复杂度和计算复杂度的限制，采用探索这些先验的单独策略。

虽然这些策略可以避免一些冗余信息，但它们不可避免地忽视了更广泛和更基础的长程空间-光谱信息，这些信息对图像恢复产生积极影响。

本文提出了一种基于空间-光谱选择性状态空间模型的U型网络，称为Spatial-Spectral U-Mamba（SSUMamba），用于高光谱图像去噪。

由于状态空间模型（SSM）计算中的线性空间复杂度，我们可以在模块内获得完整的全局空间-光谱相关性。

我们引入了一种适用于HSI的空间-光谱交替扫描（SSAS）策略，有助于在三维HSI中模拟信息流动。

实验结果表明，我们的方法优于其他方法