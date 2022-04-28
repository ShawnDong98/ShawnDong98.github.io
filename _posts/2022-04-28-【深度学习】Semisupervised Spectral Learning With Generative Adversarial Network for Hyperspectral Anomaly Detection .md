---
layout:     post
title:      "【深度学习】Semisupervised Spectral Learning With Generative Adversarial Network for Hyperspectral Anomaly Detection "
subtitle:   ""
date:       2022-04-28
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - HSI
---

# Abstract
基于背景分布估计的异常检测方法受非标注高光谱图像中异常光谱向量的限制，常受到异常污染的影响，导致估计精度降低，检测性能下降。

为了解决这一问题，这篇文章提出了一种基于生成对抗网络(GAN)的高光谱异常检测框架的半监督光谱学习(SSL)。

由于GAN具有较强的表征能力和对抗性训练优势，因此它被应用于半监督方式估计背景分布并获得初始光谱特征。

在该框架中，通过morphological attribute filtering 生成初始空间特征。

最后，采用指数约束非线性抑制融合技术抑制背景，结合不同特征中的互补信息得到融合检测图。

提出的异常检测技术在一系列 HSIs 上进行了性能评估。

实验结果表明，该方法的性能优于最新的异常检测方法。
# Conclusion