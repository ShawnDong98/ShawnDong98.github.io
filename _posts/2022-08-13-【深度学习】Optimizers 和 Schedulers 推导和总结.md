---
layout:     post
title:      "【深度学习】Optimizers 和 Schedulers 推导和总结"
subtitle:   ""
date:       2022-08-13
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    -
---

# Gradient Descent(GD)

设 $x = [x_1, x_2, ..., x_d]^\top$ ， 目标函数为 $f: \mathbb{R}^d \rightarrow \mathbb{R}$ 将向量映射为标量。对应的梯度也是多变量，其是由 $d$ 个偏导组成的向量：

$$
\nabla f(x) = [\frac{\partial f(x)}{\partial x_1}, \frac{f(x)}{\partial x_2}, ..., \frac{\partial f(x)}{\partial x_d}]^\top \tag{1}
$$
梯度下降最快的方向是负梯度方向 $- \nabla f(x)$, 选择学习率 $\eta > 0$， 得到梯度下降算法：

$$
x \leftarrow x - \eta \nabla f(x) \tag{2}
$$


# Stochastic Gradient Descent(SGD)
给定 $n$ 个样本， 假设 $f_i(x)$ 是第 $i$ 个样本的损失函数， 有以下的目标函数：

$$
f(x) = \frac{1}{n} \sum_{i=1}^n f_i(x) \tag{1}
$$

目标函数的梯度为：

$$
\nabla f(x) = \frac{1}{n} \sum_{i=1}^n \nabla f_i(x) \tag{2}
$$

梯度下降的每次迭代从数据集中均匀采样， 用计算得到的梯度 $\nabla f_i(x)$ 更新 $x$：

$$
x \leftarrow x - \eta \nabla f_i(x) \tag{3}
$$


$$

$$
# Minibatch Stochastic Gradient Descent



# 