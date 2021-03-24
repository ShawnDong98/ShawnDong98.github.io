---
layout:     post
title:      "【d2l】 Pretraining word2vec"
subtitle:   ""
date:       2021-03-24
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - d2l
    - NLP
---


在本节中，我们将训练一个 skip-gram 模型。

首先，导入实验所需的包和模块，并加载PTB数据集。


```python
import torch
from torch import nn
from d2l import torch as d2l

batch_size, max_window_size, num_noise_words = 512, 5, 5
data_iter, vocab = d2l.load_data_ptb(batch_size, max_window_size,
                                     num_noise_words)
```

# The Skip-Gram Model

我们将使用 embedding 层 和 minibatch 乘法 实现 skip-gram 模型。 这些方法也经常用于实现其他自然语言处理应用程序。

## embedding 层

用来获取词嵌入的层叫做 embedding 层， 它可以通过高阶API nn.Embedding 实例创建。 embedding 层 的权重是一个行数是词典大小(input_num) ， 列数为词向量的维数(output_dim)的矩阵。 我们设定词典大小为20， 词向量维度为4。

```python
embed = nn.Embedding(num_embeddings=20, embedding_dim=4)
print(f'Parameter embedding_weight ({embed.weight.shape}, '
      'dtype={embed.weight.dtype})')
```

输出：

```
Parameter embedding_weight (torch.Size([20, 4]), dtype={embed.weight.dtype})
```

embedding 层 的输入是单词的索引。 当我们输入一个词的索引 $i$， embedding 层 返回权重的第 $i^{th}$行作为它的词向量。 下面我们输入一个形状为 (2, 3) 的索引到 embedding 层。 因为词向量的维度是4， 我们得到一个形状为 (2, 3, 4)的词向量。

```python
x = torch.tensor([[1, 2, 3], [4, 5, 6]])
embed(x)
```

输出：

```
tensor([[[ 1.8211, -0.1617,  1.6255,  2.6455],
         [-0.5157,  0.8932, -0.0710, -0.4379],
         [ 0.2892, -1.9800, -0.0635, -1.1653]],

        [[ 0.2508,  0.7142, -0.6050,  1.1023],
         [-0.2829,  1.3283,  0.8957,  2.0215],
         [-0.9456,  0.2934, -0.0115, -0.1052]]], grad_fn=<EmbeddingBackward>)
```


##  Skip-gram Model Forward Calculation

在前向计算中， skip-gram模型的输入包含 中心目标词 center 的索引 和 上下文词和噪声词的拼接 contexts_and_negatives 的索引。 center 变量的形状为 (batch_size, 1)， 而 contexts_and_negatives 变量的形状为 (batch_size, max_len)。 这两个变量首先通过词嵌入层从词索引转化为词向量， 然后通过 minibatch 乘法 得到形状为 (batch_size, 1, max_len)的输出。 输出中的每个元素都是 中心目标词向量 和 上下文词向量或噪声词向量 的内积。

```python
def skip_gram(center, contexts_and_negatives, embed_v, embed_u):
    """
    args: 
        center                 : shape(b, n)
        contexts_and_negatives : shape(b, m)
        embed_v                : -> shape(b, n, p)
        embed_u                : -> shape(b, m, p)
    return: 
        pred : shape(b, n, m)
    """
    v = embed_v(center)
    u = embed_u(contexts_and_negatives)
    #--- 对input和mat2中存储的矩阵执行 batch 矩阵-矩阵乘积 ---
    #--- input和mat2必须是三维的tensor， 每个矩阵包含着相同数量的数据 ---
    #--- input_shape: (b x n x m), mat2_shape: (b x m x p), out_shape: (b x n x p) ---
    pred = torch.bmm(v, u.permute(0, 2, 1))
    return pred

```

验证输出的形状应该是 (batch_size, 1, max_len)

```
skip_gram(torch.ones((2, 1), dtype=torch.long),
          torch.ones((2, 4), dtype=torch.long), embed, embed).shape
```

输出：

```
torch.Size([2, 1, 4])
```


# Training

在训练词嵌入模型之前，我们需要定义模型的损失函数。

## Binary Cross Entropy Loss Function

根据负采样损失函数的定义，我们可以直接使用高阶API中的二分类交叉熵损失函数。

```python
class SigmoidBCELoss(nn.Module):
    "BCEWithLogitLoss with masking on call."

    def __init__(self):
        super().__init__()

    def forward(self, inputs, target, mask=None):
        #--- 该损失函数最后结合了一个sigmoid层 ---
        out = nn.functional.binary_cross_entropy_with_logits(
            inputs, target, weight=mask, reduction="none")
        return out.mean(dim=1)
		
loss = SigmoidBCELoss()
```



