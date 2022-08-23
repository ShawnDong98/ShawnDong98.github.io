---
layout:     post
title:      "【深度学习】CVF-SID: Cyclic multi-Variate Function for Self-Supervised Image Denoising by Disentangling Noise from Image"
subtitle:   ""
date:       2022-08-23
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - CVPR 2022
---

# Abstract

近年来，大规模数据集强监督图像去噪技术取得了重要进展。

然而，在实践中，针对每个特定的场景获得对齐的 noisy-clean 训练图像对是复杂和昂贵的。

因此，将传统的监督去噪网络应用于自然图像噪声输入并不是直接的。

尽管一些研究在没有强监督的情况下对这个问题提出了挑战，但它们依赖于较不实用的假设，不能直接应用于实际情况。

为了解决上述挑战，作者提出了一种新的强大的自监督去噪方法CVF-SID，该方法基于Cyclic multi-Variate Function(CVF)模块和self-supervised image disentangling(SID)框架。

CVF模块可以输出多个被分解的输入变量，并以循环的方式将输出的组合作为输入。

CVF-SID可以通过利用各种自监督的损失项，从输入中分离出清晰的图像和噪声映射。

与几种只考虑信号无关噪声模型的方法不同，作者还处理了现实应用中信号相关的噪声组件。

此外，该方法不依赖任何关于潜在噪声分布的先验假设，使CVF-SID更适用于现实噪声。

# Conclusion

这篇文章提出了一种新的 cyclic multi-variate function CVF，该函数在循环过程下对输入进行分解。

然后，作者利用CVF来设计自监督 CVF-SID 去噪框架，其目的是学习CNN从真实世界的噪声sRGB输入中解耦不独立信号噪声、独立信号噪声 和 清晰的图像。

该方法不依赖于任何关于噪声分布的先验信息，因此比以往的自监督去噪方法更具一般性。

大量的研究表明，该计算方法与其他计算方法相比有一些优点和优势。

一个仍然存在的限制是，框架中有一个固定的 correlation parameter $\gamma$ ，而在现实世界中不同的图像的相关性可能会不同。

这导致了次优分解，如图7中的一些示例所示，其中图像和依赖信号的噪声项之间几乎没有相关性。