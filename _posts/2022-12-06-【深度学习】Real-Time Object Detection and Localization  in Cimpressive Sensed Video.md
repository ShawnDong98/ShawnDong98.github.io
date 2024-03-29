---
layout:     post
title:      "【深度学习】Real-Time Object Detection and Localization  in Cimpressive Sensed Video"
subtitle:   ""
date:       2022-12-06
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     true
tags:
    - 深度学习
    - ICIP 2021
---

# Abstract

通常，一个1200万像素的CCTV每天生成约7-12GB的数据。

对如此庞大的数据进行逐帧处理需要大量的计算资源。

近年来，压缩感知方法通过减少采样带宽，取得了令人印象深刻的压缩效果。

开发了不同的采样机制，将压缩感知纳入图像和视频采集中。

虽然执行压缩感知的 all-CMOS 传感器相机可以帮助节省大量采样带宽，并最大限度地减少存储视频所需的内存，但传统的信号处理和深度学习模型只能对重建的数据进行操作。

为了实现原始的未压缩域，大多数重建技术都是计算昂贵且耗时的。

为了弥合这一差距，作者提出了一项直接在压缩帧上检测和定位目标的新任务。

因此，减轻了重建帧的需求，并将搜索率降低到20倍（压缩率）。

在GeForce GTX 1080 Ti上运行所提出的模型，实现了46.27% mAP的精度。

还能够在以45.11% mAP在NVIDIA TX2嵌入式板上显示实时推断，从而在准确性、推理时间和内存之间实现最佳平衡。

# Introduction

在信号处理中，压缩感知（CS）是一种强大的感知范式，可以采样稀疏信号，其样本比香农-奈奎斯特采样定理的要求要少得多。Nyquist定理要求数据样本的数量至少与采样信号的维度一样高。图像和视频等真实信号中存在的固有冗余允许对数据进行显著压缩。压缩感知利用了这种固有的冗余，并使采样能够以亚奈奎斯特速率进行。由于通信带宽，通用视频采集系统在空间和时间分辨率之间面临权衡，因此可以在不影响时间分辨率的情况下提供更高空间分辨率的系统需求量很大。这使得压缩感知对于在负担不起高数据带宽的系统中捕获图像和视频非常有用。相同时间的视频所需的采样数量远低于通用成像系统。像素编码是压缩感知的多种方式之一。要从CS帧重建原始帧，需要学习过于完整的字典或使用现有词典（如3D DCT字典）来表示稀疏域中的视频。从CS帧中提取 patch，并使用 Orthogonal Matching Pursuit （OMP）等算法估计字典稀疏域中的相应视频 patch。通常，可以使用像素编码曝光从 5 FPS 视频中重建 100 FPS 视频。为了解决这个问题，作者提出一种新方法，通过直接在压缩帧上执行目标检测来消除重建原始帧的需要。在文献中，作者首次直接在压缩视频上引入了检测和定位的新任务。为此，作者首先探索了传统的现有检测器（用于未压缩视频），并旨在使其适应压缩域。作者进一步提出了一种用于压缩数据的新型目标检测器框架工作，以实现准确性、运行时和存储之间的最佳平衡。

总结贡献如下：

 1） 作者开发了一个压缩框架，作为CS相机模拟器。这个框架可以将任何视频从基于帧的相机压缩到压缩帧。
 
 2） 我们还探索了传统的现有的目标检测器（用于未压缩视频），并旨在使其适应压缩域。作者进一步提出了一种新的压缩数据目标检测框架。
 
 3） 为了从可部署性的角度进一步证实所提议的模型的效率，作者表明该模型能够在嵌入式板上进行实时推断。

