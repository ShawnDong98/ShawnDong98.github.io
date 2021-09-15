---
layout:     post
title:      "【d2l】Hardware"
subtitle:   ""
date:       2021-09-15
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - d2l
    - 深度学习
---



构建具有良好性能的系统需要对算法和模型有很好的理解，以捕获统计方面的问题。同时，对底层硬件有一点了解也是必不可少的。一个好的设计可以轻易地产生数量级的影响。 我们将从计算机开始。然后我们将放大更仔细地看CPU和GPU。最后，我们将查看服务器中心或云中的多台计算机是如何连接的。

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1631680358175.png)

# Computers

大多数深度学习研究人员和实践者都可以使用具有相当大内存、计算量、以及一些诸如GPU之类的加速器。 计算机由下列关键部件组成：

- 一个处理器(也称为CPU)，能够执行我们给它的程序(除了运行操作系统和许多其他东西)，通常由8个或更多的核心组成。
- 内存(RAM)，用于存储和检索计算结果，如权重向量和激活，以及训练数据。
- 一个速度从 1 GB/s 到 100 GB/s 的以太网。 
- PCIe (high speed expansion bus)，用于将系统连接到一个或多个GPU。服务器有多达8个加速器，通常以高级拓扑连接，而桌面系统有1或2个，这取决于用户的预算和电源的大小。
- 长期的存储器，如硬盘驱动器，固态驱动器，在很多情况下通过PCIe总线连接。它能有效地向系统传送训练数据，并根据需要储存中间检查点。

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1631680705317.png)

如上图所示， 大部分部件(网络、GPU、存储)通过PCIe总线连接到CPU。 它由多个直接连接到CPU的通道组成。以AMD 线程撕裂者3为例， 他有 64 个 PCIe 4.0 通道，每个通道可以双向传输 16 Gbits/s 的数据。  直接连接到CPU的内存带宽可达到 100 GB/s。

