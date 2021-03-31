---
layout:     post
title:      "【d2l】Finding Synonyms and Analogies"
subtitle:   ""
date:       2021-03-31
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - d2l
    - NLP
---

在第14.4节中，我们在小规模数据集上训练了word2vec词嵌入模型，并使用词向量的余弦相似度搜索同义词。在实践中，在大规模语料库上预训练的词向量通常可以应用于下游的自然语言处理任务。本节将演示如何使用这些预先训练的词向量来查找同义词和类比词。我们将在后续章节中继续应用预先训练好的词向量。


```python
import os
import torch
from torch import nn
from d2l import torch as d2l
```

# Using Pretrained Word Vectors

下面列出了 预训练的维度为 50, 100 和 300 的 GloVe  embeddings， 它可以从 [GloVe website](https://nlp.stanford.edu/projects/glove/) 下载。 预先训练的fastText embeddings可以在多种语言中使用。这里我们使用一个英语版本(300维的 "wiki.en") ， 它可以从 [fastText website](https://fasttext.cc/)下载。


```python
#@save
d2l.DATA_HUB['glove.6b.50d'] = (d2l.DATA_URL + 'glove.6B.50d.zip',
                                '0b8703943ccdb6eb788e6f091b8946e82231bc4d')

#@save
d2l.DATA_HUB['glove.6b.100d'] = (d2l.DATA_URL + 'glove.6B.100d.zip',
                                 'cd43bfb07e44e6f27cbcc7bc9ae3d80284fdaf5a')

#@save
d2l.DATA_HUB['glove.42b.300d'] = (d2l.DATA_URL + 'glove.42B.300d.zip',
                                  'b5116e234e9eb9076672cfeabf5469f3eec904fa')

#@save
d2l.DATA_HUB['wiki.en'] = (d2l.DATA_URL + 'wiki.en.zip',
                           'c1816da3821ae9f43899be655002f6c723e91b88')
```

我们定义了下面的 TokenEmbedding 类 来加载 预训练 的  Glove 和 fastText embeddings。 


```python

```


接下来，我们在维基百科的一个子集上使用预训练的50维 Glove embeddings。当我们第一次创建一个预先训练的词嵌入实例时，相应的词嵌入会自动下载。

```python
glove_6b50d = TokenEmbedding('glove.6b.50d')
```

输出：

```
Downloading ../data/glove.6B.50d.zip from http://d2l-data.s3-accelerate.amazonaws.com/glove.6B.50d.zip...
```

输出词典大小。 词典包含 40 0000 个词 以及 一个特殊的 未知 token。 

```
len(glove_6b50d)
```

输出：

```
400001
```

我们可以用一个词在字典中得到它的索引，也可以从它的索引中得到这个词。


```python
glove_6b50d.token_to_idx['beautiful'], glove_6b50d.idx_to_token[3367]
```

输出：

```
(3367, 'beautiful')
```


# Applying Pretrained Word Vectors

下面，我们以GloVe为例，演示预训练词向量的应用。


## Finding Synonyms

这里，我们重新实现了第14.1节中介绍的通过余弦相似度搜索同义词的算法。

当寻找近义词时 为了复用 k近邻 算法的逻辑， 我们将这部分逻辑单独封装在 knn( k - nearest neighbors ) 函数中。

```python
def knn(W, x, k):
    # The added 1e-9 is for numerical stability
    cos = torch.mv(W, x.reshape(
        -1,)) / (torch.sqrt(torch.sum(W * W, axis=1) + 1e-9) * torch.sqrt(
            (x * x).sum()))
    _, topk = torch.topk(cos, k=k)
    return topk, [cos[int(i)] for i in topk]
```


$$\frac{Wx}{\sqrt{\sum\limits_{row} W^2}  * \sqrt{\sum (x^2)} + 10^{-9}} $$

$$\frac{x^Ty}{\|x\|\|y\|} \in [-1, 1]$$

也就是相当于有很多个 $x^T$ 组成了 $W$， 第一个式子中的 $x$ 对应第二个式子中的 $y$, 等价于对多个向量求余弦相似。 

然后，我们通过预训练词向量实例 embed 来搜索同义词。


```python
def get_similar_tokens(query_token, k, embed):
    topk, cos = knn(embed.idx_to_vec, embed[[query_token]], k + 1)
    for i, c in zip(topk[1:], cos[1:]):  # Remove input words
        print(f'cosine sim={float(c):.3f}: {embed.idx_to_token[int(i)]}')
```