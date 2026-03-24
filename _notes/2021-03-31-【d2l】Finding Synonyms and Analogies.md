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

在第14.4节中，我们在小规模数据集上训练了word2vec词嵌入模型，并使用词向量的余弦相似度搜索同义词。在实践中，在大规模语料库上预训练的词向量通常可以应用于下游的自然语言处理任务。本节将演示如何使用这些预训练的词向量来查找同义词和类比词。我们将在后续章节中继续应用预训练好的词向量。


```python
import os
import torch
from torch import nn
from d2l import torch as d2l
```

# Using Pretrained Word Vectors

下面列出了 预训练的维度为 50, 100 和 300 的 GloVe  embeddings， 它可以从 [GloVe website](https://nlp.stanford.edu/projects/glove/) 下载。 预训练的fastText embeddings可以在多种语言中使用。这里我们使用一个英语版本(300维的 "wiki.en") ， 它可以从 [fastText website](https://fasttext.cc/)下载。


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
class TokenEmbedding:
    """Token Embedding."""
    def __init__(self, embedding_name):
        self.idx_to_token, self.idx_to_vec = self._load_embedding(
            embedding_name)
        self.unknown_idx = 0
        self.token_to_idx = {
            token: idx for idx, token in enumerate(self.idx_to_token)}

    def _load_embedding(self, embedding_name):
        idx_to_token, idx_to_vec = ['<unk>'], []
        data_dir = d2l.download_extract(embedding_name)
        # GloVe website: https://nlp.stanford.edu/projects/glove/
        # fastText website: https://fasttext.cc/
        with open(os.path.join(data_dir, 'vec.txt'), 'r') as f:
            for line in f:
                print(line)
                elems = line.rstrip().split(' ')
                token, elems = elems[0], [float(elem) for elem in elems[1:]]
                # Skip header information, such as the top row in fastText
                if len(elems) > 1:
                    idx_to_token.append(token)
                    idx_to_vec.append(elems)
        idx_to_vec = [[0] * len(idx_to_vec[0])] + idx_to_vec
        return idx_to_token, torch.tensor(idx_to_vec)

    def __getitem__(self, tokens):
        indices = [
            self.token_to_idx.get(token, self.unknown_idx)
            for token in tokens]
        vecs = self.idx_to_vec[torch.tensor(indices)]
        return vecs

    def __len__(self):
        return len(self.idx_to_token)

```


接下来，我们在维基百科的一个子集上使用预训练的50维 Glove embeddings。当我们第一次创建一个预训练的词嵌入实例时，相应的词嵌入会自动下载。

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
    #--- x.reshape(-1, ) 等于将x转置， 行向量变列向量---
    #--- torch.sqrt(torch.sum(W * W, axis=1) + 1e-9) 为 词典向量的模 ---
    #--- torch.sqrt((x * x).sum()) 为 query 向量的模 ---
    #--- torch.sum(W * W, axis=1)： 在列维度求和， 也就是对行求和 ---
    cos = torch.mv(W, x.reshape(
        -1,)) / (torch.sqrt(torch.sum(W * W, axis=1) + 1e-9) * torch.sqrt(
            (x * x).sum()))
    _, topk = torch.topk(cos, k=k)
    return topk, [cos[int(i)] for i in topk]
```


$$\frac{Wx}{\sqrt{\sum\limits_{row} W^2}  * \sqrt{\sum (x^2)} + 10^{-9}} $$

$$\frac{x^Ty}{\|x\|\|y\|} \in [-1, 1]$$

也就是相当于有很多个 $x^T$ 组成了 $W$， 第一个式子中的 $x$ 对应第二个式子中的 $y$, 等价于对多个向量求余弦相似度。 

然后，我们通过预训练词向量实例 embed 来搜索同义词。


```python
def get_similar_tokens(query_token, k, embed):
    topk, cos = knn(embed.idx_to_vec, embed[[query_token]], k + 1)
    for i, c in zip(topk[1:], cos[1:]):  # Remove input words
        print(f'cosine sim={float(c):.3f}: {embed.idx_to_token[int(i)]}')
```

预训练词向量实例 glove_6b50d 的词典 已经创建了包含 40 0000 个词 和 一个特殊的位置 token。 排除输入的单词和未知的单词，我们搜索三个单词在意义上与chip最相似的单词。


```python
get_similar_tokens('chip', 3, glove_6b50d)
```

输出：

```
cosine sim=0.856: chips
cosine sim=0.749: intel
cosine sim=0.749: electronics
```

接下来，我们寻找baby和beautiful的同义词。

```python
get_similar_tokens('baby', 3, glove_6b50d)
```

输出：

```
cosine sim=0.839: babies
cosine sim=0.800: boy
cosine sim=0.792: girl
```


```python
get_similar_tokens('beautiful', 3, glove_6b50d)
```

输出：

```
cosine sim=0.921: lovely
cosine sim=0.893: gorgeous
cosine sim=0.830: wonderful
```

# Finding Analogies

除了寻找同义词外，我们还可以使用预训练的词向量来寻找词之间的类比。例如， "man" : "woman":: "son":"daughter"是一个类比的例子， "man"对应 "woman" 就像 "son" 对应 "daughter"。 寻找类比的问题可以这样定义：在类比关系中的四个词 a : b :: c : d， 给定前三个词 a, b 和 c， 我们想要找到 d。 假设对于词 $w$ 的词向量 是 $vec(w)$。 为了解决类比问题，我们需要找到与 $vec(c) + vec(b) - vec(a)$ 的结果向量最相似的词向量。

```python
def get_analogy(token_a, token_b, token_c, embed):
    vecs = embed[[token_a, token_b, token_c]]
    x = vecs[1] - vecs[0] + vecs[2]
    topk, cos = knn(embed.idx_to_vec, x, 1)
    return embed.idx_to_token[int(topk[0])]  # Remove unknown words
```

验证 “male-female” 的类比。

```python
get_analogy('man', 'woman', 'son', glove_6b50d)
```

输出：

```
'daughter'
```

"Capital-country" 类比： "beijing" 对 “china”， "tokyo" 对 什么？ 答案应该是 “japan”。

```python
get_analogy('beijing', 'china', 'tokyo', glove_6b50d)
```

输出：

```
'japan'
```

"Adjective-superlative adjective" 类比： “bad” 对应 “worst”， “big” 对应 什么？ 答案应该是 "biggest"。

```python
get_analogy('bad', 'worst', 'big', glove_6b50d)
```

输出：

```
'biggest'
```

"Present tense verb-past tense verb" 类比： “do” 对应 “did”， “go” 对应 什么？ 答案应该是 "went"。

```python
get_analogy('do', 'did', 'go', glove_6b50d)
```

输出：

```
'went'
```

# Summary

- 在大规模语料库上预训练的词向量通常可以用于下游的自然语言处理任务。
- 我们可以使用预训练的词向量来寻找同义词和类比。

# Exercises

1. 使用 TokenEmbedding('wiki.en') 测试 fastText 的结果。
2. 如果词典非常大，我们怎么能加速查找同义词和类比？

