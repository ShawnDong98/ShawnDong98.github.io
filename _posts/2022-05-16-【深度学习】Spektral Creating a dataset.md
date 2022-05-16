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

所有 dataset 有一个 `path` 属性， 其表示数据存储的文件夹。 默认为 `~/.spektral/datasets/[ClassName]`。 