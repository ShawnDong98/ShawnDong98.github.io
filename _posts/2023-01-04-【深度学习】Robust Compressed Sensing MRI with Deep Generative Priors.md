---
layout:     post
title:      "【深度学习】Robust Compressed Sensing MRI with Deep Generative Priors"
subtitle:   ""
date:       2023-01-04
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - Diffusion
    - NIPS 2021
---

# Abstract

CSGM框架（Bora-Jalal-Price-Dimakis’17）表明，深度生成先验可以成为解决逆问题的强大工具。

然而，到目前为止，该框架仅在某些数据集（例如人脸和MNIST数字）上取得了实验成功，众所周知，它在分布外样本上表现不佳。

本文介绍了 CSGM 框架首次成功应用于临床MRI数据。

作者从 fastMRI 数据集中训练了大脑扫描的生成先验，并表明通过郎之万采样进行后验采样可以实现高质量的重建。

此外，我们的实验和理论表明，后验采样对真实分布和观测过程的变化是可靠的。


# Introduction

压缩感知减少了在各种成像逆问题中成功重建所需的观测次数。特别是，它缩短了磁共振成像（MRI）的扫描时间，大多数 MRI 供应商都发布了利用该框架加速临床工作流程的产品。尽管取得了成功，但基于稀疏的方法受到可实现的加速度的限制，因为稀疏假设要么是手工制作的，要么仅限于简单学习的稀疏编码。

最近，深度学习技术被用作逆问题的强大数据驱动重建方法。深度学习逆技术有两大家族：端到端监督和分布学习方法。端到端监督技术使用一组观测图像，并部署卷积神经网络（CNN）和其他架构来学习从观测到图像的逆映射。

# System Model and Algorithm

# Theoretical Results