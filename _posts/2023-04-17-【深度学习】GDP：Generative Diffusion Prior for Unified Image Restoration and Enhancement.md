---
layout:     post
title:      "【深度学习】GDP：Generative Diffusion Prior for Unified Image Restoration and Enhancement"
subtitle:   ""
date:       2023-04-17
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - Diffusion
    - CVPR 2023
---

# Abstract

现有的图像恢复方法主要利用自然图像的后验分布。


然而，他们通常假设已知的退化，也需要监督训练，这限制了他们对复杂实际应用的适应。在这项工作中，我们提出了生成扩散先验（GDP），以无监督采样方式有效地对后验分布进行建模。

GDP 使用预训练去噪扩散生成模型（DDPM）来解决线性逆、非线性或盲问题。

具体来说，GDP系统地探索了条件引导，其经过验证，比常用的引导方式更实用。

此外，GDP 在去噪过程中优化退化模型参数，实现盲图像恢复的优势。