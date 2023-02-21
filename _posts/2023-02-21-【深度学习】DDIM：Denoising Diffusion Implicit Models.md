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