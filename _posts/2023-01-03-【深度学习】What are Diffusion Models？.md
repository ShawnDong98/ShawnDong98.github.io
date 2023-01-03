---
layout:     post
title:      "【深度学习】What are Diffusion Models?"
subtitle:   ""
date:       2023-01-03
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - Diffusion
---

GAN模型因潜在的不稳定训练和由于其对抗性训练性质而产生的较少多样性而闻名。VAE依赖代理损失。Flow 模型必须使用专门的结构来构造可逆变换。

扩散模型的灵感来自于非平衡热力学。他们定义了一个扩散步骤的马尔可夫链，慢慢地向数据添加随机噪声，然后学习反向扩散过程，从噪声中构建所需的数据样本。与 VAE 或 Flow 模型不同，扩散模型的学习过程是固定的，隐变量具有高维数(与原始数据相同)。




# Reference

1. [Weng, Lilian. (Jul 2021). What are diffusion models? Lil’Log. https://lilianweng.github.io/posts/2021-07-11-diffusion-models/.](https://lilianweng.github.io/posts/2021-07-11-diffusion-models/)