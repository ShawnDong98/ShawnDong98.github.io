---
layout:     post
title:      "【d2l】Object Detection and Bounding Boxes"
subtitle:   ""
date:       2021-02-25
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - CV
    - d2l
---


在上一节中，我们介绍了许多用于图像分类的模型。 在图像分类任务中，我们假设图像中只有一个主要目标，并且我们仅关注于如何识别目标类别。但是，在许多情况下，我们感兴趣的是图像中的多个目标。我们不仅要对它们进行分类，而且还要获得它们在图像中的特定位置。在计算机视觉中，我们将这些任务称为物体检测（或物体识别）。

目标检测广泛应用于许多领域。 例如，在自动驾驶技术中，我们需要通过在捕获的视频图像中识别车辆，行人，道路和障碍物的位置来规划路线。机器人通常执行此类任务以检测感兴趣的目标。 安全领域的系统需要检测异常目标，例如入侵者或炸弹。

在接下来的几节中，我们将介绍用于物体检测的多个深度学习模型。 在此之前，我们应该讨论目标位置的概念。 首先，导入实验所需的包和模块。


```python
#@tab pytorch
%matplotlib inline
from d2l import torch as d2l
import torch
```

接下来，我们将加载将在本节中使用的示例图像。 我们可以看到图像左侧有一只狗，右侧有一只猫。 它们是该图中的两个主要目标。

```python
#@tab pytorch, tensorflow
d2l.set_figsize()
img = d2l.plt.imread('../img/catdog.jpg')
d2l.plt.imshow(img);
```


# Bounding Box

在物体检测中，我们通常使用边界框来描述目标位置。边界框是一个矩形框，可以由矩形左上角的 $x$ 和 $y$ 轴坐标以及矩形右下角的 $x$ 和 $y$ 轴坐标确定。另一个常用的边界框表示形式是边界框中心的 $x$ 和 $y$ 轴坐标及其宽度和高度。在这里，我们定义了在这两种表示形式之间进行转换的函数，box_corner_to_center从两角表示转换为中心宽度-高度表示，box_center_to_corner则相反。输入参数 boxes 可以是长度 $4$ 张量，也可以是 $(N，4)$ 二维张量。


```python
#@tab all
#@save
def box_corner_to_center(boxes):
    """Convert from (upper_left, bottom_right) to (center, width, height)"""
    x1, y1, x2, y2 = boxes[:, 0], boxes[:, 1], boxes[:, 2], boxes[:, 3]
    cx = (x1 + x2) / 2
    cy = (y1 + y2) / 2
    w = x2 - x1
    h = y2 - y1
    boxes = d2l.stack((cx, cy, w, h), axis=-1)
    return boxes

#@save
def box_center_to_corner(boxes):
    """Convert from (center, width, height) to (upper_left, bottom_right)"""
    cx, cy, w, h = boxes[:, 0], boxes[:, 1], boxes[:, 2], boxes[:, 3]
    x1 = cx - 0.5 * w
    y1 = cy - 0.5 * h
    x2 = cx + 0.5 * w
    y2 = cy + 0.5 * h
    boxes = d2l.stack((x1, y1, x2, y2), axis=-1)
    return boxes
```


我们将基于坐标信息在图像中定义狗和猫的边界框。 图像中坐标的原点是图像的左上角，而右侧和下方分别是 $x$ 轴和 $y$ 轴的正方向。

```python
#@tab all
# bbox is the abbreviation for bounding box
dog_bbox, cat_bbox = [60.0, 45.0, 378.0, 516.0], [400.0, 112.0, 655.0, 493.0]
```

我们可以通过两次转换来验证 box 转换函数的正确性。

```python
#@tab all
boxes = d2l.tensor((dog_bbox, cat_bbox))
box_center_to_corner(box_corner_to_center(boxes)) - boxes
```


我们可以在图像中绘制边界框以检查其是否正确。 在绘制 box 之前，我们将定义一个辅助函数bbox_to_rect。 它以matplotlib的边界框格式表示边界框。


```python
#@tab all
#@save
def bbox_to_rect(bbox, color):
    """Convert bounding box to matplotlib format."""
    # Convert the bounding box (top-left x, top-left y, bottom-right x,
    # bottom-right y) format to matplotlib format: ((upper-left x,
    # upper-left y), width, height)
    return d2l.plt.Rectangle(
        xy=(bbox[0], bbox[1]), width=bbox[2]-bbox[0], height=bbox[3]-bbox[1],
        fill=False, edgecolor=color, linewidth=2)
```

将边界框加载到图像上后，我们可以看到目标的主要轮廓基本上在该框内。
