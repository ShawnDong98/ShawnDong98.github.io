---
layout:     post
title:      "【深度学习】Spektral Creating a dataset"
subtitle:   ""
date:       2022-05-16
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - GNN & GCN
---

# Creating a Custom Dataset


`Dataset` 类是 Spektral 1.0的一个新特性，它标准化了 Spektral 中图数据集的表示方式。

在本教程中，我们将通过一个简单的例子来创建一个自定义数据集。

如果你想公开分享你的数据集或将它们包含在Spektral中，这也很有用。


## Essential information

您可以通过继承 `spektral.data.Dataset` 类来创建数据集。

datasets 的核心是 `read()` 方法。这在数据集的每次实例化时被调用，并且必须返回`spektral.data.Graph` 的列表。从文件中读取数据或动态创建数据并不重要，这是数据集在内存中加载的位置。

所有 dataset 有一个 `path` 属性， 其表示数据存储的文件夹。 默认为 `~/.spektral/datasets/[ClassName]`。 你可以忽略它。但是，每次实例化数据集时，它将检查路径是否存在。如果没有，将调用download()方法。

可以使用 `download()` 定义将原始数据保存到磁盘所需的任何额外操作。该方法将在 `read()` 之前被调用。

`read()` 和 `download()` 都由数据集的 `init()` 方法调用。如果需要重写数据集的初始化，请 在实现的某个地方(通常在最后一行)确保调用 `super().Init()`。


## Example

这是一个简单的示例，展示了如何使用五个随机图创建自定义数据集。我们假设数据来自在线数据源，这样就可以演示如何使用 `download()`。


我们首先覆盖 `init()` 方法，以存储数据集的一些自定义参数。

```python
class MyDataset(Dataset):
    """
    A dataset of five random graphs.
    """
    def __init__(self, nodes, feats, **kwargs):
        self.nodes = nodes
        self.feats = feats

        super().__init__(**kwargs)
```


