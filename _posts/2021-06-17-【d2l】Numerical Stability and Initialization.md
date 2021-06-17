---
layout:     post
title:      "【d2l】Numerical Stability and Initialization"
subtitle:   ""
date:       2021-06-17
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - d2l
    - 深度学习
---


到目前为止，我们实现的每个模型都要求我们根据预先指定的分布初始化它的参数。到目前为止，我们认为初始化方案是理所当然的，而忽略了如何做出这些选择的细节。你甚至可能会觉得这些选择并不特别重要。相反，初始化方案的选择在神经网络学习中起着非常重要的作用，对于保持数值稳定性至关重要。此外，这些选择可以以有趣的方式与非线性激活函数的选择联系起来。我们选择哪个函数以及如何初始化参数可以决定我们的优化算法收敛的速度。糟糕的选择可能导致我们在训练时遇到梯度爆炸或梯度消失。


# Vanishing and Exploding Gradients

## Breaking the Symmetry

神经网络设计中的另一个问题是其参数化中固有的对称性。假设我们有一个带有一个隐藏层和两个神经元的简单MLP。在这个情况下， 我们可以重排列第一层的权重 $W^{(1)}$ 以及 同样重排列输出层的权重来得到相同的功能。 第一隐藏神经元与第二隐藏神经元之间并没有什么特别的区别。换句话说，我们在每一层的隐藏神经元之间有排列对称性。

这不仅仅是理论上的麻烦。考虑前面提到的带有两个隐藏单元的单层MLP。举例来说，假设输出层将两个隐藏的单元转换为一个输出单元。想象一下，如果我们将隐藏层的所有参数初始化为 $W^{(1)} = c$。 在这种情况下，在前向传播过程中，任一隐藏单元都接受相同的输入和参数，产生相同的激活，并将其输入给输出单元。在反向传播过程中，根据参数 $W^{(1)}$ 对输出单元进行微分会得到一个梯度，其所有元素的值都相同。因此，在基于梯度的迭代（例如，小批量随机梯度下降）之后，$W^{(1)}$ 的所有元素仍然有相同的值。这样的迭代永远不会打破对称本身，我们可能永远无法实现网络的表达能力。隐藏层就好像只有一个单元。请注意，虽然小批随机梯度下降不会打破这种对称性，但dropout正则化会。


# Parameter Initialization

解决或至少减轻上述问题的一种方法是小心地初始化。在优化过程中额外地小心和适当的正则化可以进一步提高稳定性。


##  Default Initialization

在前面的章节中，例如第3.3节，我们使用了一个正态分布来初始化我们的权值。如果我们不指定初始化方法，框架将使用默认的随机初始化方法，这在实践中对于中等规模的问题通常工作得很好。



**让每层的方差是一个常数**

- 将每层的输出和梯度看做随机变量
- 让它们的均值和方差都保持一致


正向：

$$
\mathbb{E}[h_i^t] = 0 \\
\text{Var}[h_i^t] = a
$$


反向：

$$
\mathbb{E}[\frac{\partial l}{\partial h_i^t}] = 0 \qquad \text{Var}[\frac{\partial l}{\partial h_i^t}] = b \qquad \forall i, t
$$


a 和 b 都是常数。


**权重初始化**

- 在合理区间里随机初始参数
- 训练开始的时候更容易有数值不稳定
- - 远离最优解的地方损失函数表面可能很复杂
- - 最优解附近表面会比较平
- 使用 $N(0, 0.01)$ 来初始可能对小网络没问题， 但不能保证深度神经网络


**例子：MLP**

假设：

- $w_{i, j}^t$ 是 i.i.d， 那么 $\mathbb{E}[w_{i,j}^t] = 0$, $\text{Var}[w_{i, j}^t] = \gamma_t$
- $h_i^{t-1}$ 独立于 $w_{i, j}^t$

假设没有激活函数 $h^t = W^t h^{t-1}$， 这里 $W^t \in \mathbb{R}^{n_t \times n_{t-1}}$

正向均值：

$$
\mathbb{E}[h_i^t] = \mathbb{E}[\sum_j w_{i, j}^t h_j^{t-1}] = \sum_j \mathbb{E}[w_{i, j}^t] \mathbb{E}[h_j^{t-1}] = 0
$$


正向方差：

$$
\begin{aligned}
\text{Var} [h_i^t] &= \mathbb{E}[(h_i^t)^2] - \mathbb{E}[h_i^t]^2 = \mathbb{E}[(\sum_j w_{i,j}^t h_j^{t-1})^2] \\
&= \mathbb{E}[\sum_j (w_{i, j}^t)^2(h_j^{t-1})^2 + \sum_{j \neq k}w_{i, j}^t w_{l, k}^t h_{j}^{t-1}h_{k}^{t-1}] \\
&= \sum_{j} \mathbb{E}[(w_{i, j}^t)^2] \mathbb{E}[(h_{j}^{t-1})^2] \\
&= \sum_j \text{Var}[w_{i, j}^t] \text{Var}[h_{j}^{t-1}] = n_{t-1}\gamma_t \text{Var}[h_j^{t-1}]
\end{aligned}
$$

平方展开后为 各项的平方 与 每项之积 的和。

我们的要求是输入的方差和输出的方差相同的话， 那么我们的要求就是 $n_{t-1}\gamma_t = 1$。


反向均值与方差：

跟正向情况类似

$$
\frac{\partial l}{\partial h^{t-1}} = \frac{\partial l}{\partial h^t} W^t \Rightarrow (\frac{\partial l}{\partial h^{t-1}})^T = (W^t)^T(\frac{\partial l}{\partial h^t})^T
$$

$$
E[\frac{\partial l}{\partial h_i^{t-1}}] = 0
$$

$$
\text{Var}[\frac{\partial l}{\partial h_{i}^{t-1}}] = n_t \gamma_t \text{Var} [\frac{\partial l}{\partial h_j^t}] 
$$

方差要输入和输出相同的情况下需要满足 $n_t \gamma_t = 1$。

这里没有细推， 记住吧。


## Xavier Initialization


难以需要满足 $n_{t-1}\gamma_t = 1$ 和 $n_t \gamma_t  = 1$ 

Xavier 使得 $\gamma_t (n_{t-1} + n_t) / 2 = 1 \rightarrow \gamma_t = 2/(n_{t-1} + n_{t})$ 
- 正态分布 $N(0, \sqrt{2/(n_{t-1} + n_t)})$
- 均匀分布 $U(-\sqrt{6/(n_{t-1} + n_t)}, \sqrt{6/(n_{t-1} + n_t)})$ （分布 $U(-a, a)$ 的方差是 $a^2 / 3$）
- 适配权重形状变换， 特别是 $n_t$


# 激活函数


## 假设线性的激活函数 

**前向**

假设 $\sigma(x) = \alpha x + \beta$

$$
h' = W^t h^{t-1} \qquad \text{and} \qquad h^t = \sigma(h')
$$

$$
\mathbb{E}[h_i^t] = \mathbb{E}[\alpha h_i' + \beta] = \beta \qquad \Rightarrow \qquad \beta = 0 
$$

要使输入和输出的均值为0， 那么 $\beta = 0$

$$
\begin{aligned}
\text{Var}[h_i^t] &= \mathbb{E}[(h_i^t)^2] - \mathbb{E}[h_i^t]^2  \\
&= \mathbb{E}[(\alpha h_i' + \beta)^2] - \beta^2 \\
&= \mathbb{E}[\alpha^2 (h_i')^2 + 2\alpha \beta h_i' + \beta^2] - \beta^2 \\
&= \alpha^2 \text{Var}[h_i']
\end{aligned}\
\Rightarrow \alpha = 1
$$

要使输入和输出的方差相同， 那么 $\alpha = 1$


**反向**

假设 $\sigma(x) = \alpha x + \beta$

$$
\frac{\partial l}{\partial h'}= \frac{\partial l}{\partial h^t}(W^t)^T \qquad \text{and} \qquad \frac{\partial l}{\partial h^{t-1}} = \alpha \frac{\partial l}{\partial h'}
$$

$$
\mathbb{E} [\frac{\partial l}{\partial h_i^{t-1}}] = 0  \qquad \Rightarrow \qquad \beta = 0
$$

$$
\text{Var} [\frac{\partial l}{\partial h_i^{t-1}}] = \alpha^2 \text{Var} [\frac{\partial l}{\partial h_j'}]  \qquad \Rightarrow \qquad \alpha = 1
$$

