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