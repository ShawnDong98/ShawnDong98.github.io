---
layout:     post
title:      "【深度学习】S2-TRANSFORMER FOR MASK-AWARE HYPERSPEC- TRAL IMAGE RECONSTRUCTION"
subtitle:   ""
date:       2022-11-08
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - HSI
    - Arxiv 2022
---

# Abstract

高光谱成像（HSI）技术记录远距离分布光谱波长的视觉信息。

具有代表性的高光谱图像采集过程通过编码孔径快照光谱成像仪（CASSI）进行3D到2D编码，并需要软件解码器进行3D信号重建。

基于这种编码过程，两个主要挑战阻碍了高保真重建：

（i）为了获得二维测量，CASSI通过色散棱镜将多个通道位移，并将其压缩到同一空间区域，从而产生耦合的数据丢失。

（ii）物理编码孔径（mask）将通过选择性地阻止像素光照射导致数据丢失。

为了应对这些挑战，这篇文章提出了一种具有 mask-aware 学习策略的 spatial-spectral（$S^2$-）Transformer 结构。

首先，同时利用空间和光谱注意力模型，沿着两个维解耦二维观测中的混合信息。

系统地设计了一系列跨越空间和光谱线索的 Transforemr 结构，其中考虑了双重线索之间的信息相互依赖性。

其次，被 mask 的像素将导致更高的预测难度，应该与未 mask 的像素区别对待。

因此，通过根据 mask-aware 预测推断难度级别，作者考虑利用 mask 结构的损失。

作者所提出的方法不仅在定量上取得新的最先进的结果，而且在结构化区域上也产生了更好的感知质量。


# Conclusion

在这项工作中，作者首先观察到CASSI光学编码过程在数据丢失方面存在双重挑战。

对于第一个挑战，即耦合数据丢失，作者利用高光谱图像背后的特征来更好地解耦二维信号。

作者通过系统地讨论高光谱图像的几种自注意力结构，介绍了 $S^2$ Transformer。

对于另一个挑战，即 mask 数据丢失，考虑到被 mask 的像素更难重建，因此应该通过损失来强调，作者提出对像素重建的难度进行建模。

