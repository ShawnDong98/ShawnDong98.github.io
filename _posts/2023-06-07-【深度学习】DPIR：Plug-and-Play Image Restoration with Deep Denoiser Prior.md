---
layout:     post
title:      "【深度学习】DPIR：Plug-and-Play Image Restoration with Deep Denoiser Prior"
subtitle:   ""
date:       2023-06-07
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - TPAMI 2021
---

# Abstract

最近关于即插即用图像恢复的工作表明，去噪器可以隐式地作为基于模型的方法解决许多逆问题的先验图像。

当通过具有大建模能力的深度卷积神经网络（CNN）进行判别式学习时，这种属性为即插即用图像恢复带来了相当大的优势（例如，集成了基于模型的方法的灵活性和基于学习的方法的有效性）。

然而，虽然更深和更大的CNN模型正在迅速流行，但由于之前缺乏合适的去噪器先验，现有的即插即用图像恢复阻碍了其性能。