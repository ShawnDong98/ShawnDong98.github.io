---
layout:     post
title:      "【arXiv 2023】RCG：Self-conditioned Image Generation via Generating Representations"
subtitle:   ""
date:       2023-12-17
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - arXiv 2023
---

# Abstract

本文介绍了表示条件图像生成（RCG），这是一个简单而有效的图像生成框架，为类别非条件图像生成设定了新的基准。

RCG不依赖任何人类标注，而是基于自监督表示分布进行条件设定，该分布通过预训练的编码器从图像分布映射得到。

在生成过程中，RCG使用表示扩散模型（RDM）从这种表示分布中采样，并采用像素生成器根据采样的表示来精制图像像素。

这样的设计在生成过程中提供了实质性的指导，从而实现了高质量的图像生成。

在ImageNet 256×256上测试，RCG实现了3.31的Frechet Inception Distance（FID）和253.4的Inception Score（IS）。

这些结果不仅显著提升了类别非条件图像生成的最新水平，而且与当前领先的类别条件图像生成方法相媲美，弥合了这两项任务之间长期存在的性能差距。