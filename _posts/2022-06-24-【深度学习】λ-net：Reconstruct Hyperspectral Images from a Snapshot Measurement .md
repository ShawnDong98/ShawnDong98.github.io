---
layout:     post
title:      "【深度学习】λ-net：Reconstruct Hyperspectral Images from a Snapshot Measurement "
subtitle:   ""
date:       2022-06-24
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - HSI
    - ICCV 2019
---

# Abstract

这篇文章提出了λ-net，它可以从单个 measurement 中重建高光谱图像(例如，24个光谱通道)。

该任务通常被称为快照压缩光谱成像(SCI)，它具有低成本、低带宽和高速传感速率，利用二维快照对三维(3D)信号即(x, y， λ)进行捕获。

SCI虽然已有十多年的历史，但重构算法的质量较差、速度较慢，阻碍了其广泛应用。

为了解决这一问题，这篇文章开发了一个两阶段生成模型来重建SCI中所需的三维信号，称为λ-Net。

仿真和真实数据集的结果都表明，λ-net具有显著的优势，与目前最先进的技术相比，其在仿真数据上的PSNR提高了>4dB。

此外，λ-net 可以在 sub-seconds 内完成重建任务，而不是最近提出的 DeSCI 算法需要数小时，从而使重建速度提高了1000倍。

# Conclusion

