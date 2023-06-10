---
layout:     post
title:      "【深度学习】MAE_ST：Masked Autoencoders As Spatiotemporal Learners"
subtitle:   ""
date:       2023-06-10
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - NIPS 2022
---

# Abstract


这篇文章研究了 Masked Autoencoders （MAE）在概念上简单的扩展，以从视频中学习时空表示。


我们在视频中随机 mask 时空 patch，并学习自编码器以像素重建它们。

有趣的是，我们表明，我们的MAE方法可以学习强大的表示，对时空几乎没有归纳偏置（除了 patch 和位置嵌入），与时空无关的随机 mask 效果最好。