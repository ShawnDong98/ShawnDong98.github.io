---
layout:     post
title:      "【深度学习】HDNet：High-resolution Dual-domain Learning for Spectral Compressive Imaging "
subtitle:   ""
date:      2022-06-25 
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - HSI
---

# Abstract
深度学习的快速发展为高光谱图像的端到端重建提供了更好的解决方案。

然而，现有的基于学习的方法有两个主要缺陷。

首先，自注意力的网络通常会牺牲内部分辨率来平衡模型性能和复杂性，失去细粒度的高分辨率(HR)特征。

其次，即使以空间-光谱域学习(SDL)为重点的优化算法收敛到理想解，重构的HSI与真实值之间仍然存在显著的视觉差异。

因此，这篇文章提出了一个高分辨率 dual-domain 学习网络(HDNet)的HSI重建。

一方面，这篇文章提出的HR spatial-spectral attention 模块通过高效的特征融合，提供了连续且精细的像素级特征。

另一方面，在HSI重构中引入频域学习(FDL)来缩小频域差异。

动态的 FDL 监督迫使模型重构细粒度的频率，并补偿像素级损失造成的过度平滑和失真。

在 HDNet 中，HR pixel-level 的注意力和 frequency-level 的 refinement 相互促进HSI感知质量。


# Introduction
高光谱图像(HSIs)具有更多的光谱波段，可以捕获更丰富的场景信息和固定波长的成像特性，被广泛用于图像分类、目标检测和跟踪等领域。

使用单个 1D 或 2D 传感器的成像系统需要很长时间来扫描场景中得到 HSI。最近，编码孔径快照光谱成像(CASSI)系统可以实时捕获三维HSI立方体。CASSI 使用编码模板来调制 HSI 信号并将其压缩为一个 2D measurement。 然而，CASSI 系统的一个核心问题是如何从二维压缩图像中恢复出可靠的、良好的底层3D HSI 信号。

传统的方法主要是在HSI结构的手工先验基础上进行正则化重建。但人工调整参数导致通用性差。受深度学习在图像恢复中的成功启发，研究人员开始使用卷积神经网络(CNN)进行HSI重建。一些方法关注空间 HSI 域的自注意力学习，但通常会牺牲特征分辨率来降低非局部注意图的计算复杂度。这些操作不可避免地破坏了光谱的自相关性和信息的连续性。受 high-level 视觉任务中像素级注意力广泛研究的启发，高分辨率(high-resolution, HR)和细粒度的光谱空间注意力对高分辨率视觉任务至关重要。然而，尽管更精细的关注力无疑有利于重构具有丰富光谱波段的HSI图像，但获取具有28个光谱通道的HSI图像的像素级感知远比3通道RGB图像更具挑战性。它需要模型性能和资源成本之间的最佳权衡。


现有基于学习的 HSI 重构方法主要关注 spatial-spectral domain learning(SDL), 其中 spectral representations 在频率域上表现地稀疏。对每个频率的平等处理可能导致次优模式效率。有研究表明，由于CNNs具有固有的归纳偏置，模型倾向于优先拟合容易生成的低频分量，而失去高频分量。图1的频域中可视化重构hsi的频谱。可以看到，即使以往基于SDL的方法收敛到理想解，但这些重建的 HSI 与真实值仍然存在明显的频域差异。TSA-Net失去高频信息，并具有可观察到的棋盘效应。DGSMP 偏离了有限的频率域。focal frequency loss 已被证明在精细频率成分合成中是有效的，但其在HSI重构中缩小频域间隙的潜力仍有待开发。光谱中的每个频率都是HSI中所有像素点的统计和，因此频率级监督可以为全局优化提供新的解决方案。实验表明，频域学习(FDL)可以补偿像素级SDL引起的过度平滑和失真。

基于这些有意义的发现，这篇文章提出了一个高分辨率的双域学习网络，称为HD-Net。dual domain 监督在其 spatial-spectral 域和频率域内发掘模型的表示能力。一方面，在 spatial-spectral 域，将特征分解为 spectral 注意力和 spatial 注意力，并以一种高效的特征融合(EFF)方式将两者联系起来。提出的细粒度像素级注意力避免了高内部分辨率的维度崩溃。另一方面，利用离散傅里叶变换(DFT)自适应监督真值与重构HSI 之间的频率距离。动态加权机制使模型集中处理难以生成的高频。在图1中，HDNet重构的频谱最接近真实情况，可见在缩小 HSI 之间的频率差方面的优势。SDL中的HR像素级注意力和FDL中的频率级优化相互促进共，进一步改善图像质量。

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1657172389879.png)

这篇文章的贡献如下：

- 首次采用了能缩小频域差异的动态频率级监督来提高感知质量。提出的FDL强迫模型自适应地恢复高频和难以生成频率。
- 为了获得更高的内部特征分辨率，在SDL中设计了HR像素级的注意力，这进一步帮助了FDL中的频率对齐。互补的双域学习机制可以相互促进HSI质量的提高。
- 在定量评估和视觉比较中， 该方法实现了最先进的(SOTA)性能。

# Related Work

## HSI Reconstruction

GAP-Net 提出了一种深度展开方法，并利用预训练的去噪方法进行HSI恢复。

$\lambda$-Net 和 TSA-Net 探索了空间特征的自注意力。

DGSMP 使用深度高斯尺度混合先验进行HSI重建。

然而，目前基于学习的方法主要集中在空间-光谱域，其中用于HSI重构的频域学习仍未得到充分研究。

## Self-Attention Mechanism 

$\lambda$-net 首次探索了HSI恢复中的特征自相关。然后 [21] 利用双向网络对光谱相关性进行建模。

TSA-Net 分别计算空间注意图和光谱注意图。

Wang等人[39]利用光谱图像之间的局部和非局部相关性。

然而，现有的大多数网络都牺牲了内部的注意力分辨率来加快计算速度，这不可避免地降低了性能。

high-level 任务设计了一些像素级注意力模块[2,18,53]，进一步增强了模型的表示能力。

因此，探索用于HSI重构的像素级 HR 注意力可以为提高性能提供一个有针对性的解决方案。

## Image Frequency Spectrum Analysis

F-Principle[48]证明深度学习网络为了拟合目标而倾向于使用低频，这将导致 frequency domain gap[47,52]。

最近的研究[12,41,51]表明，频谱中显示的周期性模式可能与空间域的伪影一致。

[6]在训练中对低频和高频图像的处理是不同的。

DASR[44]采用 domain-gap aware 训练和 domain deviation 加权监督的方法来解决超分辨率中的 domain deviation 问题。

Jiang et al.[13]证明，关注困难的频率可以提高重构质量。

在HSI重建中，低频下的模型过拟合带来了平滑的纹理和模糊的结构。

因此，探索特定频率上的自适应约束对精细化重构至关重要。


# The Proposed Method

## Frequency Domain Learning 

CNN固有的偏置使得 SDL 中高频特征的合成具有挑战性，这也导致了图1中其他方法的频域差异。因此这篇文章引入动态 FDL 来进行频率级监督。

**Discrete Fourier Transform** DFT将离散信号从时域变换到频域，分析其频率结构。对于一个有限长度的离散一维信号，每个频率的正弦波分量通过以下对应关系得到

$$
F(w) = \frac{1}{N} \sum_{n=1}^{N-1} f(n) e^{-j2\pi \frac{wn}{N}}
$$

**HSI Frequency Spectra Analysis** 利用二维 DFT 将 HSI 转换到频域以重构更多的高频细节。在特定通道 $k$ 中，空间坐标 $(h, w, k)$ 与频域坐标  $(u, v)$ 的转换关系为

$$
F_{gt}^k(u, v) = \sum_{h=0}^{H-1} \sum_{w=0}^{W-1} y_{gt}(h, w, k) e^{-j2\pi(\frac{uh}{H} + \frac{vw}{W})}
$$
$$
F^k_{pred}(u, v) = \sum_{h=0}^{H-1} \sum_{w=0}^{W-1} y_{pred}(h, w, k) e^{-j2\pi(\frac{uh}{H} + \frac{vw}{W})}
$$

如图 2 所示， 它们的频谱可视化表现出灰度变化的严重程度。结构纹理和边缘映射为高频信号，背景映射为低频信号。因此，我们可以很容易地操纵HSI的高频或低频信息。然后引入动态权值，使网络能自适应地处理不同的频率。

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1657713762844.png)
**Frequency Distance Optimization.** 我们使用频率距离系数 $\alpha$ 使距离相关性可调。 在每个通道 $k$ 中，真值和预测HSI之间的频率距离等价于它们的频谱之间的 power distance，定义为

$$
d^k(u, v) = \|F_{gt}^k(u, v) - F_{pred}^k(u, v)\|^\alpha
$$

然后定义一个与距离 $d(u, v)$ 线性相关的动态权系数 $\theta(u, v)$，使模型更加关注难以合成的频率。然后将真值与预测 HSI 在单个通道 $k$ 之间的距离表示为

$$
L_{FDL}(F_{gt}, F_{pred}) = \sum_{k=0}^{C-1} d(F_{gt}^k, F_{pred}^k)
$$


# Conclusion

这篇文章提出了一个高分辨率dual-domain 学习网络(HDNet)，包括 spatial-spectral-domain 学习和频率域学习，用于从 compressed measurement 数据重建HSI。

通过高效设计HR空间光谱注意力与特征融合模块，实现了细粒度像素级预测。

为了解决像素级损失造成的视觉差异，首次引入动态调整的频率级监督，以缩小重构的HSI与真实值之间的频域差异。

大量的可视化分析和定量实验证明，HDNet在像素级和频率级HSI重建方面都取得了较好的结果。