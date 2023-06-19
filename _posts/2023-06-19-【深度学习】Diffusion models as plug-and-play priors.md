---
layout:     post
title:      "【深度学习】Diffusion models as plug-and-play priors"
subtitle:   ""
date:       2023-06-19
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - NIPS 2022
---

# Abstract

在一个模型中考虑一个推理高维数据 $x$ 的问题， 其由先验 $p(x)$ 和给定一些条件 $y$ 对 $x$ 的辅助可微分的约束 $c(x, y)$。 

在本文中，先验是一个独立训练的去噪扩散生成模型。


辅助约束预计将具有可微的形式，但可能来自不同的来源。

这种推断的可能性将扩散模型转化为即插即用模块，从而允许一系列潜在应用来使模型适应新的领域和任务，如条件生成或图像分割。

扩散模型的结构允许我们通过每一步包含不同噪声量的固定去噪网络迭代分化来进行近似推断。