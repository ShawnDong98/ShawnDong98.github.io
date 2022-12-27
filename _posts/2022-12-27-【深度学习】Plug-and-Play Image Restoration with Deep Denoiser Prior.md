---
layout:     post
title:      "【深度学习】Plug-and-Play Image Restoration with Deep Denoiser Prior"
subtitle:   ""
date:       2022-12-27
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     true
tags:
    - 深度学习
    - CVPR 2017
---

# Abstract

最近关于即插即用图像恢复的工作表明，去噪器可以隐式作为基于模型的方法解决许多逆问题的图像先验。

当通过具有大建模能力的深度卷积神经网络（CNN）判别性地学习去噪时，这种特性为即插即用图像恢复带来了相当大的优势（例如，集成了基于模型方法的灵活性和基于学习的方法的有效性）。

然而，尽管更深、更大型的CNN模型正在迅速普及，但由于缺乏合适的去噪器先验，现有的即插即用图像恢复阻碍了其性能。

为了突破即插即用图像恢复的极限，作者通过训练高度灵活和有效的CNN去噪器，先建立了一个基准深度去噪器。

然后，作者将深度去噪器作为模块化部分插入基于  half quadratic splitting 的迭代算法，以解决各种图像恢复问题。

同时，作者对参数设置、中间结果和实验收敛进行了透彻的分析，以更好地了解工作机制。