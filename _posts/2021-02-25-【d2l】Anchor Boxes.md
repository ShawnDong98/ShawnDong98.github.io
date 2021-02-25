---
layout:     post
title:      "【d2l】Anchor Boxes"
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


物体检测算法通常在输入图像中对大量区域进行采样，确定这些区域是否包含感兴趣的对象，并调整区域的边缘，以便更准确地预测目标的真实边界框。不同的模型可能使用不同的区域抽样方法。这里，我们介绍了一种这样的方法:它以每个像素为中心生成多个不同大小和长宽比的边框。这些边界框称为Anchor。我们将在下面几节中练习基于Anchor的对象检测。


首先，导入本节所需的包或模块。这里，我们修改了PyTorch的打印精度。因为打印张量实际上调用了PyTorch的打印函数，所以本节打印的张量中的浮点数更简洁。

```python
%matplotlib inline
from d2l import torch as d2l
import torch

torch.set_printoptions(2)
```


# Generating Multiple Anchor Boxes

假设输入图像的高度为 $h$，宽度为 $w$。我们生成以图像每个像素为中心的不同形状的Anchor。假设尺寸 $s \in (0, 1]$， 长宽比 $r > 0$， Anchor框的宽度和高度分别是 $ws\sqrt{r}$ 和 $hs / \sqrt{r}$。 当给定中心位置时，确定一个已知宽度和高度的Anchor框。

下面我们设置一组尺寸$s_1, ..., s_n$ 和 一组长宽比 $r_1, ..., r_m$。 如果我们使用所有大小和长宽比的组合，以每个像素为中心，输入图像将有 $whnm$ 个 Anchor 框。尽管这些 Anchor 框可以覆盖所有的ground-truth边界框，但计算复杂度往往过高。因此，我们通常只对包含 $s1$ 或 $r1$ 大小和纵横比的组合感兴趣，也就是说：

$$(s_1, r_1), (s_1, r_2), ..., (s_1, r_m), (s_2, r_1), (s_3, r_1), ..., (s_n, r_1) \tag{1}$$

即，以同一像素为中心的 Anchor 框个数为 $n + m - 1$。对于整个输入图像，我们将生成总共 $wh(n + m - 1)$ 个Anchor框。

上述产生Anchor框的方式由 multibox_prior 函数实现。 我们指定输入、一组大小和一组长宽比，这个函数将返回所有输入的 Anchor 框。


```python
#@save
def multibox_prior(data, sizes, ratios):
    in_height, in_width = data.shape[-2:]
    device, num_sizes, num_ratios = data.device, len(sizes), len(ratios)
    boxes_per_pixel = (num_sizes + num_ratios - 1)
    size_tensor = torch.tensor(sizes, device=device)
    ratio_tensor = torch.tensor(ratios, device=device)
    # Offsets are required to move the anchor to center of a pixel
    # Since pixel (height=1, width=1), we choose to offset our centers by 0.5
    offset_h, offset_w = 0.5, 0.5
    steps_h = 1.0 / in_height  # Scaled steps in y axis
    steps_w = 1.0 / in_width  # Scaled steps in x axis

    # Generate all center points for the anchor boxes
    center_h = (torch.arange(in_height, device=device) + offset_h) * steps_h
    center_w = (torch.arange(in_width, device=device) + offset_w) * steps_w
    shift_y, shift_x = torch.meshgrid(center_h, center_w)
    shift_y, shift_x = shift_y.reshape(-1), shift_x.reshape(-1)

    # Generate boxes_per_pixel number of heights and widths which are later
    # used to create anchor box corner coordinates (xmin, xmax, ymin, ymax)
    # cat (various sizes, first ratio) and (first size, various ratios)
    w = torch.cat((size_tensor * torch.sqrt(ratio_tensor[0]),
                   sizes[0] * torch.sqrt(ratio_tensor[1:])))\
                   * in_height / in_width  # handle rectangular inputs
    h = torch.cat((size_tensor / torch.sqrt(ratio_tensor[0]),
                   sizes[0] / torch.sqrt(ratio_tensor[1:])))
    # Divide by 2 to get half height and half width
    anchor_manipulations = torch.stack((-w, -h, w, h)).T.repeat(
                                        in_height * in_width, 1) / 2

    # Each center point will have boxes_per_pixel number of anchor boxes, so
    # generate grid of all anchor box centers with boxes_per_pixel repeats
    out_grid = torch.stack([shift_x, shift_y, shift_x, shift_y],
                dim=1).repeat_interleave(boxes_per_pixel, dim=0)

    output = out_grid + anchor_manipulations
    return output.unsqueeze(0)
```

Q: 

```python
w = torch.cat((size_tensor * torch.sqrt(ratio_tensor[0]),
                   sizes[0] * torch.sqrt(ratio_tensor[1:])))\
                   * in_height / in_width
```

为什么这里要乘以 in_height / in_width ?

A： 由于ssd最初是为方形图像（300x300）开发的，因此 in_height / in_width 用于处理矩形输入。


可以看出，返回的 Anchor 框变量y的形状为 (batch size，number of anchor boxes，4)。


```python
img = d2l.plt.imread('../img/catdog.jpg')
h, w = img.shape[0:2]

print(h, w)
X = torch.rand(size=(1, 3, h, w))  # Construct input data
Y = multibox_prior(X, sizes=[0.75, 0.5, 0.25], ratios=[1, 2, 0.5])
Y.shape
```

```
561 728
```

```
torch.Size([1, 2042040, 4])
```


将Anchor框的形状变量 y 改变为(图像高度，图像宽度，以同一像素为中心的Anchor框数量，4)后，我们可以得到以指定像素为中心的所有Anchor框。在下面的例子中，我们访问第一个以(250,250)为中心的Anchor框。它有四个元素:位于Anchor框左上角的x、y轴坐标和位于Anchor框右下角的x、y轴坐标。x 轴和 y 轴的坐标值分别除以图像的宽度和高度，取值范围为 $0 \thicksim 1$。


```python
boxes = Y.reshape(h, w, 5, 4)
boxes[250, 250, 0, :]
```

```
tensor([0.06, 0.07, 0.63, 0.82])
```

为了描述图像中以一个像素为中心的所有Anchor框，我们首先定义 show_bboxes 函数来在图像上绘制多个边界框。


```python
#@save
def show_bboxes(axes, bboxes, labels=None, colors=None):
    """Show bounding boxes."""
    def _make_list(obj, default_values=None):
        if obj is None:
            obj = default_values
        elif not isinstance(obj, (list, tuple)):
            obj = [obj]
        return obj

    labels = _make_list(labels)
    colors = _make_list(colors, ['b', 'g', 'r', 'm', 'c'])
    for i, bbox in enumerate(bboxes):
        color = colors[i % len(colors)]
        rect = d2l.bbox_to_rect(bbox.detach().numpy(), color)
        axes.add_patch(rect)
        if labels and len(labels) > i:
            text_color = 'k' if color == 'w' else 'w'
            axes.text(rect.xy[0],
                      rect.xy[1],
                      labels[i],
                      va='center',
                      ha='center',
                      fontsize=9,
                      color=text_color,
                      bbox=dict(facecolor=color, lw=0))
```

正如我们刚才看到的，变量框中的 $x$ 轴和 $y$ 轴的坐标值分别除以图像的宽度和高度。在绘制图像时，我们需要恢复Anchor框的原始坐标值，因此定义变量 bbox_scale。现在，我们可以在图像中以(250,250)为中心绘制所有Anchor框。如你所见，大小为0.75、宽高比为1的蓝色Anchor框很好地覆盖了图像中的狗。


```python
d2l.set_figsize()
bbox_scale = torch.tensor((w, h, w, h))
fig = d2l.plt.imshow(img)
show_bboxes(fig.axes, boxes[250, 250, :, :] * bbox_scale,
            ['s=0.75, r=1', 's=0.5, r=1', 's=0.25, r=1', 's=0.75, r=2',
             's=0.75, r=0.5'])
```

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1614252778578.png)



# Intersection over Union

我们刚刚提到，Anchor框很好地覆盖了图像中的狗。如果目标的真实边界框是已知的，怎么能很好地在这里量化？一种直观的方法是测量Anchor框与真实边界框之间的相似性。我们知道，Jaccard指标可以度量两个集合之间的相似性。给定集合 $A$ 和 $B$，它们的Jaccard索引是它们交集的大小除以它们并集的大小。

$$J(A, B) = \frac{\mid A \cap B \mid}{\mid A \cup B \mid} \tag{2}$$

事实上，我们可以把边界框的像素区域看作是像素的集合。这样，我们就可以通过两个边界框的像素集的Jaccard索引来度量这两个边界框的相似性。当我们测量两个边界框的相似性时，我们通常将Jaccard指标称为交并比(intersection over union, IoU)，它是两个边界框相交面积与并集面积的比值，如图所示。IoU的取值范围为 $0 \thicksim 1$, 0表示两个边界框之间没有重叠像素，1表示两个边界框相等。

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1614254977866.png)

在本节的其余部分中，我们将使用IoU来度量Anchor框和ground-truth边界框以及不同Anchor框之间的相似性。


```
#@save
def box_iou(boxes1, boxes2):
    """Compute IOU between two sets of boxes of shape (N,4) and (M,4)."""
    # Compute box areas
    box_area = lambda boxes: ((boxes[:, 2] - boxes[:, 0]) *
                              (boxes[:, 3] - boxes[:, 1]))
    area1 = box_area(boxes1)
    area2 = box_area(boxes2)
    lt = torch.max(boxes1[:, None, :2], boxes2[:, :2])  # [N,M,2]
    rb = torch.min(boxes1[:, None, 2:], boxes2[:, 2:])  # [N,M,2]
    wh = (rb - lt).clamp(min=0)  # [N,M,2]
    inter = wh[:, :, 0] * wh[:, :, 1]  # [N,M]
    unioun = area1[:, None] + area2 - inter
    return inter / unioun
```
