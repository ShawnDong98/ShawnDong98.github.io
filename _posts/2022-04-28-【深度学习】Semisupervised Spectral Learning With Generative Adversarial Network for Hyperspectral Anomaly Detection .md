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

这篇文章提出了一种基于光谱和空间特征的HSI异常检测框架。

首先，提出了一个基于GAN的模型，以半监督的方式估计背景分布，并通过将训练后的模型应用于所有光谱向量，推断出每个像素表示异常可能性的初始光谱特征。

然后，采用 morphological attribute filter 在空间域中生成初始特征。

最后，采用特征融合技术抑制背景，结合不同方面的互补信息，得到融合检测图。

与知名的HSI异常检测方法进行了比较。

通过对各种真实hsi的实验验证，该方法在定量评价、可视化比较和计算效率方面均优于其他方法。

此外，将所提出的方法推广到实际应用中，并考虑一些更合理的标准来评估异常检测将是今后工作的重点。