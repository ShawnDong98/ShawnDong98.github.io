---
layout:     post
title:      "【深度学习】3DT-Net ：Learning A 3D-CNN and Transformer Prior for Hyperspectral Image Super-Resolution"
subtitle:   ""
date:       2022-11-01
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - HSI
    - Arxiv 2021
---

# Abstract 


为了解决高光谱图像超分辨率（HSISR）的病态问题，通常的方法是使用高光谱图像（HSIs）的先验信息作为正则化项来约束目标函数。

使用手工制作的先验的基于模型的方法不能完全描述HSI的属性。

基于学习的方法通常使用卷积神经网络（CNN）来学习HSI的隐式先验。

然而，CNN的学习能力有限，它只考虑HSI的空间特征，而忽略了光谱谱间特征，卷积对远程依赖性建模无效。仍然有很大的提升空间。

这篇文章提出了一种新的HSISR方法，该方法使用 Transformer 而不是CNN来学习 HSI 的先验。

具体来说，作者首先使用近端梯度算法来求解HSISR模型，然后使用展开的网络来模拟迭代求解过程。

Transformer 的自注意力层使其具有空间全局交互的能力。

此外，作者在 Transformer 层后面添加了3D-CNN，以更好地探索HSI的空间-谱间相关性。

两个广泛使用的HSI数据集和现实世界数据集的定量和视觉结果都表明，与所有主流算法（包括最具竞争力的传统方法和最近提出的基于深度学习的方法）相比，该方法取得了相当大的收益。