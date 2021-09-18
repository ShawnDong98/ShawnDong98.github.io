---
layout:     post
title:      "【d2l】Parameter Servers"
subtitle:   ""
date:       2021-09-18
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - d2l
---

当我们从一个GPU移动到多个GPU，然后到包含多个GPU的多个服务器，可能都分散在多个机架和网络交换机上，我们的分布式和并行训练算法需要变得更加复杂。细节很重要，因为不同的连接有非常不同的带宽(比如 NVLink 在合理设置下连接6个设备可以提供 100GB/s带宽， PCIe 4.0(16-lane)提供32 GB/s, 同时高速 100GbE 以太网仅能达到 10GB/s )。同时要求统计学习者是一个网络和系统的专家也是不合理的。


参数服务器的思想在分布式隐变量模型的背景下被提出。


#  Data-Parallel Training

让我们回顾一下分布式训练的数据并行训练方法。下图展示 12.5 节中实现的数据并行的变体。 它的关键在于，在更新的参数被重新广播到所有GPU之前，梯度要聚合在GPU 0上。


![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1631934187482.png)


回想起来，在GPU 0上聚合的决定似乎是特别的。毕竟，我们也可以在CPU上进行聚合。事实上，我们甚至可以决定在一个GPU上聚合一些参数，在另一个GPU上聚合一些参数。只要优化算法支持这一点，我们就没有理由不能这样做。例如，如果我们有四个相关梯度的参数向量 $g_1, ..., g_4$， 我们可以为每个 $g_i$ 聚合梯度到一个GPU上。

