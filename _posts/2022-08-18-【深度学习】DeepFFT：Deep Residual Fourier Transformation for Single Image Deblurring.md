---
layout:     post
title:      "【深度学习】DeepFFT：Deep Residual Fourier Transformation for Single Image Deblurring"
subtitle:   ""
date:       2022-08-18
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - Arxiv 2021
---

# Abstract 

在端到端图像去模糊体系结构中，采用ResBlock是一种常见的做法，它学习模糊和清晰图像对之间的区别。

从模糊图像重建一个清晰的图像需要改变关于低频和高频信息。

传统的ResBlock虽然对图像的高频分量有较好的捕捉能力，但往往忽略了低频信息。

此外，ResBlock通常不能准确地对长距离信息进行建模，而长距离信息在从模糊图像中重建清晰图像时是 non-trivial 的。

这篇文章提出一种带卷积块的残差快速傅里叶变换(Res FFT-Conv Block), 能够同时捕获长程和短程依赖， 同时集成了低频和高频的残差信息。

Res FFT-Conv Block是一个简单但计算效率高，即插即用的块，在不同的架构中带来显著的性能增益。

有了 Res FFT-Conv Block， 作者进一步基于 MIMO-UNet 提出 Deep Residual Fourier Transformation(DeepRFT)  框架， 在 GoPro， HIDE， RealBlur 和 DPDD 数据集上取得了 SOTA 图像去模糊性能。


# Conclusion

这篇文章提出了一种用于图像去模糊的Deep Resual Fourier Transformation(DeepRFT)，其中提出了一种即插即用的残差块，称为 Res FFT-Conv 块，集成了空间和频率残差信息。

Res FFT-Conv Block允许 image-wide 的感受野，能够捕获长程的相互作用。

通过插入 Res FFT-Conv Block 到 MIMO-UNet， DeepRFT 取得了 SOTA 性能。


