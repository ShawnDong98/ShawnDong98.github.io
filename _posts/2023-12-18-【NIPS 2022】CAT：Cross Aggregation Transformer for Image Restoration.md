---
layout:     post
title:      "【NIPS 2022】CAT：Cross Aggregation Transformer for Image Restoration"
subtitle:   ""
date:       2023-12-18
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - NIPS 2022
    - 深度学习
---

# Abstract

最近， Transformer 架构已被引入图像恢复领域，用以替代卷积神经网络（CNN），并取得了惊人的成果。

考虑到具有全局注意力的 Transformer 的高计算复杂性，一些方法采用局部正方形窗口来限制自注意力的范围。然而，这些方法缺乏不同窗口间的直接交互，这限制了长距离依赖关系的建立。

为了解决上述问题，我们提出了一种新的图像恢复模型，Cross Aggregation Transformer（CAT）。我们CAT的核心是矩形窗口自注意力（Rwin-SA），它在不同的头部并行使用水平和垂直矩形窗口注意力，以扩大注意力区域并跨不同窗口聚合特征。我们还引入了轴向移位操作，用于不同窗口间的交互。此外，我们提出了局部互补模块来补充自注意力机制，将CNN的归纳偏置（例如，平移不变性和局部性）融入 Transformer 中，实现全局-局部耦合。


广泛的实验表明，我们的CAT在多个图像恢复应用中优于最新的先进方法。

