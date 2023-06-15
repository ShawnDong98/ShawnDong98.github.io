---
layout:     post
title:      "【机器学习】NCSR：Nonlocally Centralized Sparse Representation for Image Restoration"
subtitle:   ""
date:       2023-06-15
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 机器学习
    - TIP 2013
---

# Abstract

稀疏表示模型将图像 patch 编码为从过完备的字典中选择的几个原子的线性组合，它们在各种图像恢复应用中显示出有前景的结果。

然而，由于观测图像的退化（例如，嘈杂、模糊和/或下采样），传统模型的稀疏表示可能不够准确，无法忠实地重建原始图像。

为了提高基于稀疏表示的图像恢复的性能，本文介绍了稀疏编码噪声的概念，图像恢复的目标转向如何抑制稀疏编码噪声。

为此，我们利用图像非局部自相似性来获得原始图像稀疏编码系数的良好估计值，然后将观测到的图像的稀疏编码系数集中到这些估计值。

所谓的非局部集中稀疏表示（NCSR）模型与标准稀疏表示模型一样简单，而我们对各种类型的图像恢复问题的广泛实验，包括去噪、去模糊和超分辨率，验证了所提出的NCSR算法的通用性和最新性能。