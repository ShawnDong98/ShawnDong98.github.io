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


# Stochastic Gradient Descent with Momentum

除了使用小批量减小方差外， 还有一些其他方法可以做到， 如 "leaky average"：

$$
\mathrm{v}_t = \beta \mathrm{v}_{t-1} + \mathrm{g}_{t, t-1} \tag{8}
$$

用过去所有梯度的平均来替代当前的梯度， $\mathrm{v}$ 就是 *momentum*。

使用 $\mathrm{v}_t$ 代替梯度 $\mathrm{g}_t$ 得到以下的更新等式：

$$
\mathrm{v}_t \leftarrow \beta \mathrm{v}_{t-1} + \mathrm{g}_{t, t-1}  \\
x_t \leftarrow x_{t-1} - \eta_t v_t \tag{9}
$$
# Adagrad

使用 $s_t$ 累积过去的梯度：

$$
\mathrm{g}_t = \partial_\mathrm{w} l(y_t, f(\mathrm{x_t, \mathrm{w}})) \\
\mathrm{s}_t = \mathrm{s}_{t - 1} + \mathrm{g}_t^2 \\
\mathrm{w}_t = \mathrm{w}_{t-1} - \frac{\eta}{\sqrt{\mathrm{s}_t + \epsilon}} \odot \mathrm{g}_t \tag{10}
$$
这里的操作都是 coordinate wise 的。 coordinate wise 是指， $\mathrm{v}^2$ 对应 $v_i^2$， $\frac{1}{\sqrt{\mathrm{v}}}$ 对应 $\frac{1}{\sqrt{v_i}}$ , $\mathrm{u} · \mathrm{v}$ 对应 $u_i v_i$。

该优化算法与普通的sgd算法差别就在于采取了累积平方梯度。设置全局学习率之后，每次通过 **全局学习率逐参数的除以历史梯度平方和的平方根**，使得每个参数的学习率不同。




# RMSProp


$$
\mathrm{s}_t \leftarrow \gamma \mathrm{s}_{t-1} + (1 - \gamma) \mathrm{g}_t^2
$$
$$
\mathrm{x}_t \leftarrow \mathrm{x}_{t-1} - \frac{\eta}{\sqrt{\mathrm{s}_t + \epsilon}} \odot \mathrm{g}_t
$$

展开 $\mathrm{s}_t$ 得到：

$$
\begin{align}
\mathrm{s}_t &= (1 - \gamma) \mathrm{g}_t^2 + \gamma \mathrm{s}_{t-1} \\
&= (1 - \gamma)(\mathrm{g}_t^2 + \gamma \mathrm{g}_{t-1}^2 + \gamma^2 \mathrm{g}_{t-2}^2 + ...., )
\end{align}
$$

因为 $1 + \gamma + \gamma^2 + ..., = \frac{1}{1-\gamma}$, 因此权重的和被规范化为 1。

RMSProp 与 Adagrad 算法的差别在于累积梯度 $\mathrm{s}_t$ 的方法不同，其使用 ema 累积梯度。

# Adam

Adam 的关键组件是 exponential weighted moving average(EMA) 来累积梯度的 momentum 和 second momentum 的估计。它有两个状态变量：

$$
\mathrm{v}_t \leftarrow \beta_1 \mathrm{v}_{t-1} + (1 - \beta_1 ) \mathrm{g}_t, \\
\mathrm{s_t} \leftarrow \beta_2 \mathrm{s}_{t-1} + (1 - \beta_2) \mathrm{g}_t^2
$$
$\beta_1$ 和 $\beta_2$ 是非负的权重参数。 通常选择 $\beta_1 = 0.9$， $\beta_2 = 0.999$。因此方差估计要比动量慢许多。注意如果初始化 $v_0=s_0=0$，在初期 $\mathrm{v}_t$ 和 $\mathrm{s}_t$ 都接近于0， 这个估计是有问题的。 因此我们常常根据下式进行误差修正：

$$
\hat v_t = \frac{v_t}{1 - \beta_1^t}  \quad \text{and} \quad \hat s_t = \frac{s_t}{1 - \beta_2^t}
$$
和 RMSProp 一样， 重新缩放梯度：

$$
\mathrm{g}_t' = \frac{\eta}{\sqrt{\hat s_t} + \epsilon} \odot \hat{\mathrm{v}}_t
$$

然后用以下式子更新：

$$
\mathrm{x}_t \leftarrow \mathrm x_{t-1} - \mathrm{g}_t'
$$

Adam 和 RMSPrp 算法的主要差别就在于同时对梯度 $\mathrm{g}$ 的 momentum 和 梯度平方 $\mathrm{g}^2$  的 momentum 使用 ema 估计。


# Reference

1. [https://d2l.ai/chapter_optimization/gd.html](https://d2l.ai/chapter_optimization/gd.html)
2. [https://d2l.ai/chapter_optimization/sgd.html](https://d2l.ai/chapter_optimization/sgd.html)
3. [https://d2l.ai/chapter_optimization/minibatch-sgd.html](https://d2l.ai/chapter_optimization/minibatch-sgd.html)
4. [https://d2l.ai/chapter_optimization/momentum.html](https://d2l.ai/chapter_optimization/momentum.html)
5. [https://d2l.ai/chapter_optimization/adagrad.html](https://d2l.ai/chapter_optimization/adagrad.html)
6. [https://d2l.ai/chapter_optimization/rmsprop.html](https://d2l.ai/chapter_optimization/rmsprop.html)
7. [https://d2l.ai/chapter_optimization/adam.html](https://d2l.ai/chapter_optimization/adam.html)
8. 






