---
layout:     post
title:      "【深度学习】Auto-Encoding Scene Graphs for Image Captioning"
subtitle:   ""
date:       2022-01-03
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - Scene Graph
    - Image Captioning
---

# Abstract

# Conclusion


# Details

## Scene Graph 所对应的含义

```
array([[  0.,   9., 408.],
       [  0.,  14., 425.],
       [  0.,  26., 425.],
       [  1.,  14., 408.],
       [  1.,  26., 425.],
       [  2.,  22., 410.],
       [  3.,  13., 429.],
       [  3.,  14., 408.],
       [  5.,   7., 410.],
       [  5.,  26., 408.],
       [  7.,  14., 408.],
       [  7.,  26., 408.],
       [ 13.,  14., 463.],
       [ 14.,  26., 408.],
       [ 18.,  20., 408.]])
```

scene graph matrix： `[0., 9., 408.]` 意思是第 0 个 box 和 第9个 box 之间的关系是 `dict[408]`， 如果 `dict[408]` 的关系是 `on`， 那么它们对应的关系就是 `on`。

attrbute matrix ：`[0, 1, 2]` 意味着 bbox 有三种属性， 分别是 `dict[0]`， `dict[1]` 和 `dict[2]`。


## 如何可视化 Scene Graph


```python

```

# Reference
1. [How do you generate coco_pred_sg.zip and coco_spice_sg2.zip, and what does the value in those npy files means? #7](https://github.com/yangxuntu/SGAE/issues/7)