---
layout:     post
title:      "【深度学习】Score-based diffusion models for accelerated MRI"
subtitle:   ""
date:     2023-04-03  
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - Diffusion
---

# Abstract

基于分数的扩散模型提供了一种使用数据分布的梯度对图像进行建模的强大方法。

利用先前的学习分数函数，在这里我们介绍了一种从给定观测条件分布中采样数据的方法，这样该模型可以很容易地用于解决成像中的逆问题，特别是accelerated MRI。

简而言之，我们训练了一个具有去噪得分匹配的连续时间依赖得分函数。