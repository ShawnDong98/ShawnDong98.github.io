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


# Conclusion
