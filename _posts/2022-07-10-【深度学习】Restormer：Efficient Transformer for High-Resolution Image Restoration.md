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
    - CVPR2022
---

# Abstract
由于卷积神经网络(convolutional neural networks, CNNs)能够很好地从大规模数据中学习广义的图像先验，这些模型被广泛应用于图像恢复和相关任务中。

最近，另一类神经网络结构——Transformers——在自然语言和高级视觉任务上表现显著提高。

虽然 Transformer 模型缓解了CNNs 的缺点(即感受野有限和不适应输入内容)，但其计算复杂度随着空间分辨率的二次增长，因此无法应用于大多数涉及高分辨率图像的图像恢复任务。

在这项工作中提出了一个高效的Transformer模型，通过在构建模块(多头注意和前馈网络)中进行几个关键设计，这样它可以捕捉远程像素交互，同时仍然适用于大图像。

Restormer 在各项任务上取得了 SOTA。
# Conclusion

