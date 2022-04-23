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


第二部分是模型的计算图所占用的动态内存。每次以训练模式通过神经网络，计算网络中每个神经元的激活; 然后，这个值存储在计算图中。必须为一批数据中的每个训练样本存储一个值，因此增加的非常迅速。总成本由模型大小和批量大小决定，并设置将适合GPU内存的最大批量大小的限制。

# gradient checkpointing 如何帮助？

大型模型在静态和动态方面都很昂贵。它们一开始很难适应GPU，一旦你把它们放到设备上，就很难训练，因为它们因为批量大小太小而无法收敛。

存在各种技术来改善其中一个或两个问题。 gradient checkpointing 就是这样一种技术。 

**Gradient checkpointing** 通过从计算图中省略一些激活值来工作。这减少了计算图所使用的内存，总体上降低了内存压力(并允许进程中使用更大的批处理大小)。

然而，存储激活的原因是在反向传播期间计算梯度时需要它们。在计算图中忽略它们会迫使PyTorch在它们出现的地方重新计算这些值，从而整体降低计算速度。

因此， gradient checkpointing  是计算机科学中存在于内存和计算之间的权衡的一个经典例子。

`torch.utils.checkpoint.checkpoint` 和 `torch.utils.checkpoint.checkpoint_sequential` 提供 gradient checkpointing，它实现了如下特性(根据文档中的注释)。在前向传播期间，PyTorch将输入元组保存给模型中的每个函数。在反向传播过程中，以即时的方式为每个函数重新计算输入元组和函数的组合，将其插入到需要它的每个函数的梯度公式中，然后丢弃。其净计算成本大致相当于每个样本在模型中向前传播两次的计算成本。

Gradient checkpointing 首次发表于2016年的论文 "Training Deep Nets With Sublinear Memory Cost"。 这篇文章声称 gradient checkpointing 算法将模型的动态内存开销 从O(n)(其中n是模型中的层数 )降低到O(sqrt(n))，并通过将一个 ImageNet 变体从 48GB 显存压缩到 7GB 的显存实验证明了这一点。