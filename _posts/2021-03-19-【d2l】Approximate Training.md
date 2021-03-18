---
layout:     post
title:      "【d2l】Approximate Training"
subtitle:   ""
date:       2021-03-19
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - d2l
    - NLP
---


回顾上一节的内容。skip-gram模型的核心特征是使用softmax操作来计算基于给定中心目标词 $w_c$ 生成上下文词$w_o$的条件概率。


$$P(w_o \mid w_c) = \frac{exp(u_p^T v_c)}{\sum_{i \in V} exp(u^T_i v_c)}$$

条件概率对应的对数损失为

$$- log P(w_o \mid w_c) = - u_o^T v_c + log (\sum_{i \in V} exp(u_i^T v_c))$$


因为softmax操作已经考虑到上下文单词可以是词典 $V$ 中的任何单词, 上面提到的损失实际上包括了词典大小的每一项的和。从上一节我们知道，对于skip-gram模型和CBOW模型，因为它们都使用softmax操作获得条件概率，所以每个步骤的梯度计算都包含字典大小的每一项的和。对于拥有数十万甚至数百万单词的较大字典，计算每个梯度的开销可能太高。为了减少这样的计算复杂度，我们将在本节中介绍两种近似训练方法:负采样和分层softmax。由于skip-gram模型和CBOW模型之间没有太大的区别，所以我们在本节中只以skip-gram模型为例介绍这两种训练方法。


# Negative Sampling

负采样修改了原始的目标函数。给中心目标词 $w_c$ 一个上下文窗口, 我们把它看做上下文词 $w_o$ 出现在上下文窗口的事件， 该事件发生的概率计算方法如下：

$$P(D = 1 \mid w_c, w_o) = \sigma(u_o^T v_c)$$

这里， $\sigma$函数和sigmoid激活函数有着相同的定义：

$$\sigma(x) = \frac{1}{1 + exp(-x)}$$

我们将首先考虑通过最大化文本序列中所有事件的联合概率来训练词向量。给定长度 $T$ 的文本序列， 我们假设在时间步 $t$ 的单词为 $w^{(t)}$， 并且窗口大小为 $m$。 现在我们考虑最大化联合概率

$$\prod_{t=1}^T \prod_{-m \leq j \leq m, j \neq 0} P(D = 1 \mid w^{(t)}, w^{(t + j)})$$


然而，模型中包含的事件只考虑正面的例子。在这种情况下，只有当所有词向量都相等且值趋近于无穷时，上述联合概率才能最大化为1。显然，这样的词向量是没有意义的。负采样通过对目标函数进行采样和负抽样，使目标函数更有意义。假设 当上下文词 $w_o$ 出现在 中心目标词 $w_c$ 的上下文窗口时， 事件 $P$ 发生， 并且我们根据分布 $P(W)$ 采样 $K$ 个没有出现在上下文的词， 将其视作噪声词。我们假设噪声词 $w_k(k=1, ..., K)$ 不出现在中心目标词 $w_c$的上下文窗口的事件为 $N_k$。 假设事件 $P$ 和 $N_1, ..., N_k$ 对于正样本和负样本是相互独立的。通过负采样， 我们可以重写上述只考虑正样本的联合概率

$$\prod_{t=1}^T \prod_{-m \leq j \leq m, j \neq 0} P(w^{(t + j)} \mid w^{(t)})$$

这里， 条件概率被估计为：

$$P(w^{(t+j)} \mid w^{(t)}) = P(D = 1 \mid w^{(t)}, w^{(t + j)}) \prod_{k=1. w_k \thicksim P(w)}^K P(D = 0 \mid w^{(t)}, w_k)$$


令在时间步 $t$ 词 $w^{(t)}$ 在文本序列的索引为 $i_t$,  $h_k$ 是噪声词在词典中的索引。上述条件概率的对数损失为

$$
\begin{aligned}
    - log P(w^{t + j} \mid w^{(t)})  &= - log P(D = 1 \mid w^{(t)}, w^{(t+j)}) - \sum_{k=1, w_k \thicksim P(w)}^K log P(D = 0 \mid w^{(t)}, w_k)  \\
      &= - log \sigma(u_{i_{t+j}}^T v_{i_t}) - \sum_{k = 1, w_l \thicksim P(w)}^K log (1 - \sigma(u_{h_k}^T v_{i_t})) \\
	  &= - log \sigma(u_{i_{t+j}}^T v_{i_t}) - \sum_{k = 1, w_k \thicksim P(w)}^K log \sigma(-u_{h_k}^T v_{i_t})
\end{aligned}
$$

这里， 训练每一步梯度计算不再和字典大小相关， 但是和 $K$ 相关。 当 $K$ 是一个非常小的常数时， 负采样每一步的计算开销较低。

