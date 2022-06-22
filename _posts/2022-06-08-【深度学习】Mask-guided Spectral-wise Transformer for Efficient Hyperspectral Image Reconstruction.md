---
layout:     post
title:      "【深度学习】MST：Mask-guided Spectral-wise Transformer for Efficient Hyperspectral Image Reconstruction"
subtitle:   ""
date:       2022-06-08
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags: 
    - 深度学习
    - HSI
    - CVPR 2022
---

# Abstract
高光谱图像重建(HSI)的目的是在编码孔径快照光谱成像(CASSI)系统中，从二维测量数据中恢复三维空间光谱信号。

HSI表征在光谱维度上高度相似和相关。

谱间相互作用的建模有利于HSI的重建。

然而，现有的基于cnn的方法在捕获光谱相似性和长程依赖性方面存在局限性。

此外，在CASSI中，HSI信息通过编码孔径(物理掩模)调制。

然而，目前的算法并没有充分探索 Mask 对 HSI 恢复的引导作用。

这篇文章提出了一种新的框架， Mask-guided 的 Spectral-wise transformer (MST)，用于HSI重建。

具体地说，提出了一种基于光谱的多头自我注意(S-MSA)，它将每个光谱特征视为一个 token ，并沿着光谱维度计算自注意力。

此外，这篇文章定制了 Mask-guided Mechanism(MM)，引导S-MSA关注高保真光谱表示的空间区域。

大量的实验表明，MST在模拟和真实HSI数据集上显著优于最先进的(SOTA)方法，同时需要非常便宜的计算和内存成本。


# Introduction

传统的基于模型的方法采用手工制作的先验，如 sparsity、total variation 和 non-local similarity 来正则化重建过程。

# Conclusion

这篇文章提出了一种高效的基于 Transformer 的框架，MST，用于精确的HSI重建。

受HSI特性的驱动，开发了一个 S-MSA 来捕获光谱间的相似性和依赖性。

此外，定制了一个MM模块，引导S-MSA关注具有高保真HSI表征的空间区域。

利用这些新技术，建立了一系列极其高效的MST模型。

定量实验表明，我们的方法在很大程度上超过了SOTA算法，同时仅需要更少的参数和FLOPS。

定性比较表明，MST实现了视觉上更好的重构HSI。

