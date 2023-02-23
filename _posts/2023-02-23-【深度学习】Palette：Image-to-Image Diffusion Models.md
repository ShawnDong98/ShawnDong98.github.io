---
layout:     post
title:      "【深度学习】Palette: Image-to-Image Diffusion Models"
subtitle:   ""
date:       2023-02-23
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - Diffusion
    - NIPS 2021
---

# Abstarct

本文开发了一个基于条件扩散模型的图像到图像转换的统一框架，并在四项具有挑战性的图像到图像转换任务上评估了该框架，即着色、绘画、裁剪和JPEG恢复。

我们对图像到图像扩散模型的简单实现在所有任务上都优于强大的 GAN 和回归基线，无需特定于任务的超参数调优、架构定制或任何辅助损失或复杂的新技术。

我们揭示了去噪扩散目标中的 L2 与 L1 损失对样本多样性的影响，并通过实证研究证明了自注意力在神经结构中的重要性。