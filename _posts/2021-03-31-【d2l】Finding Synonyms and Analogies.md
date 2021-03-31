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
