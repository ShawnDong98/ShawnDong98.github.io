---
layout:     post
title:      "【深度学习】Converting a spectrum to a colour"
subtitle:   ""
date:       2023-05-11
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - HSI
---

本文提供了一个Python脚本，用于将波长光谱映射到颜色的表示形式。

没有独特的方法来做到这一点，但这里使用的公式是基于色彩匹配函数(CIE, colour matching functions)， $x(\lambda), y(\lambda)$ 和 $z(\lambda)$。 这些模型通过映射波长的能量光谱 $P(\lambda)$ 映射为三原色 $X， Y， Z$ 来模拟 “standard observer” 的 chromatic response, 类似于人眼中三种视锥细胞的实际响应。


$$X = \int P(\lambda) x(\lambda)d\lambda$$
$$Y = \int P(\lambda) y(\lambda)d\lambda$$
$$Z = \int P(\lambda)z(\lambda)d\lambda$$





# Reference
1. [Converting a spectrum to a colour](https://scipython.com/blog/converting-a-spectrum-to-a-colour/)