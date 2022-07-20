---
layout:     post
title:      "【深度学习】Tensor FISTA-Net for Real-Time Snapshot Compressive Imaging "
subtitle:   ""
date:       2022-07-20
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - HSI
    - AAAI 2020
---

# Abstract
快照压缩成像(SCI)相机通过将多个视频帧压缩成一个 measurement 帧来捕捉高速视频。

然而，从压缩的 measurement 帧重建视频帧是一个挑战。

现有的最先进的重建算法存在重建质量低或耗时长等问题，不适合实时应用。

这篇文章利用深度神经网络(DNN)强大的学习能力，提出了一种新的张量快速迭代收缩阈值算法网络(Tensor FISTA-Net)作为SCI视频摄像机的解码器。

Tensor FISTA-Net不仅通过卷积层学习视频帧的最稀疏表示，而且通过张量计算显著减少了重构时间。

在合成数据集上的实验结果表明，提出的Tensor FISTA-Net比现有算法的平均PSNR提高了1.63 3.89dB。

此外，Tensor FISTA-Net只需要不到2秒的运行时间和12MB内存占用，使其适用于实时物联网应用。
# Conclusion

