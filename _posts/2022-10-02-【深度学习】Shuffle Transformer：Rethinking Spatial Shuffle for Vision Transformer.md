---
layout:     post
title:      "【深度学习】Shuffle Transformer: Rethinking Spatial Shuffle for Vision Transformer"
subtitle:   ""
date:       2022-10-02
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - Backbone
    - Arxiv 2021
---

# Abstract

最近，基于窗口的 Transformer 在非重叠的局部窗口中计算了自注意力，在图像分类、语义分割和目标检测方面展示了有前景的结果。

然而，对跨窗口连接的研究较少，这是提高表征能力的关键因素。

在这项工作中，作者重新审视了 Spatial Shuffle，将其作为在窗口之间建立连接的有效方法。

因此，作者提出了一种名为 Shuffle Transformer 的新 Vision Transformer，它高效且易于实现， 仅需修改两行代码。

此外，作者还引入了 Depth-wise 卷积，以补充 Spatial Shuffle，以加强邻近窗口连接。

所提出的架构在广泛的视觉任务上实现了出色的性能，包括图像分类、目标检测和语义分割。

# Conclusion

这篇文章提出了用于许多视觉任务的 Shuffle Transformre，从图像级分类到像素级语义/实例分割和目标检测。

为了高效建模，作者使用基于窗口的多头自注意力，该自注意力在非重叠窗口内计算自注意力。

为了建立跨窗口连接，作者将 Spatial Shuffle 引入基于窗口的多头自注意力中。

同时，为了增强邻近窗口连接，作者引入了一个 Depth-wise 卷积层，将残差连接到 Shuffle Transformer 块中。

最后，借助连续的 Shuffle Transformer 块，所提出的 Shuffle Transformer 可以使信息在所有窗口中流动。

广泛的实验表明，作者提出的两种架构都优于其他计算复杂度相似的最先进的视觉 Transformer。