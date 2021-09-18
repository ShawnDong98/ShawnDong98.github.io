---
layout:     post
title:      "【深度学习】Log Derivative Trick"
subtitle:   ""
date:       2021-09-18
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - 机器学习
---



机器学习设计控制概率。 这些概率通常表示为 `normalised-probabilities` 或 `log-probabilities`。掌握这两种表示之间灵活转换的能力是增强我们解决现代机器学习问题的关键一步。`log derivative trick` 利用对数导数的性质帮助我们。这个技巧在我们用它来解决随机优化问题时很有用，它将给我们提供一种新的方法来推导随机梯度估计量。我们首先来定义一个 score 函数。

# Score Functions

`log derivative trick` 是关于函数 $p(x; \theta)$ 的对数 对 参数 $\theta$ 的梯度法则的应用：

$$
\nabla_\theta \log p(x; \theta) = \frac{\nabla_\theta p(x; \theta)}{p(x; \theta)}
$$

这个技巧的重要性是在函数 $p(x; \theta)$ 是似然函数时体现的。 在这个例子下， 函数 $\nabla_\theta \log p(x; \theta)$ 叫做 score function， 而右侧是 score ratio。 score function 有大量有用的性质：

- 最大似然估计的 central computation。 
- score 的期望值是 0。

$$
\mathbb{E}_{p(x; \theta)}[\nabla_\theta \log p(x; \theta)] = \mathbb{E}_{p(x; \theta)}[\frac{\nabla_\theta p(x; \theta)}{p(x;\theta)}] \\
= \int p(x;\theta) \frac{\nabla_\theta p(x; \theta)}{p(x; \theta)}dx = \nabla_\theta \int p(x; \theta)dx = \nabla_\theta 1 = 0
$$

