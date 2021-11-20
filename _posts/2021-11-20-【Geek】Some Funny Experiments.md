---
layout:     post
title:      "【Geek】Some Funny Experiments"
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

