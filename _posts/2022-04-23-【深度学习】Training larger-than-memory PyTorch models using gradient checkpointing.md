---
layout:     post
title:      "【深度学习】Training larger-than-memory PyTorch models using gradient checkpointing"
subtitle:   ""
date:       2022-04-23
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - 
---

在深度学习模型尺寸不断增长的时代，使用尖端技术的主要困难之一是将其加载到GPU上，毕竟，我们不能训练一个不能安装到你的设备上的模型。有各种各样的技术可以改善这个问题; 例如，分布式训练和混合精度训练。

在这篇文章中，我们将介绍另一种技术:  **gradient checkpointing**。简而言之，gradient checkpointing 的工作原理是在反向传播的时间重新计算深度神经网络的中间值(通常在正向传播时间存储)。这权衡了两次为内存重新计算这些值的时间成本和提前存储这些值的带宽成本。

在本文的最后，我们将看到一个示例基准，展示 gradient checkpointing 如何将模型的内存成本降低60%(以增加25%的训练时间为代价)。


# 神经网路是怎样使用显存的？

为了理解 gradient checkpointing 的作用，我们首先需要了解模型内存分配是如何工作的。

一个神经网络所使用的总内存基本上是两个组成部分的总和。

第一部分是模型使用的静态内存。虽然PyTorch模型中内置了一些固定消耗，但成本几乎完全由模型权重决定。目前生产中使用的现代深度学习模型总参数在100万到10亿之间。作为参考，1-1.5亿个参数是带有16gb GPU内存的NVIDIA T4的实际限制。


第二部分是模型的计算图所占用的动态内存。

