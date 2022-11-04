---
layout:     post
title:      "【深度学习】Conditional DETR for Fast Training Convergence"
subtitle:   ""
date:       2022-11-04
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - Detection
    - ICCV 2021
---

# Abstract

最近开发的 DETR 方法将 Transformer 编码器和解码器架构应用于目标检测，并实现了有前景的性能。在这篇文章中，作者处理一个关键问题，训练收敛缓慢，并提出了加速 DETR 训练的 conditional cross-attention 机制。该方法的动机是，DETR中的交叉注意力高度依赖于  content embeddings 来定位坐标并预测边界框，这增加了对高质量  content embeddings 的需求，从而增加了训练难度。

该方法名为 conditional DETR，从 decoder embedding 中学习一个 conditional spatial query，用于 decoder multi-head cross-attention。好处是，通过 conditional spatial query，每个 cross-attention head 能够处理一个包含不同显著区域的 band，例如一个目标或目标框内的一个区域。这缩小了对目标分类和边界框回归的不同区域进行定位的空间范围，从而放松了对  content embeddings 的依赖，并使训练变得容易。

实验结果表明 conditional DETR 在  back- bones R50 和 R101  上收敛速度快 6.7x, 比更强的 backbones DC5-R50 和 DC5-R101 快 10x。






# Conclusion