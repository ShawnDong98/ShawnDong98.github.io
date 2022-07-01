---
layout:     post
title:      "【深度学习】MixFormer：Mixing Features across Windows and Dimensions "
subtitle:   ""
date:       2022-07-01
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - Backbone
    - 深度学习
---

# Abstract 

局部窗口自注意力在视觉任务中表现突出，但存在感受野有限和建模能力弱的问题。

这主要是因为它在非重叠窗口中执行自注意力，并共享通道维度上的权重。

这篇文章提出 MixFormer 解决该问题。

首先，将局部窗口自注意力与深度卷积并行设计相结合，建跨窗口连接，以扩大感受野。

其次，这篇文章提出跨分支的双向交互，在通道和空间维度上提供互补线索。

这两种设计集成在一起，实现窗口和维度之间的高效特征混合。

MixFormer在图像分类上提供了与 EfficientNet 有竞争力的结果，并显示了比 RegNet 和 Swin Transformer 更好的结果。

# Conclusion

这篇文章提出 MixFormer 作为一种高效的通用视觉 Transformer。

为了解决基于 windows 的 Vision Transformer 中的问题，寻求缓解有限的感受野和通道维度上薄弱的建模能力。

MixFormer 在不移动或变换窗口的情况下有效地扩大了感受野，这要归功于结合局部窗口和深度卷积的并行设计。

这种双向交互提高了局部窗口自注意力和深度卷积在通道和空间维度上的建模能力。

大量实验表明，MixFormer在图像分类和各种下游视觉任务方面优于其他方法。