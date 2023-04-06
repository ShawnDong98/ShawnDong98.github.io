---
layout:     post
title:      "【深度学习】Maximum Likelihood Training of Score-Based Diffusion Models"
subtitle:   ""
date:       2023-04-06
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - Diffusion
    - NIPS 2021
---

# Abstract

基于分数的扩散模型通过逆转将数据扩散到噪声的随机过程来生成样本，并通过最大限度地减少分数匹配损失的加权组合来训练。

基于分数的扩散模型的对数似然可以通过与 continuous normalizing flows 的联系来计算，但对数似然并不通过分数匹配损失的加权组合直接优化。