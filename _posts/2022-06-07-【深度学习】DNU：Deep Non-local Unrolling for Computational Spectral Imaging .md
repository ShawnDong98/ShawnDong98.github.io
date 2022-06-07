---
layout:     post
title:      "【深度学习】DNU: Deep Non-local Unrolling for Computational Spectral Imaging "
subtitle:   ""
date:       2022-06-07
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - HSI
---


# Abstract

在过去的几十年里，计算光谱成像一直致力于捕捉动态世界的光谱信息。

这篇文章提出了一个可解释的神经网络的计算光谱成像。

首先，这篇文章引入了一种新的数据驱动先验，它可以自适应地利用光谱图像之间的局部和非局部相关性。

我们的数据驱动先验作为正则化集成到重构问题中。

然后，这篇文章提出将重建问题展开到一个优化启发的深度神经网络。

通过对图像相关性和系统成像模型的显式刻画，该网络结构具有较高的可解释性。

最后，通过端到端训练学习网络中的完整参数，使网络具有高空间-光谱保真度的鲁棒性能。

大量的仿真和硬件实验验证了该方法优于最先进的方法。