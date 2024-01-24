---
layout:     post
title:      "【TIP 2021】Fast Hyperspectral Image Recovery of Dual-Camera Compressive Hyperspectral Imaging via Non-Iterative Subspace-Based Fusion"
subtitle:   ""
date:       2024-01-24
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - TIP 2021
    - 深度学习
---

# Abstract

编码孔径拍摄光谱成像（CASSI）是一种有望用于捕捉三维高光谱图像（HSIs）的技术，该技术使用算法执行从单个编码的二维（2D）测量中进行HSI重建的逆问题。

由于这个问题的不适定性，各种正则化器已被利用来从2D测量中重建3D数据。不幸的是，准确性和计算复杂性都不令人满意。

一个可行的解决方案是利用额外的信息，比如CASSI中的RGB测量。考虑到CASSI和RGB测量的结合，本文提出了一种用于HSI重建的融合模型。具体而言，我们研究了由光谱基和空间系数组成的HSIs的低维光谱子空间特性。

特别是，RGB测量被用于估计系数，而CASSI测量则用于提供光谱基。

我们进一步提出了一种 patch 处理策略，以增强HSIs的光谱低秩特性。

所提出模型的优化既不需要迭代，也不需要RGB探测器的光谱感知矩阵。

在仿真和真实 HSI 数据集上进行的广泛实验证明，我们提出的方法不仅在质量上优于先前的最先进方法（迭代算法），而且重建速度提高了5000多倍。