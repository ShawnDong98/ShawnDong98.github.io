---
layout:     post
title:      "【深度学习】A Novel Plug-in Module for Fine-Grained Visual Classification "
subtitle:   ""
date:       2022-03-31
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - 
---

# Abstract

视觉分类可分为粗粒度分类和细粒度分类。

粗粒度的分类表示相似性较小的分类，如猫、狗的分类;细粒度的分类表示相似性较大的分类，如猫、鸟、交通工具的制造商或型号。

与粗粒度视觉分类不同，细粒度视觉分类通常需要专业专家对数据进行标记，这使得数据的成本更高。


为了应对这一挑战，许多方法提出了自动寻找最具判别性的区域，并使用局部特征提供更精确的特征。

这些方法只需要图像级的标注，从而降低了标注的成本。

然而，大多数这些方法需要两个或多个阶段的体系结构，并且不能端到端进行训练。

因此，这篇文章提出了一种新的即插即用的模块，它可以集成到许多常见的骨干网络中，包括基于 cnn 或基于 Transformer 的网络，以提供强区分区域。

# Conclusion