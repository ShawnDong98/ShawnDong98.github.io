---
layout:     post
title:      "【d2l】Transformer"
subtitle:   ""
date:       2021-04-29
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - d2l
---


我们在第10.6.2节比较了CNNs、RNNs和self-attention。特别地，self-attention既可以并行计算，又有最短的最大路径长度。因此，自然而然地，通过self-attention来设计深层次的结构是很有吸引力的。

与早期仍依赖于RNNs的 self-attention 不同\[Cheng et al.， 2016\]\[Lin et al.， 2017b\]\[Paulus et al.， 2017\]， transformer模型完全基于注意力机制，没有任何卷积或循环层\[Vaswani et al.， 2017\]。虽然最初被提议用于文本数据的序列到序列学习，但transformers器已经广泛应用于现代深度学习应用，如语言、视觉、语音和强化学习等领域。


# Model

作为encoder-decoder结构的实例，transformer的整体架构如图10.7.1所示。如我们所见，transformer由编码器和解码器组成。与图10.4.1中的Bahdanau attention对序列到序列学习不同的是，输入(源)和输出(目标)序列 embeddings 在被输入到基于 self-attention 堆叠模块的编码器和解码器之前，先进行位置编码。

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1619689413069.png)


图10.7.1 transformer 的结构。

现在我们提供图10.7.1中transformer结构的概述。在较高的级别上，transformer 编码器是由多个相同层堆叠而成，其中每个层都有两个子层(表示为sublayer)。第一个是multi-head self-attention pooling，第二个是positionwise feed-forward network。具体来说，在编码器 self-attention 中，queries, keys, 和 values都来自前一个编码器层的输出。受第7.6节ResNet设计的启发， 在两个子层周围都采用了残差连接。在 transformer 中， 对于序列在任意位置的任意输入 $x \in \mathbb{R}^d$， 我们需要 $sublayer(x) \in \mathbb{R}^d$ 使得残差连接 $x + sublayer(x) \in \mathbb{R}^d$ 可行。 残差连接的添加在层归一化\[Ba等人，2016\]后。因此，transformer 编码器为输入序列的每个位置输出 $d$ 维的向量表示。


transformer 解码器也是具有残差连接和层归一化的多个相同层的堆叠。除编码器中所述的两个子层外，解码器在这两个子层之间插入第三个子层，称为编码器-解码器注意力层。在encoder-decoder attention中，queries来自前一个解码器层的输出，而keys和values来自transformer编码器的输出。在decoder self-attention中，queries、keys和values都来自前一个解码器层的输出。然而，解码器中的每个位置被允许只关注解码器中直至该位置的所有位置。这种masked attention保留了自回归属性，确保预测只依赖于已经生成的输出tokens。

我们已经在第10.5节和第10.6.3节描述并实现了基于scaled dot-products的multi-head attention和positional encoding。下面，我们将实现transformer模型的其余部分。


```python
import math
import pandas as pd
import torch
from torch import nn
from d2l import torch as d2l
```


# Positionwise Feed-Forward Networks


positionwise feed-forward network 在所有 序列位置 使用相同的MLP 转换表征。 这是为什么我们叫它 positionwise。在下面的实现中，具有形状的input X (batch size, time steps number or sequence length In tokens, hidden units number or feature dimension)将通过两层MLP转换为形状为(batch size, time steps number, ffn num outputs)的输出张量。


```python
class PositionWiseFFN(nn.Module):
    def __init__(self, ffn_num_input, ffn_num_hiddens, ffn_num_outputs,
                 **kwargs):
        super(PositionWiseFFN, self).__init__(**kwargs)
        self.dense1 = nn.Linear(ffn_num_input, ffn_num_hiddens)
        self.relu = nn.ReLU()
        self.dense2 = nn.Linear(ffn_num_hiddens, ffn_num_outputs)

    def forward(self, X):
        return self.dense2(self.relu(self.dense1(X)))
```


下面的例子展示了张量的最内层维数改变为positionwise feed-forward network的输出数。由于相同的MLP在所有位置进行转换，当所有这些位置的输入相同时，它们的输出也相同。

输出：

```
tensor([[-0.9460,  0.5965, -0.4089,  0.3745, -0.8109, -0.7892, -1.0203,  0.0239],
        [-0.9460,  0.5965, -0.4089,  0.3745, -0.8109, -0.7892, -1.0203,  0.0239],
        [-0.9460,  0.5965, -0.4089,  0.3745, -0.8109, -0.7892, -1.0203,  0.0239]],
       grad_fn=<SelectBackward>)
```


在这里， 位置编码是学出来的。

# Residual Connection and Layer Normalization


现在让我们关注图10.7.1中的 "add & norm" 组件。正如我们在本节开始时所描述的，这是紧接着层规范化之后的残差连接。两者都是深层结构有效的关键。

在第7.5节中，我们解释了 batch normalization 如何在 minibatch 中跨样本 recenters和rescales。Layer normalization 与 batch normalization 相同，只是前者是 跨特征维度规范化。尽管batch normalization在计算机视觉中的广泛应用，但在自然语言处理任务中，其效率通常低于layer normalization，这些任务的输入通常是变长序列。

下面的代码片段按layer normalization 和 batch normalization 比较了不同维度上的标准化。


```python
ln = nn.LayerNorm(2)
bn = nn.BatchNorm1d(2)
X = torch.tensor([[1, 2], [2, 3]], dtype=torch.float32)
# Compute mean and variance from `X` in the training mode
print('layer norm:', ln(X), '\nbatch norm:', bn(X))
```

输出：

```
layer norm: tensor([[-1.0000,  1.0000],
        [-1.0000,  1.0000]], grad_fn=<NativeLayerNormBackward>)
batch norm: tensor([[-1.0000, -1.0000],
        [ 1.0000,  1.0000]], grad_fn=<NativeBatchNormBackward>)
```

现在，我们可以使用残差连接实现 AddNorm 类，然后进行层规范化。Dropout也用于正则化。


```python
class AddNorm(nn.Module):
    def __init__(self, normalized_shape, dropout, **kwargs):
        super(AddNorm, self).__init__(**kwargs)
        self.dropout = nn.Dropout(dropout)
        self.ln = nn.LayerNorm(normalized_shape)

    def forward(self, X, Y):
        return self.ln(self.dropout(Y) + X)
```


残差连接要求两个输入具有相同的形状，以便在加法运算后输出张量也具有相同的形状。

```python
add_norm = AddNorm([3, 4], 0.5)  # Normalized_shape is input.size()[1:]
add_norm.eval()
add_norm(torch.ones((2, 3, 4)), torch.ones((2, 3, 4))).shape
```

输出：

```
torch.Size([2, 3, 4])
```


# Encoder

有了 transformer 编码器的所有基本组件后，让我们先在编码器内实现一个单层。下面的EncoderBlock类包含两个子层：multi-head self-attention 和 positionwise feed-forward networks， 其中两个sublayer使用一个残差连接跟在layer normalization之后。

```python
class EncoderBlock(nn.Module):
    def __init__(self, key_size, query_size, value_size, num_hiddens,
                 norm_shape, ffn_num_input, ffn_num_hiddens, num_heads,
                 dropout, use_bias=False, **kwargs):
        super(EncoderBlock, self).__init__(**kwargs)
        self.attention = d2l.MultiHeadAttention(key_size, query_size,
                                                value_size, num_hiddens,
                                                num_heads, dropout, use_bias)
        self.addnorm1 = AddNorm(norm_shape, dropout)
        self.ffn = PositionWiseFFN(ffn_num_input, ffn_num_hiddens,
                                   num_hiddens)
        self.addnorm2 = AddNorm(norm_shape, dropout)

    def forward(self, X, valid_lens):
        Y = self.addnorm1(X, self.attention(X, X, X, valid_lens))
        return self.addnorm2(Y, self.ffn(Y))
```

正如我们所看到的，transformer编码器中的所有层都不会改变其输入的形状。

```python
X = torch.ones((2, 100, 24))
valid_lens = torch.tensor([3, 2])
encoder_blk = EncoderBlock(24, 24, 24, 24, [100, 24], 24, 48, 8, 0.5)
encoder_blk.eval()
encoder_blk(X, valid_lens).shape
```