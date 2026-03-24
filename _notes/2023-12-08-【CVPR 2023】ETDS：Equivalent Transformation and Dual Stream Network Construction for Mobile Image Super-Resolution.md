---
layout:     post
title:      "【CVPR 2023】ETDS：Equivalent Transformation and Dual Stream Network Construction for Mobile Image Super-Resolution"
subtitle:   ""
date:       2023-12-08
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - CVPR 2023
    - 深度学习
---

# Abstract

近年来，移动设备上对实时超分辨率网络的需求日益增加。

为了解决这一问题，已经提出了许多轻量级超分辨率模型。

然而，这些模型仍然包含耗时的组件，增加了推理延迟，限制了它们在移动设备上的实际应用。

在本文中，我们提出了一种基于等效变换和双流网络构造（ETDS）的单图像超分辨率新模型。

ET方法被提出用于将耗时的操作转换成适合移动设备的时间友好操作，如卷积和ReLU。

然后设计双流网络，以减少由于使用ET而产生的冗余参数，并增强特征提取能力。

充分利用ET的进步和双流网络结构，我们为移动设备开发了高效的SR模型ETDS。

实验结果表明，与之前的轻量级移动设备SR方法相比，我们的ETDS在推理速度和重建质量方面都有显著优势。