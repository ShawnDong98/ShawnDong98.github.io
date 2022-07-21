---
layout:     post
title: '【深度学习】GAP-Net: GAP-net for Snapshot Compressive Imaging'
subtitle:   ""
date:       2022-07-20
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - HSI
    - Arxiv 2020
---


# Abstract

Snapshot compressive imaging(SCI)系统旨在利用2D detectors 在单次拍摄中捕捉高维(3D)图像。

SCI设备包括两个主要部分:硬件编码器和软件解码器。

硬件编码器通常包括一个(光学)成像系统，旨在捕捉 compressed measurements。

另一方面，软件解码器指的是一种重建算法，从这些 measurement 中检索所需的高维信号。

这篇文章利用深度展开的思想，提出了一种基于 generalized alternating projection(GAP-Net) 算法的SCI恢复算法——GAP-Net。

在每个阶段，GAP-Net通过一个训练好的卷积神经网络(CNN)来传递它对期望信号的当前估计。

CNN作为去噪器，将估计结果投影回所需的信号空间。

对于采用训练好的基于自编码器的 denoiser 的 gap 网络，作者证明了一个概率的全局收敛结果。

最后，作者研究了 GAP-Net 在解决视频 SCI 和光谱 SCI 问题中的性能。

在这两种情况下，GAP-Net 在合成数据和真实数据上都显示出具有竞争力的表现。

除了具有较高的精度和速度外，作者还展示了GAP-Net 对信号调制的灵活性，这意味着训练好的 GAP-Net 解码器可以应用于不同的系统。

# 

# Conclusion

这篇文章提出了一种用于快照压缩成像的深度展开技术GAP-Net。

GAP-Net是一个统一的框架，可以在理论上保证收敛性的情况下，在视频和光谱SCI上实现最先进的性能。

它可以为两种系统以每秒超过60帧的速度重构空间大小为 256 x 256 的数据。

实验结果表明，GAP-Net可以嵌入到真实的SCI相机中，提供端到端的实时捕获和重构，可以在实际应用中得到广泛应用。