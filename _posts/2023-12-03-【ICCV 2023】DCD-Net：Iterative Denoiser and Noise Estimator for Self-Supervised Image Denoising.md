---
layout:     post
title:      "【ICCV 2023】DCD-Net：Iterative Denoiser and Noise Estimator for Self-Supervised Image Denoising"
subtitle:   ""
date:       2023-12-03
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - ICCV 2023
    - 
---

# Abstract

随着强大的深度学习工具的出现，越来越多有效的深度去噪器推动了图像去噪领域的发展。

然而，这些基于学习的方法取得的巨大进步严重依赖于大规模且高质量的噪声/干净训练对，这限制了它们在现实世界场景中的实用性。

为了克服这一点，研究人员一直在探索无需配对数据即可去噪的自监督方法。

然而，缺乏可用的噪声先验和效率低下的特征提取使这些方法的实用性和精度受到影响。

在本文中，我们提出了一种自监督图像去噪流程——Denoise-Corrupt- Denoise pipeline（DCD-Net）。具体来说，我们设计了一种迭代训练策略，该策略迭代优化去噪器和噪声估计器，并仅使用单个噪声图像逐步接近高去噪性能，而无需任何噪声先验。我们提出的自监督图像去噪框架与当前先进方法在广泛使用的合成和真实世界图像去噪基准测试中提供了非常有竞争力的结果。
