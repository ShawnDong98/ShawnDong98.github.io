---
layout:     post
title:      "【深度学习】Adaptive Nonlocal Sparse Representation for Dual-Camera Compressive Hyperspectral Imaging "
subtitle:   ""
date:       2022-06-16
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - HSI
    - TPAMI 2017
---

# Abstract

利用压缩感知(CS)理论，编码孔径快照光谱成像(CASSI)提供了一种从二维观测中恢复三维高光谱数据的有效解决方案。

CASSI的双摄像头设计，通过添加未编码的全色观测，增强了重建保真度，同时保持快照的优势。

为了提高双摄像头压缩高光谱成像(DCCHI)的性能，这篇文章提出了一种自适应非局部稀疏表示(ANSR)模型。

具体而言，将CS重构问题表述为基于三维立方体的稀疏表示，充分利用空间域和光谱域的非局部相似性。

关键观察是，全色图像除了起到直接观测的作用外，还可以进一步利用全色图像来帮助非局部相似性估计。

因此通过自适应结合高光谱重建图像内部相似度和全色图像外部相似度，设计了一种联合相似度度量。

这样大大提高了CS重构的保真度。仿真和硬件实验结果表明，该方法比现有方法有了明显的改进。


# Conclusion

