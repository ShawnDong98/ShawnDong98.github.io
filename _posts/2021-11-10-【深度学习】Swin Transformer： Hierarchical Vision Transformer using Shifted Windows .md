---
layout:     post
title:      "【深度学习】Swin Transformer： Hierarchical Vision Transformer using Shifted Windows "
subtitle:   ""
date:       2021-11-10
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - 
---


# Abstract

将transformer从语言迁移到视觉， 存在一些差异， 比如视觉上尺度与像素的高分辨率。 我们提出一种层级Transformer通过滑动窗口计算表征。 滑动窗口方法在允许跨窗口连接的情况下， 通过限制self-attention对非重叠局部窗口的计算提高了效率。 层级结构使得模型在不同尺度上有灵活性， 并且随着图像尺寸大小增大线性增加计算复杂度。

