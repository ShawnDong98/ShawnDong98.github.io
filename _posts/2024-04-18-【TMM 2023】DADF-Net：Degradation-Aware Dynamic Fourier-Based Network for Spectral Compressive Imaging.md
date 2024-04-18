---
layout:     post
title:      "【TMM 2023】DADF-Net：Degradation-Aware Dynamic Fourier-Based Network for Spectral Compressive Imaging"
subtitle:   ""
date:      2024-04-18
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - TMM 2023
    - 
---

# Abstract

我们考虑高光谱图像（HSI）重建问题，旨在从由编码孔径快照光谱成像（CASSI）系统获取的2D压缩HSI测量中恢复3D高光谱数据。

现有的深度学习方法在HSI重建中取得了可接受的结果。

然而，这些方法没有考虑到成像系统的退化模式。

在本文中，基于观察到的通过移动和分割测量获得的初始化HSI，我们提出了一种基于退化学习的动态傅里叶网络，称为退化感知动态傅里叶网络（DADF-Net）。

我们从退化的高光谱图像中估计退化特征图，以实现特征的线性转换和动态处理。

特别地，我们使用傅里叶变换来提取HSI的非局部特征。

大量实验结果表明，所提出的模型在模拟和实际HSI数据集上优于最先进的算法。


# Introduction


在本文中，我们提出了一种称为DADF-Net的退化感知动态傅里叶网络，以解决这些问题。

首先，我们分析了网络输入（初始化HSI）与真实HSI之间的潜在退化模式，然后将退化模式纳入网络架构中。

我们设计了一个估计模块，生成包含输入退化信息的退化特征图。这个退化特征图被用来生成Trans-block所需的逆因子和后续模块的滤波器权重。

其次，我们设计了一个局部增强傅里叶模块（LFB），可以同时提取局部和非局部特征。

与之前的工作不同，该模块使用卷积网络在傅里叶域中提取特征，LFB的非局部分支依赖于在傅里叶域中映射图像卷积操作，并直接学习生成或动态生成滤波器以提取输入在傅里叶域中的非局部特征，然后这些特征通过逆傅里叶变换转换到图像域。

局部分支依赖于卷积网络在图像域中提取局部特征。此外，我们引入了多尺度设计来提高整个网络的性能。所提出的方法实现了最先进的性能。本文的主要贡献总结如下：

- 我们分析了网络输入与真实HSI之间的潜在关系，并基于这种关系设计了一个估计模块和一个Trans模块。估计模块生成一个退化特征图，用于生成Trans模块所需的逆因子和网络中后续模块的动态滤波器权重。
- 我们提出了一个局部增强傅里叶模块，包括局部和非局部分支，以捕获局部和非局部特征。将这些非局部特征与局部分支提取的局部特征结合起来，提高了网络的整体性能。
- 我们引入了一个多尺度设计，包括多尺度特征融合和多尺度重建损失约束。这一设计旨在最小化网络内的信息损失，并增强跨不同尺度的特征处理能力，从而提高重建性能。
- 我们的方法DADF-Net 实现了最先进的定量结果和令人满意的视觉效果。


# Method

## Degradation Analysis

$$
X_{init} = A \odot X + B, \tag{3}
$$

合理地利用深度学习方法生成 inverse scale factor $\bar A$ 和 inverse bias factor $\bar B$  来反转（3）中提到的过程是合理的。因此，近似重建的 HSI 可以表示为：

$$
\bar X = \bar A \odot X_{init} + \bar B.
$$


## Overall Architecture

## Trans-Fourier Block


受（3）和最近的图像超分辨率 [24]，[53] 的启发，如图 3(d) 所示，我们提出了一个 Trans-Fourier 块（TFB），它由一个 estimation block、一个 Trans-block 和一个 dynamic Fourier block 组成。estimation block 用于估计退化特征图，其中包含了输入的退化信息。Trans-block 和后续模块的 filter weight 所需的 inverse factors 是使用退化特征图生成的。


首先，给定特征图 $F \in \mathbb{R}^{w \times h \times c}$, 它通过 estimation block 来生成退化特征图 $K \in \mathbb{R}^{w \times h \times c}$。 estimation block 由一个层规范化， 一个 LFB， 一个层规范化， 一个 conv 3x3, 一个 ReLU 和一个 conv 3x3 组成。 estimation block 中的 LFB 的 filter weight 是通过学习生成的。

然后， $K$ 通过一个 softmax 层和两个并行分支（GenScale 和 GenBias 模块）来生成 inverse scale factor $\hat A \in \mathbb{R}^{w \times h \times c}$ 和 inverse bias factor $\hat B \in \mathbb{R}^{w \times h \times c}$。 经过改善后的特征 $F_{refine} \in \mathbb{R}^{w \times h \times c}$ 可以表示如下：

$$
F_{refine} = \hat A \odot F + \hat B \tag{7}
$$

细节上, GenScale 和 GenBias 模块有相同的结构， 由一个 conv 3x3， 一个激活层， 和一个 conv 3x3 层组成。



