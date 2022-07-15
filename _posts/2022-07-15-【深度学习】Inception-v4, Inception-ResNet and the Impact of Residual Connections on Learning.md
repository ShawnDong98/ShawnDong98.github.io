---
layout:     post
title: '【深度学习】Inception-v4, Inception-ResNet and the Impact of Residual Connections on Learning'
subtitle:   ""
date:       2022-07-15
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - 
---

# Abstract
近年来，深度卷积网络一直是图像识别性能最大进步的核心。

一个例子是Inception体系结构，它已经被证明可以以相对较低的计算成本获得非常好的性能。

最近，在2015年的ILSVRC挑战中，残差连接与更传统的结构相结合，产生了最先进的性能; 它的性能类似于最新一代的Inception-v3网络。

这就提出了这样一个问题:将Inception体系结构与残差连接结合是否有任何好处?

这篇文章的实验表明用残差连接进行训练可以显著加快 Inception 网络的训练。

还有一些证据表明，带有残差连接的Inception网络的性能要比没有残差连接的同样昂贵的Inception网络好一点。

这篇文章还为残差和非残差Inception网络提出了几种新的流线型架构。

这些变化显著提高了ILSVRC 2012分类任务的单帧识别性能。

作者进一步证明了适当的激活缩放如何稳定非常宽的的残差 Inception 网络的训练。

在ImageNet分类(CLS)挑战的测试集上，通过3个残差和1个Inception-v4的集成，实现了3.08%的top-5错误。

# Conclusion

