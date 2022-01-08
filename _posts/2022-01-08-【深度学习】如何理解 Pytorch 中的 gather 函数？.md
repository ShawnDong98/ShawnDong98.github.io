---
layout:     post
title:      "【深度学习】如何理解 Pytorch 中的 gather 函数？"
subtitle:   ""
date:       2022-01-08
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - 
---

Pytorch 文档中这么写到：

```
torch.gather(input, dim, index, out=None, sparse_grad=False) → Tensor

Gathers values along an axis specified by dim.
```

因此， 它沿着 `axis` 来搜集值。 但是它和普通的索引有什么区别呢？ 假设我们有一个 $4 \times 6$ 的矩阵(4 表示 batch size, 6 表示 features)。 当我们使用 `x[_, :]` 或者 `x[:, _]`， 我们将从 batch / feature 中选择相同的索引， 如下图所示：

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1641628753985.png)

假设有下面一种情况： 我们想选择第0行第3个特征， 第1行的第7个特征， 第2行的第4个特征以及第3行的第1个特征(索引从0开始)。

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1641628901637.png)

我们可能会想要这么做：

```python
indices = torch.LongTensor([3,7,4,1])
x[:, indices]
```

但是我们会得到:

```python
tensor([[ 3,  7,  4,  1],
        [13, 17, 14, 11],
        [23, 27, 24, 21],
        [33, 37, 34, 31]])
```

现在， 我们就需要 `gather` 函数。

`gather` 函数有三个参数：

- input： 输入的 tensor
- dim： 收集值沿着的维度
- index： 要从

特别地， `input` 和 `index` 的维度除了在 `dim` 维度外的其他维度需要相同。 例如， `input` 的形状是 $4 \times 10 \times 15$， `dim` 为 0， 那么 `index` 必须是 $N \times 10 \times 15$ 

# Reference
1. [Understanding indexing with pytorch gather](https://medium.com/analytics-vidhya/understanding-indexing-with-pytorch-gather-33717a84ebc4)