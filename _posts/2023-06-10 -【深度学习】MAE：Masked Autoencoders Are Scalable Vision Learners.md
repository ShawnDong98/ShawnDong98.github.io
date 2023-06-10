---
layout:     post
title:      "【深度学习】MAE：Masked Autoencoders Are Scalable Vision Learners"
subtitle:   ""
date:      2023-06-10 
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - CVPR 2022
---

# Abstract


本文表明，masked autoencoders（MAE）是计算机视觉的可扩展自监督学习者。

MAE方法很简单：我们 mask 输入图像的随机 patch，并重建缺失的像素。

它基于两个核心设计。首先，我们开发了一个非对称编码器-解码器架构，其编码器仅在可见的 patch 子集（没有掩码 token）上运行，以及一个轻量级解码器，该解码器从隐表示和  mask tokens 重建原始图像。