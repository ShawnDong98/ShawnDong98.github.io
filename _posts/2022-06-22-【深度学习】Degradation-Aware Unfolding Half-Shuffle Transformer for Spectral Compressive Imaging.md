---
layout:     post
title:      "【深度学习】Degradation-Aware Unfolding Half-Shuffle Transformer for Spectral Compressive Imaging"
subtitle:   ""
date:       2022-06-22
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - HSI
---

# Abstract
在编码孔径快照光谱压缩成像(CASSI)系统中，采用高光谱图像重建(HSI)方法从 compressed measurement 数据中恢复空间光谱信号。

在这些算法中，deep unfolding 方法表现出良好的性能，但存在两个问题。

首先，它们没有从高度相关的CASSI 中估计退化模式和病态程度来指导迭代学习。

其次， 它们主要使用基于 CNN 的方法， 在捕获长程依赖时表现出局限性。

这篇文章提出了一个 principled Degradation-Aware Unfolding 框架(DAUF)，从 compressed image 和 physical mask 估计参数，然后使用这些参数来控制每次迭代。

此外，这篇文章还定制了一种新的 Half-Shuffle Transformer (HST)，它可以同时捕获 local contents 和 non-local dependencies。

# Conclusion
