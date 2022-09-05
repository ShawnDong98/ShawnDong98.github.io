---
layout:     post
title:      "【深度学习】DeSCI：Rank Minimization for Snapshot Compressive Imaging"
subtitle:   ""
date:       2022-09-05
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - HSI
    - TPAMI 2019
---


# Abstract

快照压缩成像(Snapshot compression imaging, SCI)是指将多帧图像映射为一次测量的压缩成像系统，视频压缩成像和高光谱压缩成像是两种代表性应用。

虽然高速视频和高光谱图像已经取得了令人振奋的结果，但其较差的重建质量阻碍了SCI的广泛应用。

这篇文章旨在通过利用期望信号中的高维结构来提高SCI的重构质量。

作者建立了一个联合模型，其集成了视频/高光谱帧的非局部自相似性和秩最小方法用于 SCI 感知过程。

在此基础上，提出了一种交替最小化算法来求解该非凸问题。

作者进一步研究了SCI中采样过程的特殊结构，以解决SCI重构中的计算工作量和存储问题。

仿真和真实数据(由四个不同的SCI相机捕获)的结果表明，所提出的算法与目前最先进的算法相比有显著的改进。
# Concluding Remarks

这篇文章提出了一种新的算法，从快照压缩成像系统中的一次测量中重建高速视频帧，以视频和高光谱图像为两个示例应用。 将秩最小方法纳入快照压缩成像系统的前向模型，并提出了一个联合优化问题。