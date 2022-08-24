---
layout:     post
title:      "【深度学习】DIP：Deep Image Prior"
subtitle:   ""
date:       2022-08-24
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - CVPR 2018
---

# Abstract

深度卷积网络已经成为一种流行的图像生成和恢复工具。一般来说，其优异的性能归功于其从大量样本图像中学习真实图像先验的能力。这篇文章表明， 恰恰相反， 生成器网络的 structure 足够捕获大量 low-level image statistic prior 用以任何学习。为了做到这一点，作者展示了一个随机初始化的神经网络可以作为一个手工制作的先验，在标准的逆问题，如去噪，超分辨率，和着色中有很好的结果。此外， 相同的先验可以用来 invert deep neural representations 来诊断它们， 并且给予 flash-nofalsh 输入对恢复图像。

除了其多样化的应用， 该方法突出了由标准生成器网络架构捕获的归纳偏置。它还弥合了两种非常流行的图像恢复方法之间的差距: 使用深度卷积网络的基于学习的方法和基于手工图像先验(如自相似性)的无学习方法。

# Conclusion
