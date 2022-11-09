---
layout:     post
title:      "【深度学习】DCN：Deformable Convolutional Networks"
subtitle:   ""
date:       2022-11-09
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - Detection
    - ICCV 2017
---

# Abstract

由于其构建模块中的固定几何结构，卷积神经网络（CNN）本质上仅限于模拟几何变换。

在这项工作中，作者引入了两个新模块，以提高 CNN 的变换建模能力，即 deformable convolution 和 deformable RoI pooling。

两者都基于使用额外的偏移量来增强模块中的空间采样位置的想法，并在没有额外监督的情况下从目标任务中学习偏移量。

新模块可以很容易地取代现有CNN中的普通模块，并且可以通过标准反向传播轻松端到端训练，从而产生可变形的卷积网络。

大量的实验证明方法的性能。

这篇文章首次表明，在深度CNN中学习密集的空间变换对目标检测和语义语义分割等复杂的视觉任务是有效的。

# Conclusion

