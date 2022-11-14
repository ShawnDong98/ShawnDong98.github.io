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

尽管DPM具有高质量的生成性能，但它们的采样仍然缓慢，因为它们通常需要数百或数千个大型神经网络的顺序函数评估(步骤)来绘制样本。

从 DPM 的采样可以被看作是解决相应的扩散常微分方程(ODE)。

在这项工作中，作者提出了扩散ODE解的精确公式。

该公式分析计算了解的线性部分，而不是像以前的工作那样将所有项留给黑盒ODE求解器。

通过应用变量的变化，可以等效地简化为神经网络的指数加权积分。

基于作者的公式，作者提出了DPM-Solver，这是一种具有收敛顺序保证的扩散ODE的快速专用高阶求解器。

DPM-Solver 适用于离散时间和连续时间DPM， 无需进一步训练。

实验结果表明，DPM-Solver 能在各种数据集的10到20个函数评估中生成高质量的样本。

作者在CIFAR10数据集的10个函数评估中实现了4.70 FID，在20个函数评估中实现了2.87 FID，与之前在各种数据集上最先进的 training-free 采样器相比，实现了4~16倍的加速
# Conlusion