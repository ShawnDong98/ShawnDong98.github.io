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

我们观察到，最佳 mask 率高达90%（图像上为75%），支持了该比率与数据的信息冗余相关的假设。

高 mask 率会导致大幅加速，例如，>4倍甚至更多。

我们使用 vanilla Vision Transformers 报告了几个具有挑战性的视频数据集的竞争结果。

我们观察到，MAE可以以很大的优势优于监督的预训练。

我们进一步报告了关于现实世界、 uncurated Instagram 数据的令人鼓舞的训练结果。

我们的研究表明，masked autoencoding 的一般框架（BERT [15]、MAE [31] 等）可以成为具有最小领域知识的表示学习的统一方法。