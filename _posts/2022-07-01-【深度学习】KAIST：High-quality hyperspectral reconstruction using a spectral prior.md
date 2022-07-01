---
layout:     post
title:      "【深度学习】KAIST：High-quality hyperspectral reconstruction using a spectral prior"
subtitle:   ""
date:       2022-07-01
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - HSI
    - ACM TOG 2017
---

# Abstract
这篇文章提出了一种新的高光谱图像重建算法，它克服了现有压缩成像方法中长期存在的光谱精度和空间分辨率之间的折衷。

该方法包括两个步骤:首先，从真实的高光谱数据集学习非线性光谱表示; 为此构建了一个卷积自编码器，它允许通过其编码器和解码器网络重构自己的输入。

其次，引入了一种新的优化方法，该方法利用新的保真先验，将学习到的 nonlinear spectral representation 的保真度和梯度在空间域的稀疏性共同正则化。

该技术可以应用于任何现有的压缩成像架构，并已通过模拟和构建原型高光谱成像系统进行了彻底的测试。

它在光谱精度和空间分辨率方面都优于来自每种架构的最先进的方法，同时其计算复杂度相对于稀疏编码技术降低了两个数量级。

此外，这篇文章提出该方法的两个额外的应用: hyperspectral interpolation 和 demosaicing。

最后创建了一个新的高分辨率高光谱数据集，其中包含比现有数据更清晰、光谱种类更多的图像。
# Conclusion

