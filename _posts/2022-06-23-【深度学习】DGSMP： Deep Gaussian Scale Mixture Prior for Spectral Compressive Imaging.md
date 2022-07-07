---
layout:     post
title: 【深度学习】DGSMP： Deep Gaussian Scale Mixture Prior for Spectral Compressive Imaging
subtitle:   ""
date:       2022-06-23
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - HSI
    - CVPR 2021
---


# Abstract

在编码孔径快照光谱成像(CASSI)系统中，可以从捕获的压缩图像重构出真实世界的高光谱图像。

基于模型的HSI重构方法采用手工构建的先验来解决重构问题，但由于手工构建的先验表示能力较差，大多数方法的成功程度有限。

基于深度学习的方法直接学习压缩图像和 HSI 之间的映射，取得了更好的效果。

然而，为了获得满意的结果，设计一个强大的深度网络启发式算法是非常重要的。

这篇文章提出了一种新的基于最大后验(MAP)估计框架的HSI重建方法，使用学习到的高斯尺度混合(GSM)先验。

不同于现有的 GSM 模型使用手工制作的比例先验(例如，Jeffrey's 先验)，这篇文章通过深度卷积神经网络(DCNN)学习 scale 先验。

此外，这篇文章还提出利用DCNN 来估计 GSM 模型的 local means。

MAP 估计算法的所有参数和DCNN 参数通过端到端训练进行联合优化。


# Introduction
与传统的RGB图像相比，高光谱图像(HSIs)具有更多的光谱波段，能够更准确地描述图像场景中的物质特征。基于其丰富的光谱信息，HSI 有助于许多计算机视觉任务，如:，目标识别，检测，跟踪。传统的成像系统使用 1D 和 2D 传感器需要很长的时间扫描场景， 不能捕获动态目标。最近，许多编码孔径快照光谱成像(CASSI)系统被提出以视频速率捕获3D HSI。CASSI利用 Physical mask 和 disperser 调制不同波长的信号，并将所有调制信号混合生成单个2D压缩 measurement 。然后采用重建算法从二维压缩图像重建出三维HSI。如图1所示，从真实 CASSI 系统捕获的二维压缩图像( measurement )重构了28个光谱波段。

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1657164688005.png)

因此，重构算法在CASSI中起着举足轻重的作用。为了解决这一病态逆问题，以往的基于模型的方法采用手工制作先验对重构过程进行正则化。在GAP-TV中，引入 total variation 先验来解决 HSI 重构问题。基于 HSI 对某些字典具有稀疏表示的假设，基于稀疏性方法利用 $l_1$ 稀疏性对解进行正则化。

# Conclusion

这篇文章提出了一种编码孔径快照光谱成像的可解释高光谱图像重建方法。

与现有的研究不同，该网络是基于高斯尺度的混合先验。

利用GSM模型对高光谱图像进行特征提取，并将重建问题归结为MAP估计问题。

相比于人工设计先验， 提出一种从 DCNN 学习 GSM scale 先验。

此外，在自回归模型的启发下，GSM 模型的均值被估计为空间-光谱相邻像素的加权平均值，这些 filter coefficients 也被DCNN 估计，旨在学习充分的空间-光谱相关性的 HSI。

在合成数据集和真实数据集上的大量实验结果表明，该方法优于现有的先进算法。

这篇文章提出的网络不仅限于光谱压缩成像如CASSI和类似系统，它还可以用于视频快照压缩成像系统。

