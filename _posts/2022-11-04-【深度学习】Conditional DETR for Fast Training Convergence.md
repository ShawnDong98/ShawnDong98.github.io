---
layout:     post
title:      "【深度学习】Conditional DETR for Fast Training Convergence"
subtitle:   ""
date:       2022-11-04
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - Detection
    - ICCV 2021
---

# Abstract

最近开发的 DETR 方法将 Transformer 编码器和解码器架构应用于目标检测，并实现了有前景的性能。

在这篇文章中，作者处理一个关键问题，训练收敛缓慢，并提出了加速 DETR 训练的 conditional cross-attention 机制。

# Conclusion