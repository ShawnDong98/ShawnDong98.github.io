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


# Experimental Results

## Experiments With Multispectral Images

作者还使用 tunable filter(VariSpec Liquid Crystal Tunable Filter) 和 cooled CCD 相机 (Apogee Alta U260, 512 x 512 pixels) 捕获了几个静态场景的31波段多光谱图像（400-700纳米，间隔10纳米）。作者捕获了各种物体和材料的多光谱图像，包括纺织品、皮肤、头发、真假水果和蔬菜、糖果、饮料、油漆等。

使用多光谱图像来模拟用GAP马赛克捕获的图像。图11和图12显示了这些以及针对两个不同场景的多模态去马赛克结果。对于这两个场景，单色和RGB图像中饱和片段的纹理和颜色在相配的HDR图像中可见。不出所料，人们可以在HDR单色图像中看到比HDR RGB 图像更多的细节。作者还使用RGB图像和多光谱数据在皮肤检测中进行了实验。图12(h) 显示了使用基于相关关系的简单方法使用RGB图像进行皮肤检测的结果。图12(i)显示了应用于从 GAP 图像计算的多光谱图像的皮肤检测结果[见图12(g)]。请注意，图12中显示的场景包括右侧的真实面孔（皮肤）和左侧相同面孔的照片。如 图12(h) 所示，使用 RGB 图像很难区分这两个面孔（真实和假脸）——基于颜色分析的皮肤检测发现了这两个面孔，尽管其中只有一个是真实的。相比之下，应用于根据GAP图像计算的多光谱图像的皮肤去检测会产生所需的结果——只有真实面孔被发现为其中的像素[见图12(i)]。

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1669708789358.png)
![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1669709209349.png)
# Conclusion

这篇文章提出了 generalized assorted pixel 相机的概念。作者开发了一个用于设计GAP相机的一般框架，该框架可以同时捕获扩展的动态范围和更高的光谱分辨率。作者还提出了一种降噪算法，可以减少 aliasing artifacts。仿真结果基于真实的多光谱图像。


然而，作者的去马赛克算法有一个局限性，即当主通道或次级通道饱和时，不能应用aliasing reduction。我们计划在未来的工作中调查这个问题。作者还在探索GAP传感器的制造。一个有趣的挑战是找到实现具有估计的最佳光谱响应的CFA所需的颜料。
