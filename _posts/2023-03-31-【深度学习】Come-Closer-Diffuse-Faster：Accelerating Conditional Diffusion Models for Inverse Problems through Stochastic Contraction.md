---
layout:     post
title:      "【深度学习】Come-Closer-Diffuse-Faster: Accelerating Conditional Diffusion Models for Inverse Problems through Stochastic Contraction"
subtitle:   ""
date:       2023-03-31
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - Diffusion
    - CVPR 2022
---

# Abstract

由于其作为生成模型的强大性能，扩散模型最近在社区中引起了极大的兴趣。

此外，它对逆问题的应用已经证明了最先进的性能。

不幸的是，扩散模型有一个关键的缺点——它们本质上采样速度很慢，需要几千个迭代步骤才能从纯高斯噪声中生成图像。

在这项工作中，我们表明从高斯噪声开始是不必要的。

相反，从具有更好初始化的单个正向扩散开始，显著减少了反向条件扩散中的采样步骤数量。

这种现象被正式解释为随机差分方程的 contraction 理论，例如我们的条件扩散策略——反向扩散的交替应用，然后是 non-expansive data consistency 步骤。

# Conclusion