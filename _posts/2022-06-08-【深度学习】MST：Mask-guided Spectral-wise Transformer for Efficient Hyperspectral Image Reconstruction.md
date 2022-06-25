---
layout:     post
title:      "【深度学习】MST：Mask-guided Spectral-wise Transformer for Efficient Hyperspectral Image Reconstruction"
subtitle:   ""
date:       2022-06-08
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags: 
    - 深度学习
    - HSI
    - CVPR 2022
---


# Abstract
高光谱图像重建(HSI)的目的是在编码孔径快照光谱成像(CASSI)系统中，从二维测量数据中恢复三维空间光谱信号。

HSI表征在光谱维度上高度相似和相关。

谱间相互作用的建模有利于HSI的重建。

然而，现有的基于cnn的方法在捕获光谱相似性和长程依赖性方面存在局限性。

此外，在CASSI中，HSI信息通过编码孔径(物理掩模)调制。

然而，目前的算法并没有充分探索 Mask 对 HSI 恢复的引导作用。

这篇文章提出了一种新的框架， Mask-guided 的 Spectral-wise transformer (MST)，用于HSI重建。

具体地说，提出了一种基于光谱的多头自我注意(S-MSA)，它将每个光谱特征视为一个 token ，并沿着光谱维度计算自注意力。

此外，这篇文章定制了 Mask-guided Mechanism(MM)，引导S-MSA关注高保真光谱表示的空间区域。

大量的实验表明，MST在模拟和真实HSI数据集上显著优于最先进的(SOTA)方法，同时需要非常便宜的计算和内存成本。


# Introduction

传统的基于模型的方法采用手工制作的先验，如 sparsity、total variation 和 non-local similarity 来正则化重建过程。

近年来随着深度学习的发展， 深度卷积网络使用强大的模型学习端到端地从 2D measurement 到 3D HSI cube 的映射。 尽管基于 CNN 的方法取得了令人印象深刻的结果， 但其在内部相似度和长程依赖建模方面有限制。

此外， 在CASSI中，HSI 是由 physical mask 调制的。以往基于 CNN 的方法主要采用 mask 与 shifted measurement 的内积作为输入。该方法破坏了输入的HSI信息，没有充分发挥 mask 的引导作用，改进有限。

近年来， 自然语言处理中的 Transformer 模型被引入计算机视觉领域， 并且在很多任务上表现超过基于 CNN 的方法。 然而直接应用原始的 Transformer 于 HSI 重构是不合适的。 

第一， 原始的的 Transformer 学会了在空间上捕捉远程依赖关系，但 HSI 的表征在光谱上高度自相似。这种情况下， 光谱间的相似性和相关性没有很好地建模。同时，光谱信息在空间上是稀疏的。捕捉空间相互作用可能不如使用相同资源建模光谱相关性划算。

第二， HSI 表征由 CASSI 系统中的 mask 调制。原始的 Transformer 在计算自注意力时，如果没有足够的引导，很容易注意到许多低保真度和信息较少的图像区域。

第三， 当使用原始的全局Transformer时，计算复杂度是空间大小的二次方倍。而当使用局部基于窗口的 Transformer 时，MSA模块的感受野被限制在特定位置的窗口内，一些高度相关的 token  可能会被忽略。

这篇文章提出一种 Mask-guided Spectral-wise Transformer(MST) 用于 HSI 重构。 

首先， 在图2 (a)中，我们观察到由于特定波长的限制，HSI 的每个光谱通道都捕获了同一场景的一个不完整部分。这表明HSI表征在谱维上是相似和互补的。因此，这篇文章提出了一个 Spectral-wise 的 MSA (S-MSA)来捕获长程光谱间的依赖关系。

其次，在图2 (b)中，在CASSI系统中使用一个 mask 来调制 HSI。mask 上不同位置的透光率差异较大。这表明调制后的光谱信息保真度是位置敏感的。

因此，这篇文章以 mask 为线索，提出了一种新的 mask 引导机制(mask -guided Mechanism, MM)，引导 S-MSA 模块关注具有高保真光谱表示的区域。

这篇文章的贡献总结如下：

- 提出了一种新的HSI重建方法，MST。可能是第一个将 Transformer 用于 HSI 重构的。
- 提出了一种新的 self-attention，S-MSA，以捕获HSI光谱间的相似性和依赖性。
- 定制了一个MM，引导S-MSA关注具有高保真 HSI 表示的区域。
- MST在模拟的所有场景中都显著优于SOTA方法，同时需要更少的参数和 FLOPS。

# Conclusion

这篇文章提出了一种高效的基于 Transformer 的框架，MST，用于精确的HSI重建。

受HSI特性的驱动，开发了一个 S-MSA 来捕获光谱间的相似性和依赖性。

此外，定制了一个MM模块，引导S-MSA关注具有高保真HSI表征的空间区域。

利用这些新技术，建立了一系列极其高效的MST模型。

定量实验表明，我们的方法在很大程度上超过了SOTA算法，同时仅需要更少的参数和FLOPS。

定性比较表明，MST实现了视觉上更好的重构HSI。

