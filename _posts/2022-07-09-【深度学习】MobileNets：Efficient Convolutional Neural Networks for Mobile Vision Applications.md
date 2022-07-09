---
layout:     post
title:      "【深度学习】MobileNets: Efficient Convolutional Neural Networks for Mobile Vision Applications"
subtitle:   ""
date:       2022-07-09
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - HSI
---

# Abstract

这篇提出了一类高效的模型，称为mobilenet，用于移动和嵌入式视觉应用程序。

mobilenet基于流水线型架构，使用深度可分离卷积来构建轻量级的深度神经网络。

这篇文章引入了两个简单的全局超参数，可以有效地权衡延迟和准确性。

这些超参数允许模型构建者根据问题的约束选择合适大小的模型。

在资源和准确性权衡方面进行了大量的实验，与其它的ImageNet分类模型相比，展示出强大的性能。

然后，在广泛的应用和用例中展示了mobilenet的有效性，包括目标检测、细粒度分类、人脸识别和大规模地理定位。

# Conclusion

这篇文章提出了一种新的基于深度可分离卷积的模型体系结构——mobilenets。

这篇文章调研了一些重要的设计决策，从而得到一个有效的模型。

然后，展示了如何使用 width multiplier 和 resolution multiplier 构建更小、更快的mobilenet，通过权衡适当的精度来减少大小和延迟。

然后将不同的mobilenet与表现卓越的流行模型在大小、速度和准确性上进行了比较。

最后，展示了MobileNet应用于各种任务时的有效性。