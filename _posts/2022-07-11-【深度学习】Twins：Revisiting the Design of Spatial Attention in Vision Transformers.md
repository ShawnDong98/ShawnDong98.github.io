---
layout:     post
title:      "【深度学习】Twins: Revisiting the Design of Spatial Attention in Vision Transformers"
subtitle:   ""
date:      2022-07-11 
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - NeurIPS 2021
---

# Abstract
最近，人们提出了用于密集预测任务的各种视觉 Transformer 架构，它们表明空间注意力的设计对这些任务的成功至关重要。

这项工作重新审视了空间注意力的设计，并证明了一个精心设计但简单的空间注意力机制优于最先进的方案。

因此，这篇文章提出了两种视觉 Transformer 架构，即 twins-pcpvt和 twins- svt。

提出的架构高效且易于实现，只涉及在现代深度学习框架中高度优化的矩阵乘法。

更重要的是，所提出的架构在广泛的视觉任务上实现了优异的性能，包括图像级别的分类以及密集检测和分割。

简单和强大的性能表明，提出的架构可以作为许多视觉任务的更强大的骨干。


# 
# Twins

这篇文章为视觉 Transofrmer 提出了两种简单而强大的空间设计。第一种方法建立在PVT和CPVT的基础上，只使用全局注意力。该架构因此被称为 Twins-PCPVT。第二种被称为 Twins-SVT，是基于所提出的交叉局部和全局注意力的SSSA。

## Twins-PCPVT 

PVT 引入了金字塔多级设计，以更好地解决密集的预测任务，如目标检测和语义分割。它继承了 ViT 和 DeiT 中设计的绝对位置编码。各层利用全局注意力机制，依靠空间缩减来降低处理整个序列的计算成本。最近提出的基于移动局部窗口的 Swin Transformer， 取得了比 PVT 更好的表现， 其良好性能与有效的大感受野十分相关。



# Conclusion

这篇文章提出了两个强大的视觉 Transformer 主干, Twins-PCPVT 和 Twins-SVT，用于图像级分类和一些下游密集预测任务。

前者探索了在视觉 Transformer 金字塔中的条件位置编码， 确保其在很多视觉任务上提升性能。

在后一种变体中，回顾了当前的注意力设计，提供了一个更有效的注意力范式。

将局部注意力和全局注意力交织在一起可以产生令人印象深刻的结果，而且它具有更高的吞吐量。