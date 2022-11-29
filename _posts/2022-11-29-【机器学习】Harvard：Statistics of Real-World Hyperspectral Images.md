---
layout:     post
title:      "【机器学习】Harvard：Statistics of Real-World Hyperspectral Images"
subtitle:   ""
date:       2022-11-29
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     true
tags: 'HSI,CVPR 2011'
    - 机器学习
    - HSI
    - CVPR 2011
---
# Abstract

高光谱图像通过在可见光谱中一些波长的窄带中包含每个像素 irradiance measurements，比典型的RGB图像提供更高的光谱分辨率。

额外的光谱分辨率可能对许多视觉任务有用，包括分割、识别和 relighting。

寻求捕获和利用高光谱数据的视觉系统应该受益于自然高光谱图像的统计模型，但目前对其结构知之甚少。

使用新收集的50张室内和室外场景的高光谱图像，作者导出了用于表示高光谱图像小块的优化的“空间光谱基础”，并探索了该基数的统计模型。

# Hyperspectral Image Database

为了对现实世界高光谱场景的联合时空光谱统计进行实证分析，作者使用商用高光谱相机  (Nuance FX, CRI Inc.) 收集了50张户外和室内日光照明图像的数据集。该相机使用集成的液晶可调滤波器，并且能够通过一系列31个波长窄带顺序调谐滤波器来获取高光谱图像，每个波长窄带具有约10纳米带宽，并在420nm到720nm的10nm步长。

# Conclusion