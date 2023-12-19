---
layout:     post
title:      "【ICCV 2023】DAT：Dual Aggregation Transformer for Image Super-Resolution"
subtitle:   ""
date:       2023-12-19
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - ICCV 2023
    - 深度学习
---

# Abstract

最近，Transformer 在低层视觉任务中获得了显著的流行度，包括图像超分辨率（SR）方面。

这些网络利用自注意力机制（self-attention）沿不同维度，空间或通道，取得了令人印象深刻的表现。

这激发了我们结合 Transformer 中的两个维度，以获得更强大的表征能力的想法。

基于上述思路，我们提出了一种新型 Transformer 模型，Dual Aggregation Transformer（DAT），用于图像SR。

我们的DAT在空间和通道维度上进行特征聚合，在区块间和区块内实现双重方式。

具体而言，我们在连续的 Transformer  Block 中交替应用空间和通道自注意力。

这种交替策略使DAT能够捕获全局上下文并实现区块间特征聚合。

此外，我们提出了自适应交互模块（Adaptive Interaction Module，简称AIM）和空间门控前馈网络（Spatial-Gate Feed-Forward Network，简称SGFN）来实现区块内特征聚合。

AIM补充了两种自注意力机制，分别针对对应的维度。

同时，SGFN在前馈网络中引入了额外的非线性空间信息。广泛的实验表明，我们的DAT超越了当前的方法。