---
layout:     post
title:      "【Research & Writing】Matlab 使用方法记录"
subtitle:   ""
date:       2022-09-13
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - Research & Writing
    -
---
# API 
## imcrop（）

```
A = imread("图片名")
B = imcrop(A ,[x y width length])
```

## 设置 Axis 在 Figture 中的边距、大小

```
set(gca,'Position', [.13 .17 .80 .74]);
```

# Reference

1. [浅谈MATLAb中imcrop（）函数](https://blog.csdn.net/qq_57906941/article/details/125222861)
2. [MATLAB 中设置 Figure 和 Axes 的位置和尺寸](https://zhuanlan.zhihu.com/p/446968474)