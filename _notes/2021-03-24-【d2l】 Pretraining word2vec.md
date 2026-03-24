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

值得注意的是,我们可以使用 mask变量 来指定部分预测值和标签参与minibatch损失函数计算: 当mask是1, 对应位置的预测值和标签将参与损失函数的计算； 当mask值为0， 它们不参与损失函数的计算。 正如我们前面提到的，mask变量可以用来避免填充对损失函数计算的影响。给定两个相同的例子，不同的mask导致不同的损失值。


给定两个相同的例子，不同的 mask 导致不同的损失值。


```python
pred = torch.tensor([[.5] * 4] * 2)
label = torch.tensor([[1., 0., 1., 0.]] * 2)
mask = torch.tensor([[1, 1, 1, 1], [1, 1, 0, 0]])
loss(pred, label, mask)
```

我们可以将每个样本中的损失规范化，因为每个样本中的长度不同。

```python
loss(pred, label, mask) / mask.sum(axis=1) * mask.shape[1]
```

输出：

```
tensor([0.7241, 0.7241])
```

## Initializing Model Parameters


我们分别构造中心词和上下文词的embedding层， 设定超参数 词向量维度 embed_size 为 100。

```python
embed_size = 100
net = nn.Sequential(
    nn.Embedding(num_embeddings=len(vocab), embedding_dim=embed_size),
    nn.Embedding(num_embeddings=len(vocab), embedding_dim=embed_size))
```


## Training

训练函数的定义如下。由于填充的存在，损失函数的计算与之前的训练函数略有不同。

```python
def train(net, data_iter, lr, num_epochs, device=d2l.try_gpu()):
    def init_weight(m):
        if type(m) == nn.Embedding:
            nn.init.xavier_uniform_(m.weight)
    
    net.apply(init_weight)
    net = net.to(device)
    optimizer = torch.optim.Adam(net.parameters(), lr=lr)
    animator = d2l.Animator(xlabel='epoch', ylabel='loss', xlim=[1, num_epochs])
    metric = d2l.Accumulator(2)

    for epoch in range(num_epochs):
        timer, num_batches = d2l.Timer(), len(data_iter)
        for i, batch in enumerate(data_iter):
            optimizer.zero_grad()
            center, context_negative, mask, label = [data.to(device) for data in batch]

            pred = skip_gram(center, context_negative, net[0], net[1])
            l = (loss(pred.reshape(label.shape).float(), label.float(), mask) / mask.sum(axis=1) * mask.shape[1])
            l.sum().backward()
            optimizer.step()
            metric.add(l.sum(), l.numel())
            if (i + 1) % (num_batches // 5) == 0 or i == num_batches - 1:
                animator.add(epoch + (i + 1) / num_batches, (metric[0] / metric[1], ))
    print(f'loss {metric[0] / metric[1]:.3f}, '
          f'{metric[1] / timer.stop():.1f} tokens / sec on {str(device)}')
    d2l.plt.show()
```

现在， 我们可以使用负采样来训练 skip-gram 模型。

```python
lr, num_epochs = 0.01, 5
train(net, data_iter, lr, num_epochs)
```

输出

```
loss 0.373, 400873.1 tokens/sec on cuda:0
```

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1616601470687.png)


# Applying the Word Embedding Model

训练词嵌入模型后，可以根据两个词向量的余弦相似度来表示词与词之间的意义相似度。我们可以看到，在使用训练过的词嵌入模型时，与词chip的意思最接近的词大多与chips有关。


```python
def get_similar_tokens(query_token, k, embed):
    W = embed.weight.data
    x = W[vocab[query_token]]
    #--- 对input矩阵和vec向量执行矩阵-向量的乘法 ---
    cos = torch.mv(W, x) / torch.sqrt(torch.sum(W * W, dim=1) * torch.sum(x * x) + 1e-9)
    topk = torch.topk(cos, k=k+1)[1].cpu().numpy().astype('int32')
    for i in topk[1:]:
        print(f"cosine sim={float(cos[i]):.3f} : {vocab.idx_to_token[i]}")

```

输出：

```
cosine sim=0.525: intel
cosine sim=0.498: computers
cosine sim=0.489: user
```



# Summary

- 我们可以通过负采样训练一个 skip-gram 模型


# Exercises

1. 当创建nn.Embedding的实例时，设置sparse grad=True。它能加速训练吗？请查阅MXNet文档，了解这个参数的含义。
2. 试着找出其他单词的同义词。
3. 调整超参数，观察和分析实验结果。
4. 当数据集很大的时候， 仅当更新模型参数时， 我们通常在当前的minibatch中为中心目标词采样上下文词和噪声词。 换句话说，同一中心目标词在不同epoch可能有不同的上下文词或噪声词。这种训练的好处是什么?试着实现这个训练方法。