---
layout:     post
title:      "【d2l】 Multiscale Object Detection"
subtitle:   ""
date:       2021-09-26
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - d2l
---


在第13.4节中，我们生成了多个以输入图像的每个像素为中心的 Anchor 框。本质上，这些 Anchor框 代表了图像不同区域的样本。然而，如果每个像素都生成 Anchor框，我们可能会遇到计算 太多Anchor框 的问题。考虑一个 $561 \times 728$ 的输入图像。  如果以每个像素为中心生成五个不同形状的 Anchor框， 在图像上超过两百万个 Anchor框 ($561 \times 728 \times 5$) 需要被标注和预测。

# Multiscale Anchor Boxes

你可能会意识到减少图像上的 Anchor框 并不困难。例如，我们可以从输入图像中均匀采样一小部分像素，生成以它们为中心的 Anchor框。此外，在不同的尺度下，我们可以生成不同大小的不同数量的 Anchor框。从直觉上看，较小的物体比较大的物体更容易出现在图像上。例如， $1 \times 1$， $1 \times 2$， 以及 $2 \times 2$ 出现在 $2 \times 2$ 的图像上分别有 4, 2, 1 种可能。 因此，当使用较小的 Anchor框 检测较小的目标时，我们可以取样更多的区域，而对于较大的目标，我们可以取样较少的区域。

为了演示如何在多个尺度上生成 Anchor框，让我们读取一个图像。它的高度和宽度分别为561和728像素。


```python
%matplotlib inline
import torch
from d2l import torch as d2l

img = d2l.plt.imread('../img/catdog.jpg')
h, w = img.shape[:2]
h, w
```


```
(561, 728)
```


回想一下，在第6.2节中，我们将卷积层的二维数组输出称为特征映射。通过定义特征图形状，我们可以确定任意图像上均匀采样的 Anchor框 中心。
