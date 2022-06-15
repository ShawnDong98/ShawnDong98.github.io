---
layout:     post
title: 【深度学习】High-Speed Hyperspectral Video Acquisition By Combining Nyquist and Compressive Sampling
subtitle:   ""
date:       2022-06-15
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - HSI
    - TPAMI
---

# Abstract

这篇文章提出了一种新的混合成像系统，以获得高空间和光谱分辨率的4D高速高光谱(HSHS)视频。

该系统由两个分支组成:一个分支在时间维度上进行奈奎斯特采样，同时集成整个频谱，得到高帧率的全色视频;另一个分支在长曝光的光谱维度上进行压缩采样，从而产生低帧率的高光谱视频。

由于高光吞吐量和互补采样，这两个分支共同为恢复底层HSHS视频提供了可靠的观测。

此外，全色视频可以用来学习一个 over-complete 的3D字典，以稀疏地表示每个波段视频，这得益于光谱维的固有结构相似性。

在联合观测和自适应字典的基础上，进一步提出了一种 simultaneous spectral sparse(3S) 模型来增强不同波段的结构相似性，并开发了一种高效的计算重建算法来恢复HSHS视频。

# Conclusion and Discussion