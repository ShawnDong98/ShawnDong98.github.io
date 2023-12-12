---
layout:     post
title:      "【TCSVT 2019】Fast Parallel Implementation of Dual-Camera Compressive Hyperspectral Imaging System"
subtitle:   ""
date:       2023-12-12
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - TCSVT 2019
    - 深度学习
---

# Abstract

编码孔径快照光谱成像仪（CASSI）提供了一种从单个二维测量中恢复三维高光谱图像（HSI）的潜在解决方案。最新提出的双摄像头压缩高光谱成像仪（DCCHI）设计可以与CASSI同时收集更多信息，以提高重建质量。目前的主要瓶颈在于重建方法的高计算复杂性，这阻碍了其实际应用。在本文中，我们提出了一种基于DCCHI的快速并行实现方法，以实现稳定高效的HSI重建。具体而言，我们为重建问题开发了一种新的优化方法，该方法将交替方向乘子法与基于总变分的正则化相结合，以提高收敛速度。然后，为了提高时间效率，我们提出了一种基于GPU的新型并行实现。我们在合成数据和真实数据上验证了所提方法的性能。实验结果表明，我们的方法在时间效率方面具有显著优势，同时保持了可比的重建保真度。