---
layout:     post
title:      "【深度学习】Uformer：A General U-Shaped Transformer for Image Restoration"
subtitle:   ""
date:       2021-11-10
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - 
---

# Abstract

在本文中，我们提出了Uformer，一种有效和高效的基于Transformer的架构，其中我们使用Transformer块构建一个层级编解码器网络来进行图像复原。Uformer有两个核心设计使它适合这个任务。第一个关键元素是 local-enhanced window Transformer 块，我们使用 non-overlapping window-based self-attention 来减少计算需求，并在前馈网络中使用深度卷积来进一步提高其捕获局部上下文的潜力。第二个关键因素是，我们探索了三种  skip-connection 方案，以有效地将信息从编码器传递到解码器。在这两种设计的支持下，Uformer具有很强的用于捕获对图像恢复有用依赖关系的能力。大量的图像恢复实验证明了Uformer在图像去噪、去噪、去模糊和去噪等方面的优越性。

# Introduction

由于消费者和工业相机和智能手机的快速发展，消除图像中的退化的需求不断增长(如噪声、模糊、雨和云纹)。图像复原是计算机视觉中的一个经典问题。最近最先进的方法大多是基于 CNN 的，它们取得了令人印象深刻的结果，但在捕获远程依赖方面存在局限性。为了解决这个问题， 最近的一些研究引入了 self-attention 层，由于 self-attention 计算复杂度是特征图大小的二次方倍， 因此仅在低分辨率的特征图中使用单个或少量的 self-attention 层，。

在本文中，我们的目标是利用特征图在多尺度分辨率下的 self-attention 来恢复更多的图像细节。为了实现这一点，我们提出了Uformer，一种有效和高效的基于 Transformer 的图像复原结构。 Uformer是建立在一个优雅的架构之上，即所谓的“UNet”。我们将卷积层修改为Transformer块，同时保持相同的整体层级编码器-解码器结构和跳跃连接。


# Conclusions

这篇文章我们通过引入 Transformer 块提出一种用于图像复原的可替换结构。 与现有的基于CNN的结构相比， 我们的 Uformer 主要建立在 LeWin Transformer block 上， 它不仅能够处理局部信息而且可以有效地捕获长程依赖。为了探索如何在编码器-解码器结构中实现更好的信息传递，我们进一步研究了 Uformer 中三种不同的  skip-connection 方案，取得了有竞争力的结果。

**Limitation and Broader Impacts.**： 得益于提出的结构， Uformer 在大量的图像复原任务(image denoising, deraining, deblurring, and demoireing)上取得了 SOTA 性能。我们还没有测试过 Uformer 用于更多的视觉任务，如 image-to-image trans-lation ，image super-resolution 等等。同时，我们也注意到滥用图像f复原技术带来的一些负面影响。例如，在监控中恢复的图像可能会导致人的隐私问题。同时，该技术可能会破坏摄像机识别和多媒体版权的原始模式，影响图像取证的真实性。

