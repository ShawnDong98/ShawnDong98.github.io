---
layout:     post
title:      "【深度学习】Neural Discrete Representation Learning"
subtitle:   ""
date:       2022-04-26
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - 
---

# Abstract

在无监督的情况下学习有用的表示仍然是机器学习的一个关键挑战。

这篇文章提出了一个简单而强大的生成模型来学习这些离散表示。

所提模型叫做矢量量化变分自编码器(VQ-VAE)，在两个关键方面不同于VAEs: 编码器网络输出离散编码，而不是连续编码;先验是学习的，而不是静态的。

为了学习离散隐表征，我们引入了矢量量化(VQ)的思想。

使用VQ方法可以使模型规避 “posterior collapse” 的问题——当与强大的自回归解码器配对时，latents 会被忽略——这通常是在VAE框架中观察到的。

通过使用自回归先验，该模型可以生成高质量的图像、视频和语音，以及高质量的说话者转换和音素的无监督学习，进一步证明了学习表征的效用。