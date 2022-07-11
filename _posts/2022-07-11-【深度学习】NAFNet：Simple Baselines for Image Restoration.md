---
layout:     post
title:      "【深度学习】NAFNet：Simple Baselines for Image Restoration"
subtitle:   ""
date:       2022-07-11
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - ECCV 2022
---

# Abstract

尽管近年来图像恢复领域取得了长足的进步，但目前最先进的SOTA方法的系统复杂性也在不断增加，这可能会阻碍方法的方便分析和比较。

这篇文章提出了一个简单的基线，它超过了SOTA方法，并在计算上是有效的。

为了进一步简化基线，这篇文章揭示了非线性激活函数，如Sigmoid, ReLU, GELU, Softmax等是不必要的:它们可以用乘法或删除来替代。

因此，从基线推导出一个 Nonlinear Activation Free 网络，即NAFNet。

SOTA结果是在各种具有挑战性的基准上实现的，例如GoPro上33.69 dB PSNR(用于图像去模糊)，仅以8.4%的计算成本超过了之前的SOTA 0.38 dB;在SIDD上40.30 dB的PSNR(用于图像去噪)，超过了之前的SOTA 0.28 dB，计算成本不到它的一半。


# Conclusion

通过对SOTA方法的分解，提取出SOTA的基本组成部分，并在PlainNet 上采用。

得到的基线在图像去噪和图像去模糊任务中达到SOTA性能。

通过分析基线揭示了它可以进一步简化:它中的非线性激活函数可以完全替代或删除。

在此基础上提出了一个 nonlinear activation network， NAFNet。

虽然简化了，但它的性能等于或优于基线。

所提出的基线可能有助于研究人员评估他们的想法。

此外，这项工作有可能影响未来的计算机视觉模型设计，因为证明了非线性激活函数不是实现SOTA性能所必需的。

