---
layout:     post
title:      "【深度学习】Understanding Diffusion Models: A Unified Perspective"
subtitle:   ""
date:       2023-01-05
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - Diffusion
---

# Background:ELBO,VAE,andHierarchicalVAE

对于许多模态，我们可以认为我们观察到的数据是由相关的看不见的隐变量表示或生成的，我们可以用随机变量 $z$ 表示。

## Evidence Lower Bound

从数学上讲，我们可以想象通过联合分布建模的隐变量和我们观察到的数据 $p(x, z)$。 基于似然的生成模型是学习一个模型最大化所有观测 $x$ 的似然 $p(x)$。 

## VariationalAutoencoders

## HierarchicalVariationalAutoencoders