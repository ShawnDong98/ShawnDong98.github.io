---
layout:     post
title:      "【机器学习】FISTA：A Fast Iterative Shrinkage-Thresholding Algorithm for Linear Inverse Problems"
subtitle:   ""
date:       2022-11-18
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 机器学习
    - 
---

# Abstract

作者考虑了一类迭代收缩阈值算法（ISTA），用于解决信号/图像处理中出现的线性逆问题。

这类方法可以被视为经典梯度算法的拓展，由于其简单性而具有吸引力，因此即使使用密集的矩阵数据，也足以解决大规模问题。

然而，众所周知，这些方法的收敛速度也相当缓慢。

这篇文章提出了一种新的快速迭代收缩阈值算法（FISTA），该算法保持了ISTA的计算简单性，但全局收敛速度在理论和实践上都明显更好。

基于小波的图像去模糊的初始数值结果表明，FISTA的能力比ISTA快几个数量级。