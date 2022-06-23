---
layout:     post
title:      "【深度学习】Coarse-to-Fine Sparse Transformer for Hyperspectral Image Reconstruction"
subtitle:   ""
date:       2022-06-23
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - HSI
---

# Abstract 

为了解决编码孔径快照光谱成像(CASSI)的反问题，即从二维 compressed measurement 中重构三维高光谱图像(HSIs)，已经开发了许多算法。

近年来，基于学习的方法表现出了良好的性能，并主导了主流研究方向。

然而，现有的基于 CNN 的方法在捕获远程依赖和非局部自相似性方面存在局限性。

以前基于 Transformer 的方法密集采样 token，其中一些 token 没有信息，并计算一些内容不相关的标记之间的多头自注意力(MSA)。

这并不符合HSI信号的空间稀疏特性，并限制了模型的 scalability。

这篇文章提出了一种新的基于 Transformer 的 coarse-to-fine sparse Transformer(CST) 方法，首先将HSI sparsity 嵌入深度学习中进行 HSI 重构。

特别地，CST使用提出的spectral-aware screening mechanism(SASM)进行 coarse patch selecting。

然后，将所选择的 patch 输入到定制的 spectra-aggregation hashing multi-head self-attention(SAH-MSA)中，进行fine pixel clustering 和自相似性捕获。

# Conclusion
