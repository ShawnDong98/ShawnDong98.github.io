---
layout:     post
title:      "【深度学习】Navigating the GAN Parameter Space for Semantic Image Editing"
subtitle:   ""
date:       2021-03-20
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - GAN
---

# Abstract

生成对抗网络（GANs）当前是用于视觉编辑的必不可少的工具，它是图像到图像翻译和图像恢复流程的标准组件。此外，GAN对于可控生成特别有用，因为它们的隐空间包含范围广泛的可解释方向，非常适合于语义编辑操作。通过沿这些方向逐渐更改隐编码，可以产生令人印象深刻的视觉效果，而没有GAN则无法实现。