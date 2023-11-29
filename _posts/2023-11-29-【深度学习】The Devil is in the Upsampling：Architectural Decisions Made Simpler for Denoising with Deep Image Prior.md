---
layout:     post
title:      "【深度学习】The Devil is in the Upsampling：Architectural Decisions Made Simpler for Denoising with Deep Image Prior"
subtitle:   ""
date:       2023-11-29
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习 
    - ICCV 2023
---

# Abstract

Deep Image Prior（DIP）表明，一些网络架构本质上倾向于在抵抗噪声的同时生成平滑图像，这种现象被称为 Spectrl Bias。

图像去噪是该属性的自然应用。虽然使用DIP消除了对大型训练集的需求，但需要克服两个通常相互交织的实际挑战：结构设计和噪声拟合。