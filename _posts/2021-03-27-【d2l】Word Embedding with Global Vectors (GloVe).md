---
layout:     post
title:      "【d2l】Word Embedding with Global Vectors (GloVe)"
subtitle:   ""
date:       2021-03-27
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - d2l
    - NLP
---

首先，我们应该回顾一下word2vec中的skip-gram模型。条件概率 $P(w_j \mid w_i)$ 在 skip_gram 模型中 使用 softmax 操作的表示 将会记录为 $q_{ij}$：

$$q_{ij} = \frac{exp(u_j^T v_i)}{\sum_{k \in V} exp(u_k^T v_i)}$$

其中 $v_i$ 和 $u_i$ 分别是词  索引为 $i$ 的中心词 $w_i$ 和 上下文词 的向量表示， 并且 $V = \{0, 1, ..., \mid V \mid - 1\}$是词典的索引集合。 

对于词$w_i$， 它可能在数据集中出现多次。我们收集 当 $w_i$ 是中心词 的 所有上下文词， 表示为 multiset $C_i$。 在一个multiset中，一个元素的数目称为该元素的multiplicity。比如， 假设词 $w_i$ 在数据集中出现两次： 当这两个 $w_i$ 变成中心词时， 上下文窗口包含上下文词的索引为 2, 1, 5, 2 和 2, 3, 2 , 1。那么， numtiset $C_i = \{1, 1, 2, 2, 2, 2, 3, 5\}$， 其中元素 1 的 multiplicity 为 2, 元素 2 的 multiplicity 为 4， 元素 3 和 元素 5 的multiplicity都为1。 将 multiset $C_i$ 中的 元素$j$ 的multiplicity 表示为 $x_{ij}$： 在整个数据集中 对于 中心词 $w_i$ 的 所有上下文词， 词 $w_j$ 的数量。 最后， skip-gram 模型的损失函数可以被表示为一种不同的方式：

$$- \sum_{i \in V} \sum_{j \in V} x_{ij} \log q_{ij}$$

我们把中心目标词 $w_i$ 的所有上下文词的数量加起来 得到 $x_i$， 并且 将基于中心目标词 $w_i$ 生成上下文词 $w_j$ 的 条件概率 $x_{ij} / x_i$ 记录 为 $p_{ij}$。 我们可以重写 skip-gram 模型的损失函数为：

$$- \sum_{i \in V} x_i \sum_{j \in V} p_{ij} \log q_{ij}$$

在上面的公式中， $\sum_{j \in V} p_{ij} \log q_{ij}$ 计算基于中心目标词 $𝑤_𝑖$的上下文词生成的条件概率分布 $p_{ij}$ 和 由模型预测的条件概率分布 $q_{ij}$ 的交叉熵。损失函数使用中心目标词 $w_i$ 的上下文词的数量和 进行加权。 如果我们最小化上面公式中的损失函数，我们就能够让预测的条件概率分布尽可能接近真实的条件概率分布。

然而，交叉熵损失函数尽管是最常见的损失函数类型，但它有时不是一个好的选择。一方面， 让模型预测 $q_{ij}$ 的成本变成合法的概率分布， 需要让它的分母是整个字典的所有项之和。另一方面，字典中往往有很多不常见的词，它们在数据集中很少出现。在交叉熵损失函数中，对大量很少出现的词的条件概率分布的最终预测很可能是不准确的。

# The GloVe Model

为了解决这个问题，word2vec之后的词嵌入模型GloVe \[Pennington et al.， 2014\]采用了平方损失，并在此损失的基础上对skip-gram模型进行了三处修改。

- 这里， 我们使用非概率分布变量 $p_{ij}' = x_{ij}$ 以及 $q_{ij}' = exp(u_j^T v_i)$ 并 取它们的对数。因此， 我们到平方损失 $(\log p_{ij}' - \log q_{ij}')^2 = (u_j^T v_i - \log x_{ij})^2$
- 我们为每个词 $w_i$ 增加了两个标量： bias项 $b_i$ (对中心目标词) 和 $c_i$ (对上下文词)。
- 用函数 $h(x_{ij})$ 替代每个 loss的权重。 权重函数 $h(x)$ 是一个区间为 $[0, 1]$ 的单调递增函数。