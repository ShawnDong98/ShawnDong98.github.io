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
    - CVPR 2019
---

# Abstract

Deformable Convolutional 的卓越性能源于其适应物体几何形状变化的能力。

通过检查其自适应行为，作者观察到，虽然其神经特征的空间支持比正常 ConvNets 更符合目标结构，但这种支持可能永远不会远远超出感兴趣的区域，导致特征受到无关图像内容的影响。

为了解决这一问题，作者提出了一种 Deformable ConvNets 的重构方法，通过增加建模能力和更强的训练，提高了它对相关图像区域的聚焦能力。

通过在网络中更全面地集成 deformable convolution，并通过引入扩大形变建模范围的调制机制，提高了建模能力。

为了有效利用增强的建模能力， 作者通道提出的特征引导网络训练，该特征反映目标的重点。

通过提出的贡献，这个新版本的 Deformable ConvNets 比原始模型获得了显著的性能性能收益，并在目标检测和实例分割的 COCO 基准上取得了领先结果。


# Analysis of Deformable ConvNet Behavior

## Spatial Support Visualization

##  Spatial Support of Deformable ConvNets



# More Deformable ConvNets

为了提高网络适应几何变化的能力，作者提出了一些更改，以提高其建模能力，并帮助它利用这种增加的能力。

##  Stacking More Deformable Conv Layers

在观察到 Deformable ConvNets 可以在具有挑战性的基准上有效地建模几何变换的鼓舞下，作者大胆地用Deformable ConvNets 取代更多普通的的 conv 层。



##  Modulated Deformable Modules

为了进一步加强 Deformable ConvNets 操纵空间支持区域的能力，引入了一种调整机制。有了它， Deformable ConvNets 模块不仅可以调整感知输入特征的偏移量，还可以调节来自不同空间位置的输入特征的amplitudes。在极端情况下，模块可以通过将其特征 amplitude 设置为零来决定不感知来自特定位置的信号。相应地，来自相应空间位置的图像内容将大大减少或不会对模块输出产生影响。因此，调整机制为网络模块提供了另一个自由维度来调整其空间支持区域。

给定 $K$ 个采样位置的卷积核，令 $w_k$ 和 $p_k$ 表示对第 $k$ 个位置的权重和偏移量。



# Conclusion

尽管 Deformable ConvNets 在几何变化建模方面具有卓越的性能，但其空间支持远远超出了感兴趣的区域，导致特征受到无关图像内容的影响。

这篇文章介绍了 Deformable ConvNets 的重新表述，通过增加建模能力和更强的训练，提高了其专注于相关图像区域的能力。

在目标检测和实例分割的COCO基准上获得了显著的性能收益。