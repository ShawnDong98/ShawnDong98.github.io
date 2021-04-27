---
layout:     post
title:      "【d2l】Multi-Head Attention"
subtitle:   ""
date:       2021-04-19
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - d2l
---


在实践中，给定相同的一组 queries、keys和values，我们可能希望我们的模型结合来自同一注意力机制的不同行为的知识，例如捕获序列中不同范围的依赖关系(例如，较短范围和较长范围)。因此，允许我们的注意力机制联合使用queries、keys 和 values 的不同表示子空间可能是有益的。


为此，queries、keys和values可以通过 $h$ 独立学习的线性投影进行转换，而不是执行单个注意力池化。然后这些 $h$ 投影的queries、keys 和 values 被并行地输入到注意力池化中。最后，$h$ 注意力池化输出进行concatenate 与 另一个学习到的线性投影和转换，产生最终的输出。这种设计叫做 multi-head attention，其中每个 $h$ 注意力池化输出是一个 head [[Vaswani et al., 2017]](http://d2l.ai/chapter_references/zreferences.html#vaswani-shazeer-parmar-ea-2017) 。使用全连接层实现可学习的线性变换， 图10.5.1描述了 multi-head attention。

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1619527116259.png)

图10.5.1 Multi-head attention, 其中多个 head 被 concatenate 起来， 然后进行线性变换。


# Model

在实现 multi-head attention 之前， 让我们用数学方法将这个模型公式化。 给定 query $Q \in \mathbb{R}^{d_q}$， 一个 key $k \in \mathbb{R}^{d_k}$ 和一个 value $v \in \mathbb{R}^{d_v}$， 每个attention head $h_i(i=1, ..., h)$可以计算如下：

$$h_i = f(W_i^{(q)}q, W_i^{(k)}k, W_i^{(v)}v) \in R^{p_v} \tag{10.5.1}$$

其中可学习参数 $W_i^{(q)} \in \mathbb{R}^{p_q \times d_q}$, $W_i^{(k)} \in \mathbb{R}^{p_k \times d_k}$, 和 $W_i^{(v)} \in \mathbb{R}^{p_v \times d_v}$, $f$是注意力池化， 比如10.3节中的 additive attention 和 scaled dot-product attention。multi-head attention 输出 是 另一个线性变换，  通过 $h$ heads 的拼接的  可学习参数 $W_o \in \mathbb{R^{p_o \times hp_v}}$：

$$
W_o 
\begin{matrix}
	\left[\begin{array}{cc}
		h_1 \\
		\vdots \\
		h_h
	\end{array}\right]
\end{matrix}
\in \mathbb{R}^{p_o}
$$