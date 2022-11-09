---
layout:     post
title:      "【深度学习】Deformable ConvNets v2: More Deformable, Better Results"
subtitle:   ""
date:       2022-11-09
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - Detection
    - 
---

# Abstract

Deformable Convolutional 的卓越性能源于其适应物体几何形状变化的能力。

通过检查其自适应行为，作者观察到，虽然其神经特征的空间支持比正常 ConvNets 更符合目标结构，但这种支持可能永远不会远远超出感兴趣的区域，导致特征受到无关图像内容的影响。

为了解决这一问题，作者提出了一种 Deformable ConvNets 的重构方法，通过增加建模能力和更强的训练，提高了它对相关图像区域的聚焦能力。

通过在网络中更全面地集成 deformable convolution，并通过引入扩大形变建模范围的调制机制，提高了建模能力。