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

作者在这篇文章中做了四个贡献：

1) 作者提出了一种全面的优化方法来得出GAP相机彩 color filters 阵列的空间和光谱布局。

2）作者开发了一种新的算法，用于重新构建图像采样不足的通道，同时最小化 aliasing artifacts。

3）作者演示了用户如何捕获单个图像，然后控制空间分辨率的权衡，以生成各种图像，包括单色、高动态范围（HDR）单色、RGB、HDR RGB和多光谱图像。

4） 最后，GAP相机的性能已经通过广泛的模拟进行了验证，这些模拟使用现实世界场景的多光谱图像。


# Conclusion

这篇文章提出了 generalized assorted pixel 相机的概念。作者开发了一个用于设计GAP相机的一般框架，该框架可以同时捕获扩展的动态范围和更高的光谱分辨率。作者还提出了一种降噪算法，可以减少 aliasing artifacts。仿真结果基于真实的多光谱图像。

