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