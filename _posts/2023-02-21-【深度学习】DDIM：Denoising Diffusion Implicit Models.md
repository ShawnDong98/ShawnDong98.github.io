---
layout:     post
title:      "【深度学习】DDIM：Denoising Diffusion Implicit Models"
subtitle:   ""
date:       2023-02-21
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - Diffusion
    - ICLR 2021
---

# Abstract

去噪扩散概率模型（DDPM）在没有对抗训练的情况下实现了高质量图像生成，但它们需要模拟马尔可夫链的许多步骤才能生成样本。

为了加速采样，我们提出了去噪扩散隐式模型（DDIM），这是一类更有效的迭代隐式概率模型，其训练过程与DDPM相同。

在DDPM中，生成过程被定义为特定马尔可夫扩散过程的反向。

我们通过一类非马尔科夫扩散过程来推广DDPM，从而实现相同的训练目标。