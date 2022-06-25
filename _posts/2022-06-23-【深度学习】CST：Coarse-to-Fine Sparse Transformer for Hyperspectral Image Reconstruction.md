---
ayout:     post
title:      "【深度学习】CST：Coarse-to-Fine Sparse Transformer for Hyperspectral Image Reconstruction"
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

这篇文章研究了 HSI 重构中的一个关键问题，即如何将 HSI 稀疏性嵌入到基于学习的算法中。

为此，这篇文章提出了一种新的基于 Transformer 的 HSI 恢复方法，命名为 CST。

CST 首先利用 SASM 检测具有HSI 表征的 informative 区域。

然后将检测到的 patch 输入到定制的 SAH-MSA 中，对内容密切相关的空间分散 token 进行聚类，计算MSA。

这种从粗到精的学习模式使 CST 能够更好地感知空间稀疏的 HSI 信息，减少了对 dark uninformative 区域的低效计算，从而提高了模型的成本效益。

大量的定量和定性实验表明，CST显著优于其他SOTA方法，同时需要更低的计算成本。

此外，在真实的HSI重建中，与现有的算法相比，CST产生了更有视觉效果的结果，具有更细粒度的细节和结构内容。