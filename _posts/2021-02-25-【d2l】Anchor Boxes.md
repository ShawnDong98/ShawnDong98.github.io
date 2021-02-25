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



