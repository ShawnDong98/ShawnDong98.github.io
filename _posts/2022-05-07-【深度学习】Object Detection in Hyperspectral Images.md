---
layout:     post
title:      "【深度学习】Object Detection in Hyperspectral Images"
subtitle:   ""
date:       2022-05-07
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - HSI
---

# Abstract

高光谱图像的高光谱分辨率允许对观测图像中的物体进行检测和分类。

然而，现有的高光谱检测研究主要集中在 pixel-level 研究，部分原因是典型对地观测应用的空间分辨率较低。

随着成像技术的发展，可以获得高空间分辨率的高光谱数据，许多应用需要目标级的检测。

在这项工作中，制定了基于目标的高光谱检测问题，然后根据该问题的具体特点设计了卷积神经网络。

此外，创建了一个包含400多幅高质量图像的高光谱数据集，用于目标级目标检测。

实验结果验证了该框架的有效性，并显示了其优越的性能。

# Conclusion

在本文中，我们阐述了基于目标的高光谱目标检测问题，并提出了一种基于卷积神经网络的方案，该方案通过具体设计解决了高光谱图像数据量大、数据稀缺等特点。

创建了一个带有标记物体的相对大尺度高光谱数据集。

实验结果验证了该框架的有效性，并显示了其潜在的实用价值。