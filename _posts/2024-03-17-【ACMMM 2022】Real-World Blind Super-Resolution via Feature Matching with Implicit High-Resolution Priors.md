---
layout:     post
title:      "【ACMMM 2022】Real-World Blind Super-Resolution via Feature Matching with Implicit High-Resolution Priors"
subtitle:   ""
date:      2024-03-17
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - ACMMM 2022
    - 
---

# Abstract

真实图像超分辨率（SR）的关键挑战之一是恢复低分辨率（LR）图像中复杂未知退化（例如，降采样、噪声和压缩）中的缺失细节。

大多数先前的工作在图像空间恢复这些缺失细节。为了应对自然图像的高多样性，它们要么依赖于难以训练并且容易产生伪影的不稳定GAN，要么依赖于通常不可用的高分辨率（HR）图像的明确参考。

在这项工作中，我们提出了特征匹配SR（FeMaSR），它在更紧凑的特征空间中恢复了逼真的HR图像。

与图像空间方法不同，我们的FeMaSR通过将扭曲的LR图像特征与我们预训练的HR先验中的无失真HR对应部分进行匹配，并解码匹配的特征以获得逼真的HR图像。

具体而言，我们的HR先验包含一个离散特征码本及其关联的解码器，这些都是使用向量量化生成对抗网络（VQGAN）在HR图像上预训练的。

值得注意的是，我们在VQGAN中加入了一种新颖的语义正则化来提高重建图像的质量。

对于特征匹配，我们首先使用由多个Swin Transformer块组成的LR编码器提取LR特征，然后采用简单的最近邻策略将它们与预训练的码书进行匹配。

特别地，我们为LR编码器配备了到解码器的残差快捷连接，这对于特征匹配损失的优化至关重要，同时也有助于补充可能的特征匹配错误。

实验结果表明，我们的方法比先前的方法产生了更逼真的HR图像。