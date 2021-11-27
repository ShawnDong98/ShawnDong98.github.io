---
layout:     post
title:      "【Geek】Some Funny Tricks & Experiments"
subtitle:   ""
date:       2021-11-20
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - Geek
    - 
---

# 比较不同读取图片函数的速度

## PIL.Image


> %timeit Image.open("../datasets/kaggle/petfinder_clean/train/00a1ae8867e0bb89f061679e1cf29e80.jpg")

```
43.9 µs ± 968 ns per loop (mean ± std. dev. of 7 runs, 10000 loops each)
```

## torchvision.io.read_image

> %timeit read_image("../datasets/kaggle/petfinder_clean/train/00a1ae8867e0bb89f061679e1cf29e80.jpg")

1.76 ms ± 18.3 µs per loop (mean ± std. dev. of 7 runs, 1000 loops each)

## opencv

> %timeit cv2.imread("../datasets/kaggle/petfinder_clean/train/00a1ae8867e0bb89f061679e1cf29e80.jpg")

```
4.12 ms ± 51.1 µs per loop (mean ± std. dev. of 7 runs, 100 loops each)
```
## PIL.Image -> numpy.ndarray

> %timeit np.array(Image.open("../datasets/kaggle/petfinder_clean/train/00a1e0c0f89ff89a8f32d42e9025f6b2.jpg"))

```
13 ms ± 2.99 ms per loop (mean ± std. dev. of 7 runs, 100 loops each)
```

# Sturges' Rule

Sturges在1926年在直方图制作方法上作出了开创性的工作，得到了分组数 $k$
关于样本量 $n$ 的粗略关系。

现在，许多学者和一些统计软件还都是以 Sturges 公式为主要依据来确定直方图分组数。

这是一个经验公式。因此没有推导过程。


# Reference

1. [斯透奇斯规则是什么，公式是如何推导出来的？](斯透奇斯规则是什么，公式是如何推导出来的？)