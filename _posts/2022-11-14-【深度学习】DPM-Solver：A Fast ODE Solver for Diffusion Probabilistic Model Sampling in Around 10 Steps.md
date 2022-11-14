---
layout:     post
title:      "【深度学习】DPM-Solver：A Fast ODE Solver for Diffusion Probabilistic Model Sampling in Around 10 Steps"
subtitle:   ""
date:       2022-11-14
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - NIPS2022
---

# Abstract

扩散概率模型(DPM)正在出现强大的生成模型。

尽管DPM具有高质量的生成性能，但它们的采样仍然缓慢，因为它们通常需要数百或数千个大型神经网络的顺序函数步骤来绘制样本。

从 DPM 的采样可以被看作是解决相应的扩散常微分方程(ODE)。

在这项工作中，作者提出了扩散ODE解的精确公式。


# Conlusion