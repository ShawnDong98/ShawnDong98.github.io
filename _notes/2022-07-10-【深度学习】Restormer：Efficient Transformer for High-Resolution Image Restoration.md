---
layout:     post
title:      "【深度学习】Restormer：Efficient Transformer for High-Resolution Image Restoration"
subtitle:   ""
date:       2022-07-10
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - CVPR 2022
---

# Abstract
由于卷积神经网络(convolutional neural networks, CNNs)能够很好地从大规模数据中学习广义的图像先验，这些模型被广泛应用于图像恢复和相关任务中。

最近，另一类神经网络结构——Transformers——在自然语言和高级视觉任务上表现显著提高。

虽然 Transformer 模型缓解了CNNs 的缺点(即感受野有限和不适应输入内容)，但其计算复杂度随着空间分辨率的二次增长，因此无法应用于大多数涉及高分辨率图像的图像恢复任务。

在这项工作中提出了一个高效的Transformer模型，通过在构建模块(多头注意和前馈网络)中进行几个关键设计，这样它可以捕捉远程像素交互，同时仍然适用于大图像。

Restormer 在各项任务上取得了 SOTA。
# Conclusion

这篇文章提出了一个图像恢复 Transformer 模型，它可以高效地处理高分辨率图像。

这篇文章引入了 Transformer 块的核心组件的关键设计，以改进特征聚合和变换。

具体来说，multi-Dconv head  transposed Attention(MDTA)模块通过跨通道而不是空间维度应用自注意力来隐式建模全局上下文，因此具有线性复杂度而不是二次方复杂度。

此外，所提出的 gated-Dconv feed-forward 网络(GDFN)引入了一种门控机制来进行受控特征转换。

为了将 CNN 的强度整合到Transformer模型中，MDTA和GDFN模块都包含了 Depthwise 卷积，用于编码空间局部上下文。

在16个基准数据集上的大量实验表明，Restormer在许多图像恢复任务中都达到了最先进的性能。