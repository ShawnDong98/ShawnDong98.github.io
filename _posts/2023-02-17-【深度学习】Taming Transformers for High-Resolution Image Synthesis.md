---
layout:     post
title:      "【深度学习】Taming Transformers for High-Resolution Image Synthesis"
subtitle:   ""
date:       2023-02-17
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - CVPR 2021
---

# Abstract

Transformer 旨在学习顺序数据上的远程依赖，其在各种任务上显示最先进的结果。

与CNN不同，它们不包含优先考虑本地交互的归纳偏置。

这使得它们具有表现力，但在高分辨率图像等长序列中计算复杂度过高。

我们展示了如何将CNN的归纳偏置的有效性与 Transformer 的表达性相结合，使他们能够建模并合成高分辨率图像。

我们展示了如何（i）使用CNN学习上下文丰富的图像成分词汇，进而（ii）使用 Transformer 在高分辨率图像中有效地建模其构图。

我们的方法很容易应用于条件合成任务，其中非空间信息（如对象类）和空间信息（如分割）都可以控制生成的图像。

特别是，我们提出了用 Transformer 进行语义引导合成百万像素图像的 SOTA 结果，并在 class-conditional ImageNet 上获得了自回归模型的最新技术。

# Approach

我们的目标是利用 Transformer 模型的学习能力，并将其引入高达百万像素范围的高分辨率图像合成。之前将 Transformer 应用于图像生成的工作为 $64 \times 64$ 像素的图像展示了有希望的结果，但由于计算成本以序列长度的二次方增加，不能简单地扩展到更高的分辨率。高分辨率图像合成需要一个了解图像全局构成的模型，使其能够生成本地真实和全局一致性的模式。因此，我们不是用像素表示图像，而是将其表示为 codebook 中感知丰富的图像成分的组合。通过学习有效的编码，如第 3.1 节所述, 我们可以显著减少构图的 description length，这使我们能够有效地用 Sec3.2 中描述的 Transformer 架构建模它们在图像中的全局相互关系。这种方法如图2所述，能够在无条件和条件设置下生成逼真的和一致的高分辨率图像。

## Learning an Effective Codebook of Image Constituents for Use in Transformers