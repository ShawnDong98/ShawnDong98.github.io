---
layout:     post
title:      "【深度学习】Denoising Diffusion Models for Plug-and-Play Image Restoration"
subtitle:   ""
date:       2023-06-19
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - CVPRW 2023
---

# Abstract

即插即用图像恢复（IR）已被广泛认为是解决各种逆问题的灵活和可解释的方法，通过使用任何现成的去噪器作为隐式图像先验。

然而，大多数现有方法都专注于判别式高斯去噪器。

尽管扩散模型在高质量图像合成方面表现出令人印象深刻的性能，但将它们作为插即用 IR 方法先验的生成去噪器的潜力仍有待进一步探索。

虽然还进行了几次其他尝试，以采用扩散模型进行图像恢复，但它们要么未能达到令人满意的结果，要么在推断期间通常需要数量不可接受的神经函数评估（NFE）。