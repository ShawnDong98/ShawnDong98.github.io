---
layout:     post
title:      "【深度学习】GFNet：Global Filter Networks for Image Classification"
subtitle:   ""
date:       2022-09-04
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - Backbone
    - NeurIPS 2021
---

# Abstract

近年来在视觉的自注意力和纯多层感知器(MLP)模型方面取得的进展显示出在减少归纳偏置的情况下实现有前景的性能方面的巨大潜力。

这些模型通常基于从原始数据中学习空间位置之间的相互作用。

这篇文章提出了一种概念上简单但计算效率高的全局滤波网络(GFNet)，它学习频率域内具有对数线性复杂度的长程空间相关性。

该架构用三个关键操作取代了视觉 Transformer 中的自注意层:二维离散傅里叶变换、频域特征和可学习的 global filter 之间的元素相乘，以及二维傅里叶反变换。

作者同时在 ImageNet 和 下游任务上展示了模型可喜的 准确率/复杂度权衡

# Conclusion

这篇文章提出了 Global Filter Network(GFNet), 其实一个简单但是计算高效的结构。

该模型将视觉 Transformer 自注意力子层替换为 2D FFT/IFFT 和一组可学习的 global filters。

得益于对数线性复杂度的 token mixing操作，该架构是高效的。