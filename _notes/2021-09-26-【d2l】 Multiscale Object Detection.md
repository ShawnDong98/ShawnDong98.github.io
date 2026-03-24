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

```python
display_anchors(fmap_w=4, fmap_h=4, s=[0.15])
```

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1632636515778.png)


我们继续将特征图的高度和宽度减半，并使用更大的 Anchor框 来检测更大的对象。当比例设置为0.4时，一些Anchor框 会相互重叠。

```python
display_anchors(fmap_w=2, fmap_h=2, s=[0.4])
```

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1632637436922.png)

最后，我们进一步将feature map的高度和宽度减半，将anchor框 ratio 增加到0.8。现在锚框的中心就是图像的中心。

```
display_anchors(fmap_w=1, fmap_h=1, s=[0.8])
```

# Multiscale Detection

我们已经生成了多尺度 Anchor框，我们将使用它们来检测不同尺度下不同大小的物体。下面我们介绍一种基于CNN的多尺度目标检测方法，我们将在 Section 13.7 中实现它。

在某个尺度下， 假设我们有形状为 $h \times w$ 的 $c$ 个特征图。 使用 13.5.1 的方法， 我们生成 $hw$ 组 anchor 框， 每一组有相同中心的 $a$ 个 anchor框。 例如， 在13.5.1节中实验的第一个尺度， 给定10个通道的 $4 \times 4$ 的特征图， 我们生成 16 组anchor框， 每一组包含三个相同中心的 anchor框。 接下来， 每个 anchor框用 class 和 ground truth 边界框标记。 在当前尺度， 目标检测模型需要预测标签以及 $hw$ 组anchor框的偏移量。


假设CNN前向传播得到的中间输出有 $c$ 个特征图。 因为在每个特征图上有 $hw$ 个不同空间位置， 相同空间位置可以认为有 $c$ 个像素。根据 4.2节中感受野的定义， 在特征图相同空间位置的 $c$ 个像素有相同的感受野： 它们表示相同感受野的输入图像的信息。 因此， 我们可以将在相同位置的特征图的 $c$ 个像素转换为 class 以及 该空间位置生成的 $a$ 个 anchor 框的偏移量。本质上，我们利用输入图像在某个感受野中的信息来预测输入图像上靠近该感受野的 Anchor框 的类别和偏移量。

当不同层的特征图在输入图像上具有不同大小的感受野时，可以用来检测不同大小的目标。例如，我们可以设计一个神经网络，在这个神经网络中，靠近输出层的特征图单元具有更宽的感受野，因此它们可以从输入图像中检测出更大的物体。

简而言之，我们可以利用深度神经网络在多个层次上对图像的分层表示来进行多尺度目标检测。在第13.7节中，我们将通过一个具体的例子来展示它是如何工作的。