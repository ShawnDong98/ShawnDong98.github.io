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


本文表明，掩码自编码器（MAE）是计算机视觉的可扩展自监督学习者。

MAE方法很简单：我们掩盖输入图像的随机 patch，并重建缺失的像素。