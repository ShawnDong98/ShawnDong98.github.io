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

# Conclusion