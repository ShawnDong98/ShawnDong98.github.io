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


`display_anchors` 函数定义如下。 我们在feature map (fmap)上生成 Anchor框(anchors)，每个像素作为 Anchor框 的中心。因为 (x, y)-轴的 Anchor框 的坐标值除以特征图的宽和高， 因此值在0到1之间， 它们表示Anchor框在特征图上的相对位置。

由于 Anchor框 的中心分布在 feature map (fmap) 的所有像素上，这些中心必须根据它们的相对空间位置均匀分布在任何输入图像上。更具体地， 分别给定特征图的宽和高 `fmap_w` 和 `fmap_h`， 下面的函数在输入图像 `fmap_h` 行 和 `fmap_w` 列的像素上上均匀地采样。 以这些均匀采样的像素为中心， 生成不同尺度 $s$ 和 不同 ratios 的anchor框。


```
def display_anchors(fmap_w, fmap_h, s):
    d2l.set_figsize()
    # Values on the first two dimensions do not affect the output
    fmap = torch.zeros((1, 10, fmap_h, fmap_w))
    anchors = d2l.multibox_prior(fmap, sizes=s, ratios=[1, 2, 0.5])
    bbox_scale = torch.tensor((w, h, w, h))
    d2l.show_bboxes(d2l.plt.imshow(img).axes, anchors[0] * bbox_scale)
```

首先让我们考虑小目标的检测。 为了在显示时更容易区分，这里不同中心的 Anchor 框不重叠: Anchor框 ratios 设置为0.15, feature map的高度和宽度设置为4。我们可以看到， Anchor 框的中心 在图像上4行4列分布均匀。