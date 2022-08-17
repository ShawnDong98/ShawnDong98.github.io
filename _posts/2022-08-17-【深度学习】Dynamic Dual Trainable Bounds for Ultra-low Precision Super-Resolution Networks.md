---
layout:     post
title: 【深度学习】Dynamic Dual Trainable Bounds for Ultra-low Precision Super-Resolution Networks
subtitle:   ""
date:      2022-08-17 
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - ECCV  2022
---

# Abstract

轻型超分辨率(SR)模型因其在移动设备中的 serviceability 而受到相当多的关注。

许多工作采用网络量化来压缩SR模型。

然而，当使用低成本的 layer-wise 量化器将SR模型量化到超低精度(例如，2位和3位)时，这些方法的性能会严重下降。

这篇文章确定性能下降是由于 layer-wise 对称量化器和高度不对称激活分布之间的矛盾。

这种差异要么导致量化水平上的浪费，要么导致重建图像的细节丢失。

因此，作者提出了一种新的激活量化器，称为 Dynamic Dual Trainable Bounds(DDTB)，以适应不对称性的激活。

DDTB 的创新点在：

- 一个具有可训练的上下界的 layer-wise quantizer 解决高度不对称的激活
- 一个动态的门控在运行时自适应调整上下界以解决不同样本不同的激活范围

为了减少额外的开销，将动态门控制器量化为2位，并根据引入的 dynamic indensity 只应用于部分SR网络。

大量实验表明，DDTB在超低精度下表现出显著的性能提升。

# Conclusion