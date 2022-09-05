---
layout:     post
title:      "【深度学习】SENet：Squeeze-and-Excitation Networks"
subtitle:   ""
date:       2022-09-05
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - Backbone
    - CVPR 2018
---

# Abstract
卷积神经网络（CNN）的中心组成部分是卷积运算子，它使网络能够通过在每个层的局部感受野中融合空间和通道信息来构建信息特征。

之前的一项广泛研究调查了这种关系的空间组件，试图通过提高整个特征层次结构中空间编码的质量来加强CNN的表示能力。

在这项工作中，作者专注于通道关系，并提出了一个新的架构单元，称之为“Squeeze-and-Excitation”（SE）块，通过显式建模通道之间的相互依存关系，自适应地重新校准通道特征响应。

作者表明，这些块可以堆叠在一起，形成SENet架构，在不同的数据集中非常有效地泛化。

我们进一步证明，SE块以略微的额外计算成本显著提高了现有最先进的CNN的性能。

Squeeze-and-Excitation 网络构成了我们提交ILSVRC 2017分类的基础，该分类获得了第一名，并将 top-5 的错误减少到2.251%，以约25%的相对改进超过了2016年的获胜者。
# Conclusion