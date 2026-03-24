---
layout:     post
title:      "【深度学习】HYPERSPECTRAL MEASUREMENTS FOR SHIP DETECTION USING AIRBORNE IMAGE DATA"
subtitle:   ""
date:       2022-05-08
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - HSI
---

# Abstract

遥感卫星或机载图像可以帮助在广阔的区域内以高分辨率对船只进行快速监测。

这篇文章研究采用基于 pixel-level 的混合技术对以渔船和游艇为主的海洋船舶进行 airbone 高光谱检测，并采用 objective ellipse 拟合方法估计船舶尺寸。

采用N-FINDR、pixel purity index(PPI)、independent component analysis(ICA)和 vertex component analysis(VCA)等多种高光谱混合算法对 vessels 进行检测。

对 14 种 vessels 的 pixel-based 的检测概率 和 false alarm ratio(FAR) 达到了 96.40% 和 4.30%。

与分辨率为0.10 m的 digital mapping camera(DMC)图像相比，船舶长度和宽度的均方根误差分别约为1.19 m和0.81 m。

# Conclusion

这篇文章利用高光谱传感器进行 airbone observations 和 DMC观测，获得位于朝鲜半岛西海岸港口周围的高光谱图像。

在vessels 检测中， 采用N-FINDR、ICA、PPI和VCA等 pixel-level 的混合光谱技术。


该技术提取了图像上代表每个像素点的4个 endmember spectra，通过与战役现场实验构建的海洋光谱库进行匹配，定量分析了每个 endmember 的相关性。

通过应用这些方法， vessels 检测对于 seawater endmember pixel 达到了 96.40% 的准确率， 并且 accounting for 超过 abundance fraction 的 90%。

此外，所有 endmember abundance fractions 的空间分布还表明，包括甲板和舵轮在内的船舶内部区域具有良好的可靠性。

考虑到 vessels 的形状类似于椭圆，采用椭圆拟合的方法估计了 vessels 的长度和宽度。