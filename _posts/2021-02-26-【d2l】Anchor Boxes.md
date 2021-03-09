---
layout:     post
title:      "【d2l】Anchor Boxes"
subtitle:   ""
date:       2021-02-26
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

事实上，我们可以把边界框的像素区域看作是像素的集合。这样，我们就可以通过两个边界框的像素集的Jaccard索引来度量这两个边界框的相似性。当我们测量两个边界框的相似性时，我们通常将Jaccard指标称为交并比(intersection over union, IoU)，它是两个边界框相交面积与并集面积的比值，如图13.4.1所示。IoU的取值范围为 $0 \thicksim 1$, 0表示两个边界框之间没有重叠像素，1表示两个边界框相等。

![Fig. 13.4.1 IoU是两个边界框的相交面积与合并面积的比值。](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1614254977866.png)

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

它的输出为 (N, M)， N为 Anchor Box 个数， M 为 Ground-truth Box 个数。 

# Labeling Training Set Anchor Boxes

在训练集中，我们将每个Anchor框作为一个训练示例。为了训练目标检测模型，我们需要为每个Anchir框标记两种类型的标签:一是Anchor框中包含的目标类别(category)，二是ground-truth边界框相对于Anchor框的偏移量(offset)。在目标检测中,我们首先生成多个Anchor框, 预测每个Anchor框的category和offset,根据预测的offset调整Anchor框位置得到用于预测的边界框,最后过滤需要输出的预测边界框。

我们知道，在目标检测训练集中，每一幅图像都标记有ground-truth边界框的位置和包含的目标类别。Anchor框生成后，我们主要根据与Anchor框相似的ground-truth边界框的位置和category信息对Anchor框进行标签。那么我们如何分配ground-truth边界框到类似的Anchor框呢？

假设在图像中的Anchor框是$A_1, A_2, ..., A_{n_a}$以及ground-truth框是$B_1, B_2, ..., B_{n_b}$， 并且$n_a > n_b$。 定义矩阵 $X \in R^{n_a \times n_b}$, 其中第 $i$ 行和第 $j$ 列的$x_{ij}$是Anchor框 $A_i$ 和 ground-truth 边界框 $B_j$的交并比。首先，我们找到矩阵 $X$ 中最大的元素，并记录该元素的行索引和列索引为 $i_1$, $j_1$。我们将ground-truth边界框 $B_{j_1}$分配给Anchor框$A_{i_1}$。显然，Anchor框 $A_{i_1}$ 与 ground-truth 边界框 $B_{j_1}$ 在 所有Anchor框 和 ground-truth 边界框对 中相似性最高。接下来，丢弃矩阵 $X$ 中第$i_1$ 行和第 $j_1$ 列中的所有元素。找到矩阵 $X$ 中剩余的最大元素，并记录该元素的行索引和列索引为 $i_2$,  $j_2$。我们将ground-truth边界框 $B_{j_2}$ 分配给 Anchor框 $A_{i_2}$ ，然后丢弃矩阵 $X$ 中第 $i_2$ 行和 $j_2$ 列中的所有元素。此时，矩阵 $X$ 中的两行和两列中的元素已经被丢弃。

我们继续，直到丢弃矩阵 $X$ 中 $n_b$ 列中的所有元素。此时，我们已经为 $n_b$ 个Anchor框中的每个Anchor框分配了一个ground-truth边界框。接下来，我们只遍历剩下的 $n_a - n_b$ Anchor框。给定Anchor框 $A_i$，根据矩阵 $X$ 的第 $i$ 行，找到 $Ai$ 交并比最大的边界框 $B_j$，当交并比大于预定阈值时，才将 ground-truth 边界框 $B_j$ 赋给Anchor框 $A_i$。


如图13.4.2(左)所示，假设矩阵 $X$ 的最大值为 $x_{23}$，则我们将 ground-truth 边界框 $B_3$ 赋值给Anchor框 $A_2$。然后，我们丢弃矩阵第2行和第3列的所有元素，找到剩余阴影区域中最大的元素 $x_{71}$，并将ground-truth边界框 $B_1$ 赋值给Anchor框 $A_7$。然后，如图13.4.2(中)所示，去掉矩阵第7行、第1列的所有元素，找到剩余阴影区域最大的元素 $x_{54}$ ，将ground-truth边界框 $B_4$ 赋值给Anchor框 $A_5$。最后，如图13.4.2(右)所示，去掉矩阵第5行、第4列的所有元素，找到剩余阴影区域最大的元素 $x_{92}$，将 ground-truth 边界框 $B_2$ 赋值给Anchor框 $A_9$。然后，我们只需要遍历剩下的Anchor框 $A_1$, $A_3$, $A_4$, $A_6$, $A_8$，并根据阈值决定是否为剩下的Anchor框分配ground-truth边界框。

![Fig. 13.4.2 将ground-truth边界框分配给Anchor框。](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1614333784553.png)



```python
#@save
def match_anchor_to_bbox(ground_truth, anchors, device, iou_threshold=0.5):
    """Assign ground-truth bounding boxes to anchor boxes similar to them."""
    num_anchors, num_gt_boxes = anchors.shape[0], ground_truth.shape[0]
    jaccard = box_iou(anchors, ground_truth) # (num_anchors, num_gt_boxes), (N, M)
    # hash_map, key: anc_i, value: box_j
    anchors_bbox_map = torch.full((num_anchors,), -1, dtype=torch.long, device=device)
    # Assign ground truth bounding box according to the threshold
    max_ious, indices = torch.max(jaccard, dim=1)
    print(max_ious.shape)
    print(torch.nonzero(max_ious >= 0.5).shape)
    anc_i = torch.nonzero(max_ious >= 0.5).reshape(-1)
    # print(anc_i.shape)
    box_j = indices[max_ious >= 0.5]
    anchors_bbox_map[anc_i] = box_j
    # Find the largest iou for each bbox
    col_discard = torch.full((num_anchors,), -1)
    row_discard = torch.full((num_gt_boxes,), -1)
    for _ in range(num_gt_boxes):
        max_idx = torch.argmax(jaccard)
        box_idx = (max_idx % num_gt_boxes).long()
        anc_idx = (max_idx / num_gt_boxes).long()
        anchors_bbox_map[anc_idx] = box_idx
        # 用 -1 表示丢弃 box
        jaccard[:, box_idx] = col_discard
        jaccard[anc_idx, :] = row_discard
    return anchors_bbox_map
```


现在我们可以标记 Anchor 框的类别和偏移量。如果 Anchor框  A 被指定为 ground-truth bbox 框 B，则Anchor框A的类别为B的类别。根据 B和 A 中心坐标的相对位置以及两个框的相对大小设置Anchor框A的偏移量。由于数据集中不同框的位置和大小可能不同，这些相对位置和相对大小通常需要一些特殊的变换，以使偏移量分布更均匀，更容易拟合。设Anchor框 A 及其指定的ground-truth bbox框B的中心坐标为 $(xa_, y_a)$，$(x_b, y_b)$， A 和 B 的宽度分别为 $w_a, w_b$，高度分别为 $h_a, h_b$。在这种情况下，一种常见的技术是将$A$ 的偏移量标记为

$$(\frac{\frac{x_b - x_a}{w_a} - \mu_x}{\sigma_x}, \frac{\frac{y_b - y_a}{h_a} - \mu_y}{\sigma_y},  \frac{log \frac{w_b}{w_a} - \mu_w}{\sigma_w}, \frac{log\frac{h_b}{h_a} - \mu_h}{\sigma_h})$$

这些常量的默认值为 $\mu_x = \mu_y = \mu_w = \mu_h = 0, \sigma_x = \sigma_y = 0.1, \sigma_w = \sigma_h = 0.2$。  这个变换在下面的 offset_boxes 函数中实现。如果Anchor框没有被指定为ground-truth边界框，我们只需要将Anchor框的类别设置为background。分类为背景的Anchor 框通常被称为负Anchor框，其余的被称为正Anchor框。


```python

```

下面我们将演示一个详细的示例。我们为读取的图片中的猫和狗定义 ground-truth bbox， 第一个要素是类别(猫为1， 狗为0)和剩下的四个要素是 $x, y$ 轴的左上角坐标 和 $x, y$ 轴的右下角坐标(0和1之间的值范围)。这里，我们构造了5个Anchor框，分别用左上角和右下角的坐标进行标记，分别记录为 $A_0、、A_4$ (程序中的索引从0开始)。首先，在图像中绘制这些Anchor框和ground-truth边界框的位置。


```python
ground_truth = torch.tensor([[0, 0.1, 0.08, 0.52, 0.92],
                         [1, 0.55, 0.2, 0.9, 0.88]])
anchors = torch.tensor([[0, 0.1, 0.2, 0.3], [0.15, 0.2, 0.4, 0.4],
                    [0.63, 0.05, 0.88, 0.98], [0.66, 0.45, 0.8, 0.8],
                    [0.57, 0.3, 0.92, 0.9]])

fig = d2l.plt.imshow(img)
show_bboxes(fig.axes, ground_truth[:, 1:] * bbox_scale, ['dog', 'cat'], 'k')
show_bboxes(fig.axes, anchors * bbox_scale, ['0', '1', '2', '3', '4'])
```


![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1615284237993.png)



我们可以使用 multibox_target 函数为 Anchor框标记类别和偏移量。

