---
layout:     post
title:      "【深度学习】Mask-guided Spectral-wise Transformer for Efficient Hyperspectral Image Reconstruction"
subtitle:   ""
date:       2022-06-08
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - HSI
---

# Abstract
高光谱图像重建(HSI)的目的是在编码孔径快照光谱成像(CASSI)系统中，从二维测量数据中恢复三维空间光谱信号。

HSI表征在光谱维度上高度相似和相关。

谱间相互作用的建模有利于HSI的重建。

然而，现有的基于cnn的方法在捕获光谱相似性和长程依赖性方面存在局限性。

此外，在CASSI中，HSI信息通过编码孔径(物理掩模)调制。

然而，目前的算法并没有充分探索 Mask 对 HSI 恢复的引导作用。

这篇文章提出了一种新的框架， Mask-guided 的 Spectral-wise transformer (MST)，用于HSI重建。


# Conclusion

