---
layout:     post
title:      "【深度学习】λ-net：Reconstruct Hyperspectral Images from a Snapshot Measurement "
subtitle:   ""
date:      

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

这篇文章旨在解决光谱压缩成像中具有挑战性的问题:重构速度慢。受深度学习的最新进展，尤其是新兴的生成模型的启发，这篇文章构建了一个两阶段重建网络，从 snapshot measurement 恢复高光谱图像。

通过将 self-attention GAN 框架集成到 U-net， 可以捕获光谱图像中非局部相似性到网络中， 因此可以提升模型的性能。

这篇文章提出了 hierarchical channel 重构方法，将困难的 channel 重构问题分解为几个简单的任务。

实验结果表明，采用HCR可以进一步提高性能。为了进一步提高重建图像的质量，采用了另一个带有残差学习的小型U-net来细化第一阶段的结果。

通过对各光谱帧进行独立处理，该 U-net 的参数大大降低，易于训练。

由于这个细化阶段，重建图像的质量得到了显著提高。

用压缩光谱相机采集的实际数据验证了所提出的 λ-net。

它不仅达到了比目前的先进水平更好的效果，而且在很短的时间内完成了重建。

利用CASSI相机 和 λ-net，有望建立一个端到端视频速率的3D高光谱成像系统，同时享受低成本和低带宽的好处。
