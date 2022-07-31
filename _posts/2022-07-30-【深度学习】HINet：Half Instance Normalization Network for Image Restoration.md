---
layout:     post
title:      "【深度学习】HINet: Half Instance Normalization Network for Image Restoration"
subtitle:   ""
date:       2022-07-30
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - CVPR 2021
---

# Abstract
这篇文章探讨了 Instance Normalization 在低级视觉任务中的作用。

具体地说，这篇文章提出了一种新的块: Half Instance Normalization Block(HIN Block)，以提高图像恢复网络的性能。

在HIN Block的基础上，作者设计了一个简单而强大的多级网络HINet，它由两个子网络组成。

在HIN Block的帮助下，HINet在各种图像恢复任务上都超越了最先进的方法(SOTA)。


对于图像去噪，在SIDD数据集上的PSNR分别超过0.11dB和0.28 dB，其 multiplier-accumulator operations(MACs)仅为7.5%和30%，速度分别为6.8x 和 2.9x。

对于图像去模糊，在REDS和GoPro数据集上， 性能相当的情况下， 仅使用22.5% macs， 加速 3.3x。

对于图像去雨，在加速 1.4x 的情况下，对多个数据集的平均结果的PSNR超过了0.3 dB。

使用HINet，赢得了NTIRE 2021图像去模糊挑战- Track2的第一名。JPEG Artifacts，PSNR为29.70。

# Conclusion

