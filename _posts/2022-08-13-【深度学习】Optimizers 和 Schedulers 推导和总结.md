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
f(x) = \frac{1}{n} \sum_{i=1}^n f_i(x) \tag{3}
$$

目标函数的梯度为：

$$
\nabla f(x) = \frac{1}{n} \sum_{i=1}^n \nabla f_i(x) \tag{4}
$$

梯度下降的每次迭代从数据集中均匀采样， 用计算得到的梯度 $\nabla f_i(x)$ 更新 $x$：

$$
x \leftarrow x - \eta \nabla f_i(x) \tag{5}
$$


$$

$$
# Minibatch Stochastic Gradient Descent

Gradient Descent 使用整个数据集计算梯度并更新参数。 Stochastic Gradient Descent 一次使用一个样本计算梯度并更新参数。 小批量梯度下降一次性对一小批样本进行梯度下降 $\mathrm{w} \leftarrow \mathrm{w} - \eta_t \mathrm{g}_t$ 其中：

$$
\mathrm{g}_t = \partial_\mathrm{w} f(\mathrm{x}_t, \mathrm{w}) \tag{6} 
$$

$$
\mathrm{g}_t = \partial_\mathrm{w} \frac{1}{\mid \mathcal{B}_t\mid} \sum_{i \in \mathcal{B}_t} f(\mathrm{x}_i, \mathrm{w}) \tag{7}
$$


因为 $\mathrm{x}_t$ 和 $\mathcal{B}_t$ 都是从训练集中均匀采样， 因此梯度的期望保持不变， 但是方差却显著减小了。这意味着更新更接近完整的梯度下降。