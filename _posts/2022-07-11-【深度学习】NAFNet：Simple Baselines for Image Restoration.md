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

# Introduction

随着深度学习的发展，图像恢复方法的性能显著提高。

这些方法虽然性能良好，但系统复杂度较高。为了更清晰地讨论，将系统复杂度分解为两个部分: inter-block 复杂度和 intra-block 复杂度。首先，inter-block 复杂度，如图2所示。[6,24]引入了不同大小的特征图之间的连接。[4,35]是多阶段网络，后一阶段对前一阶段的结果进行细化。第二，inter-block 复杂度，即块内部的各种设计选择。例如[37]中的Multi-Dconv Head Transposed 注意力模块和 Gated Dconv Feed-Forward 网络(如图3a所示)，[21]中的Swin Transformer 块，[4] 中的 HINBlock等等。

基于上述事实，一个自然的问题出现了:具有低 inter 和 intra 复杂度的网络是否可能实现SOTA性能。为了实现第一个条件(低 inter-block 复杂度)，这篇文章采用单级UNet作为体系结构(遵循一些SOTA方法[37,34])，重点关注第二个条件。为此，我们从一个包含最常见组件的 plain block 开始，即 convolution、ReLU 和  shortcut[13]。对于plain block, 我们添加替换掉 SOTA 的组件， 并且验证该组件带来了多少性能的提升。通过广泛的消融研究，提出了一个简单的基线，如图3c所示，它超过了SOTA方法，并且计算效率很高。包含 GELU 和 通道注意力模块(CA) 的基线可以进一步简化: 揭示了基线中的 GELU 可以被视为门控线性单元(GLU)的特殊情况，由此实验证明了它可以被一个简单的门代替，即特征图的 element-wise product。此外，还揭示了CA与GLU在形式上的相似性，并且可以去除CA中的非线性激活函数。总之，简单的基线可以进一步简化为 nonlinear  activation-free 网络，即NAFNet。大量的定量实验证明了所提出的基线的有效性。


![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1657538467626.png)
这篇文章的贡献总结如下：

- 通过分解SOTA方法并提取它们的基本组件，形成了一个系统复杂度较低的基线(如图3c)，它可以超过以前的SOTA方法，并具有较低的计算成本
- 通过揭示门控线性单元到通道注意力(Channel Attention to Gated Linear Unit)之间的联系，通过移除或替换非线性激活函数(如Sigmoid、ReLU和GELU)进一步简化基线，并提出一个 nonlinear activation-free 网络，即NAFNet。

# Conclusion

通过对SOTA方法的分解，提取出SOTA的基本组成部分，并在PlainNet 上采用。

得到的基线在图像去噪和图像去模糊任务中达到SOTA性能。

通过分析基线揭示了它可以进一步简化:它中的非线性激活函数可以完全替代或删除。

在此基础上提出了一个 nonlinear activation network， NAFNet。

虽然简化了，但它的性能等于或优于基线。

所提出的基线可能有助于研究人员评估他们的想法。

此外，这项工作有可能影响未来的计算机视觉模型设计，因为证明了非线性激活函数不是实现SOTA性能所必需的。

