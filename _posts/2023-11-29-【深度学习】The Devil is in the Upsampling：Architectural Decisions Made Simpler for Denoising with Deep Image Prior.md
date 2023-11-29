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

由于对结构选择如何影响去噪结果的理解有限，现有的方法要么手工制作，要么从广阔的设计空间寻找合适的结构。

在这项研究中，我们从频率的角度证明，未学习的上采样是 DIP 去噪现象背后的主要驱动力。

这一发现导致了为每张图像确定合适结构的简单策略，而无需费力搜索。

广泛的实验表明，估计的架构实现了优于现有方法的去噪结果，参数减少了95%。

由于这种少的参数量，由此产生的架构不太容易发生噪声拟合。