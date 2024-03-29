---
layout:     post
title:      "【深度学习】Learning to Generate Data by Estimating Gradients of the Data Distribution"
subtitle:   ""
date:       2023-04-06
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - Diffusion
---


# Background


## Score Functions and Score Models

Stein score function [Ste72; HD05; LLJ16] 被定义为概率分布的对数密度的梯度。特别地，对于一个概率密度函数 $p(x)$， 对应的 Stein score function $s(x)$ 为：

$$
s(x) := \nabla_x \log p(x)
$$

注意与 Fisher score function 的差异，Fisher score function 被定义为对数密度相对于模型参数的梯度。相比之下，Stein score function 取相对于随机变量的导数。为了简洁起见，我们从今以后将 “Stein score function” 简称为 “score” 或 “score function”。

给定一个概率密度函数，可以通过根据定义取导数来唯一地确定其 score function。相反，给定一个 score function，可以通过以下方式获得相应的密度函数:

$$
\log p(x) = \log p(x_0) + \int_0^1 s(x_0 + t(x - x_0))^\top (x - x_0)dt
$$

其中 $\log p(x_0)$ 可以被规范化约束决定：

$$
\int p(x) dx = 1
$$

因此，score function 在用于表示概率分布时保留的信息量与概率密度函数相同。

忽略归一化是分数函数优于密度函数的关键优势。 特别地， 假设 $\tilde p(x)$ 是未规范化的概率密度， $\int \tilde p(x) dx = Z \neq 1$。 score function 为：

$$
s(x) = \nabla_x \log \frac{\tilde p(x)}{Z} = \nabla_x \log \tilde p(x) - \nabla_x \log Z = \nabla_x \log \tilde p(x)
$$

其忽略了规范化常数 $Z$。 由于不需要计算评估 score functions 的归一化常数，因此使用灵活的深度神经网络对它们进行建模要容易得多。

从现在开始，我们将 score function 的模型称为 score model ，其表示为 $s_\theta(x)$， 其中 $\theta$ 表示模型参数。分数模型的唯一约束是，它必须是 scalar-valued function 的梯度，或者换句话说，它必须表示 conservative vector field。这可以通过用一个深度神经网络参数化能量函数 $E_\theta(x)$ 来强制执行， 然后用 $s_\theta(x) = -\nabla_x E_\theta(x)$ 构造 score model。通过反向传播[Hin02]或自动微分，计算深度神经网络的梯度通常是有效的。 因此，以这种方式构建的分数模型的评估速度很快。