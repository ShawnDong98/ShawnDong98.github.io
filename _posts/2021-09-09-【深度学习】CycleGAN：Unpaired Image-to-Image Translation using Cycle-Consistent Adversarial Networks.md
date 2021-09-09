---
layout:     post
title:      "【深度学习】CycleGAN：Unpaired Image-to-Image Translation using Cycle-Consistent Adversarial Networks"
subtitle:   ""
date:       2021-09-09
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - GAN
---

# Abstract



我们的目标是学习一种映射 G: X -> Y， 使用对抗损失 使得无法分辨  G(x) 的图像分布和 Y的分布。

因为这种映射没有约束， 我们使用一种反映射 F: Y -> X， 以及引入循环一致损失强制 $F(G(X)) \approx X$


# Introduction

如果我们有G : X -> Y 和 F： Y -> X， G和F是互相的逆，通过映射 G 和 F 同时训练， 添加循环一致损失鼓励 $F(G(x)) \approx x$ 和 $G(F(y)) \approx y$。


# Related Work

**Image-to-Image Translation**：使用pix2pix的结构， 并且不需要成对的训练样本。


**Unpaired Image-to-Image Translation**： XX方法使用额外的项强制使输出与输入预定义的指标空间相近， 比如类别标签空间、图像像素空间 和 图像特征空间。

**Cycle Consistency**： 通过映射 G 和 F 同时训练， 添加循环一致损失鼓励 $F(G(x)) \approx x$ 和 $G(F(y)) \approx y$

**Neural Style Transfer**： 神经风格迁移通过组合图像的内容与另一图像的风格生成图像， 另一图像的风格通过预训练的深度特征计算Gram矩阵得到。

# Formulation 

损失函数包括两项： 对抗损失 和 循环一致损失。

## Adversarial Loss


$$
L_{GAN}(G, D_Y, X, Y) = E_{y \thicksim p_{data}(y)}[\log D_Y(y)] + E_{x \thicksim p_{data}(x)}[\log (1 - D_{Y}(G(x)))]
$$

$G$ 想要最小化这个目标， 而 $D$ 想要最大化这个目标。


## Cycle Consistency Loss 

如果网络有足够大的容量， 一个网络可以将相同的一组输入图像映射到目标域中任意随机的图像的排列。 对抗损失不能保证学习到的函数可以将输入映射到需要的输出。

因此需要循环一致损失：

$$
L_{cyc}(G, F) = E_{x \thicksim p_{data}(x)} [\| F(G(x)) - x\|_1]  + E_{y \thicksim p_{data}(y)} [\| F(G(y)) - y\|_1]
$$


## Full Objective

完整的损失如下：

$$
L(G, F, D_X, D_Y) = L_{GAN}(G, D_Y, X, Y) + L_{GAN}(F, D_X, X, Y) + \lambda L_{cyc}(G, F)
$$

单cycle不足以规范这种无约束的问题。


# Implementation

**Network Architecture**：网络包含3层卷积， 几个残差块， 以及两个反卷积， 最后有一个卷积将特征映射为RGB。128 x 128 的图像使用 6 个残差块， 256x256以及恒高分辨率的图像使用 9 个残差块。使用 instance norm。 判决器使用 70 x 70 的PatchGAN。