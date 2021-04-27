---
layout:     post
title:      "【d2l】Self-Attention and Positional Encoding"
subtitle:   ""
date:       2021-04-27
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - d2l
---


在深度学习中，我们经常使用CNNs或RNNs来编码序列。现在有了注意力机制。 假设我们将一系列 tokens 输入注意力池化中，这样同一组tokens就可以充当queries、keys和values。具体来说，每个query关注所有key-value对，并生成一个注意力输出。由于queries、keys和values来自相同的位置，这将实现 self-attention \[\[Lin et al., 2017b\]\[Vaswani et al., 2017\], 也叫做 intra-attention \[Cheng et al., 2016\]\[Parikh et al., 2016\]\[Paulus et al., 2017\]。 在本节中，我们将讨论使用self-attention的序列编码，包括为了保留序列顺序关系 使用额外的信息。

```python
import math
import torch
from torch import nn
from d2l import torch as d2l
```

# Self-Attention

给定一个输入 tokens 序列 $x_1, ..., x_n$， 其中所有的 $x_i \in \mathbb{R}^d(1 \leq i \leq n)$， 它的self-attention输出一个相同长度的序列 $y_1, ..., y_n$， 其中：

$$y_i = f(x_i, (x_1, x_1), ..., (x_n, x_n) \in \mathbb{R}^d \tag{10.6.1}$$

根据 (10.2.4) 中 注意力池化 $f$ 的定义。 使用 multi-head attention, 下面的代码片段计算一个形状为 (batch size, number of time steps or sequence length in tokens,  d) 的张量的self-attention。输出张量具有相同的形状。

```python
num_hiddens, num_heads = 100, 5
attention = d2l.MultiHeadAttention(num_hiddens, num_hiddens, num_hiddens,
                                   num_hiddens, num_heads, 0.5)
attention.eval()
```

输出：

```
  (attention): DotProductAttention(
    (dropout): Dropout(p=0.5, inplace=False)
  )
  (W_q): Linear(in_features=100, out_features=100, bias=False)
  (W_k): Linear(in_features=100, out_features=100, bias=False)
  (W_v): Linear(in_features=100, out_features=100, bias=False)
  (W_o): Linear(in_features=100, out_features=100, bias=False)
)
```

```python
batch_size, num_queries, valid_lens = 2, 4, torch.tensor([3, 2])
# X.shape: (2, 4, 100)
X = torch.ones((batch_size, num_queries, num_hiddens))
# (2, 4, 100) -> (10, 4, 20) -> (10, 4, 4) -> (2, 4, 100)
attention(X, X, X, valid_lens).shape
```

输出

```
torch.Size([2, 4, 100])
```


# Comparing CNNs, RNNs, and Self-Attention

让我们比较将一个 $n$ token 序列映射到另一个等长序列的结构，其中每个输入或输出 token 都由一个 $d$ 维向量表示。我们将比较 CNNs, RNNs和self-attention。 我们将比较它们的计算复杂度、序列操作和最大路径长度。请注意，序列操作阻止并行计算，而所有序列位置组合之间的更短的路径使学习序列中的长期依赖关系更容易\[Hochreiter et al., 2001\]。

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1619534235261.png)


图 10.6.1 比较CNN(忽略paddding的tokens)、RNN和self-attention 结构。考虑一个卷积层，其卷积核大小为 $k$。 我们将在后面的章节中提供更多关于使用CNNs进行序列处理的细节。现在，我们只需要知道，因为序列长度是 $n$， 输入通道和输出通道的数量都是 $d$， 卷积层的计算复杂度为 $O(knd^2)$。如图10.6.1所示， CNNs是层级结构， 因此它的序列操作是 $O(1)$, 最大路径长度是 $O(n / k )$。 例如， 在图10.6.1中， $x_1$ 和 $x_5$在两层卷积核为3的CNN的感受野内。

当RNNs更新hidden state时， 多个 $d \times d$ 权重矩阵 和 $d$ 维 hidden state 的计算复杂度维 $O(d^2)$。
因为序列长度是 $n$， 循环层计算复杂度为 $O(nd^2)$。 根据图 10.6.1， $O(n)$的序列操作不能并行化， 并且最大路径长度也是 $O(n)$。

在 self-attention 中， queries，keys 和  values 都是 $n \times d$ 的矩阵。 考虑 10.3.5 中的 scaled dot-product attention， $n \times d$ 的矩阵 乘以 一个 $d \times n$ 的矩阵， 然后 输出 $n \times n$ 的矩阵， 它再乘以 一个 $n \times d$ 的矩阵。 因此， self-attention的计算复杂度为 $O(n^2d)$。如图 10.6.1, 每个token通过self-attention直接连接到其他的token。 因此计算可以 以$O(1)$序列操作并行化 并且 最大路径长度也是 $O(1)$。

总而言之，CNNs和self-attention都可以并行计算，且self-attention的最大路径长度最短。然而，关于序列长度的平方计算 的复杂度 使得self-attention对于非常长的序列非常慢。