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

# Introduction

线性逆问题出现在广泛的应用中，如天体物理学、信号和图像处理、统计推理和光学等。逆问题的跨学科性质通过大量文献显而易见，其中包括大量的数学和算法发展；例如，请参阅专著[13]及其中的参考文献。


一个基本的线性逆问题导致我们研究这种形式的离散线性系统:

$$
Ax = b + w
$$
其中 $A \in \mathbb{R}^{m \times n}$ 和 $b \in \mathbb{R}$ 是已知的，$w$ 是未知的噪声（或者扰动）向量， 并且 $x$ 是真值或者要估计的位置信号/图像。在图像去模糊问题中， $b \in \mathbb{R}^m$ 表示模糊的图像， $x \in \mathbb{R}^n$ 是未知的真值图像， 其大小假设和 $b$ 相等(即 $m = n$)。 $b$ 和 $x$ 通过堆叠二维图像的列形成。