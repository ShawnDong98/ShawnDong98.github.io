---
layout:     post
title:      "【深度学习】BIRNAT: Bidirectional Recurrent Neural Networks with Adversarial Training for Video Snapshot Compressive Imaging
"
subtitle:   ""
date:       2022-07-15
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - HSI
    - ECCV 2020
---

# Abstract

这篇文章考虑了视频快照压缩成像(SCI)的问题，其中多个高速帧被不同的 mask 编码，然后求和为一个单一的 measurement。该 measurement 和 mask 被输入到循环神经网络(RNN)重建所需的高速帧。

这篇文章提出的采样和重建系统叫做 Bidirectional Recurrent Neural Network with Adversarial Training(BIRNAT)。

这可能是第一次将循环网络应用于SCI问题。

所提出的BIRNAT通过利用连续视频帧的底层相关性，优于其他基于深度学习的算法和最先进的基于优化的算法 DeSCI。

BIRNAT利用带有Resblock和特征映射自注意力的深度卷积神经网络重构第一帧，在此基础上利用双向RNN按顺序重构之后的帧。

为了提高重构视频的质量，BIRNAT在均方误差损失的基础上进一步增加了对抗性训练。

在模拟和真实数据(来自两个SCI相机)上的广泛结果证明了BIRNAT系统的优越性能。
# Conclusion

