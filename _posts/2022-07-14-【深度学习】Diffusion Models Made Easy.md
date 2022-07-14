---
layout:     post
title:      "【深度学习】Diffusion Models Made Easy"
subtitle:   ""
date:       2022-07-14
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - 
---

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1657793819310.png)


# Introduction

最近，GANs和VAEs这两个重要的生成模型已经获得了很多成功和认可。GANs在多个应用程序中都能很好地工作，然而，它们很难训练，由于一些挑战，比如模式坍塌和梯度消失，它们的输出缺乏多样性。然而，虽然 VAEs 具有坚实的理论基础，但是建立一个良好的损失函数模型是 VAEs 系统的一个挑战。

还有一组技术从物理现象中获得灵感， 其基于概率似然估计方法, 叫做扩散模型。扩散模型背后的中心思想来自气体分子热力学，其中分子从高密度扩散到低密度区域。在物理学文献中，这种运动通常被称为熵或 heat death 的增加。在信息论中，这等同于噪音的逐渐干扰导致的信息丢失。