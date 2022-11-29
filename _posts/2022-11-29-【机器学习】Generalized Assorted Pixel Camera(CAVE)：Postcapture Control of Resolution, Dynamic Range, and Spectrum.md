---
layout:     post
title:      "【机器学习】Generalized Assorted Pixel Camera(CAVE)：Postcapture Control of Resolution, Dynamic Range, and Spectrum"
subtitle:   ""
date:       2022-11-29
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     true
tags:
    - 机器学习
    - HSI
    - TIP 2010
---
# Abstract

作者提出了  generalized assorted pixel（GAP）相机的概念，它使用户能够捕获场景的单个图像，并在事后控制空间分辨率、动态范围和光谱细节之间的权衡。

GAP相机使用复杂的 color filters 阵列（或马赛克）。

使用这种阵列的一个主要问题是，至少一些 filter 类型对捕获的图像采样严重不足。

这导致了具有 strong aliasing 的重建图像。

# Conclusion