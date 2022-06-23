---
layout:     post
title:      "【深度学习】End-to-End Low Cost Compressive Spectral Imaging with Spatial-Spectral Self-Attention "
subtitle:   ""
date:       2022-06-23
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - HSI
    - ECCV 2020
---

# Abstract
编码孔径快照光谱成像(CASSI)是一种获取真实世界三维高光谱图像的有效工具。

虽然已经有一些硬件和算法设计的工作，但这篇文章向低成本的解决方案迈出了一步，享受视频速率高质量的重建。

为了在这一挑战和 under-investigated 的任务上取得坚实的进展，这篇文章重建了一个稳定的 single disperser (SD) CASSI 系统来收集大规模的真实 CASSI 数据，并提出了一种新的深度卷积网络来利用自注意力进行实时重建。

为了共同捕获高光谱图像中不同维度的自注意力(即通道光谱相关性和非局部空间区域)，这篇文章提出了空间光谱自注意力(spatial - spectral self-attention, TSA)，以 order-independent 的方式对每个维度进行处理。

在一个被称为 TSA- Net 的编码器-解码器网络中使用 TSA 来重建所需的 3D cube。

此外，这篇文章研究了噪声对训练结果的影响，并提出在模型训练中加入 shot noise，从而显著提高了真实数据的训练结果。

希望大规模CASSI数据可以作为未来研究的基准，TSA模型可以作为基于深度学习的重建算法的基准。

# Conclusion

