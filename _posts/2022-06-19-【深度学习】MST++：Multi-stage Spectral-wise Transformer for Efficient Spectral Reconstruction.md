---
layout:     post
title:      "【深度学习】MST++: Multi-stage Spectral-wise Transformer for Efficient Spectral Reconstruction"
subtitle:   ""
date:       2022-06-19
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - HSI
    - CVPRW 2022
---

# Abstract

现有的光谱重建方法主要集中在设计更深或更宽的卷积神经网络(CNNs)来学习从RGB图像到其高光谱图像(HSI)的端到端映射。

这些基于CNN的方法实现了令人印象深刻的恢复性能，同时显示在捕获远程依赖和自相似性之前的局限性。

为了解决这一问题， 这篇文章提出了一种新的基于 Transformer 的方法，Multi-stage Spectral-wise Transformer (MST ++ )，用于高效的光谱重建。

特别地，这篇文章采用了基于 HSI 空间稀疏而光谱自相似特性的 Spectral-wise Multi-head Self-Attention (S-MSA) 组成基本单元—— Spectral-wise Attention Block(SAB)。


然后，SABs构建 Single-stage Spectral-wise Transformer (SST)，利用 u 形结构提取多分辨率上下文信息。

最后，MST++ 由多个 SST 级联，从粗到细逐步提高重建质量。

综合实验表明，MST++ 明显优于其他先进的方法。在NTIRE 2022光谱重建挑战中，该方法获得了第一名。

# Introduction

解决该问题一种方法是发展一种快照压缩成像(SCI)系统和计算重构算法从 2D 观测恢复 3D HSI 立方体。这些方法依赖于昂贵的硬件设备。为了降低成本，提出了一种基于RGB相机的光谱重建算法，该算法可以对给定的RGB图像进行光谱重建。

传统的SR方法主要基于稀疏编码或相对较浅的学习模型。然而，这些基于模型的方法表征能力有限且泛化能力差。近年来，随着深度学习的发展，SR取得了显著的进步。利用深度卷积神经网络(CNNs)学习RGB图像到HSI立方体的端到端映射函数。尽管已经取得了令人印象深刻的性能，这些基于 CNN 的方法在捕获远程依赖性和谱间自相似性方面显示出局限性。

近年来，自然语言处理 (natural language processing, NLP) 模型 Transformer 被应用于计算机视觉，并取得了很大的成功。直接应用 Transformer  到 SR 有两个主要问题：

1) 全局和局部 Transformer 捕获空间区域之间的交互。 然而 HSI 表征是空间稀疏的且具有谱间的高相似性。
2) 标准全局 MSA 的计算复杂度是空间维度的二次方倍，是难以承受的巨大负担

另一方面，基于窗口的局部MSA 在位置特定窗口中只有有限的感受野。

为了解决上述限制，这篇文章提出了第一个基于 Transformer 的框架，Multi-stage Spectral-wise Transformer (MST++ )，用于从RGB图像高效的光谱重建。

# Conclusion

这篇文章提出了第一个基于 Transformer 用于RGB光谱重构的框架，MST++ 。

基于HSI空间稀疏而光谱自相似的特性，采用S-MSA，将每个光谱特征图作为 self-attention 计算的 token，组成基本单元SAB。然后 SABs 组成 SST。最终，MST++ 被几个 SST 级联。

MST++ 采用多阶段学习方案，从粗到细逐步提高重建质量。

定量和定性实验表明，MST++ 在需要更低的内存和计算成本时大大超过了SOTA方法。

令人印象深刻的是，MST++ 赢得了NTIRE 2022年RGB光谱重建挑战的第一名。