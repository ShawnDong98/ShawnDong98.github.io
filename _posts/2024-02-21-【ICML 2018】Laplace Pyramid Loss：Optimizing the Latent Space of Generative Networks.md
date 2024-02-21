---
layout:     post
title:      "【ICML 2018】Laplace Pyramid Loss：Optimizing the Latent Space of Generative Networks"
subtitle:   ""
date:      2024-02-21
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - ICML 2018
    - 
---

# Abstract

生成对抗网络（GANs）在生成逼真自然图像的任务中取得了显著的成果。

在大多数成功的应用中，GAN模型具有两个共同的特点：解决具有挑战性的鞍点优化问题，被解释为生成器和鉴别器函数之间的对抗游戏；以及将生成器和鉴别器参数化为深度卷积神经网络。

本文的目标是澄清这两个因素对GAN成功的贡献。特别地，我们引入了生成潜在优化（GLO），这是一个使用简单重构损失来训练深度卷积生成器的框架。

通过各种实验，我们展示了GLO具有许多GAN的理想特性：合成视觉上吸引人的样本，有意义地在样本之间进行插值，并对噪声向量进行线性算术运算；所有这些都不需要对抗性优化方案。