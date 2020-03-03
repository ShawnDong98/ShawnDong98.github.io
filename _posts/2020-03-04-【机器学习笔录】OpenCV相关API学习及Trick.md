---
layout:     post
title:      "【机器学习笔录】OpenCV相关API学习及Trick"
subtitle:   ""
date:       2020-03-04
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - OpenCV
    - 
---

# C++部分


# Python部分

## 图片的加载、显示、保存

**读取图片**：

> cv2.imread(path, flags)

- path: 该参数制定图片的路径，可以使用相对路径，也可以使用绝对路径；
- flags:指定以何种方式加载图片，有三个取值：
  - cv2.IMREAD_COLOR:读取一副彩色图片，图片的透明度会被忽略，默认为该值，实际取值为1；
  - cv2.IMREAD_GRAYSCALE:以灰度模式读取一张图片，实际取值为0
  - cv2.IMREAD_UNCHANGED:加载一副彩色图像，透明度不会被忽略。

如果给定的图片路径不对，该函数不会抛出异常，而是返回一个None

**显示图片**

> cv2.imshow(winname, mat)

-  winame:一个字符串，表示创建的窗口名字，每一个窗口必须有一个唯一的名字；
-  mat:是一个图片矩阵，numpy.ndarray类型

在图片显示的过程中，通常会伴随几个其他的函数，他们分别是:

- cv2.waitKey()
- cv2.destroyAllWindows()
- cv2.destroyWindow()
- cv2.namedWindow()

如果没有cv2.waitKey()函数，图像不会显示（也许是一闪而过，我们人眼观察不到）

cv2.destroyAllWindows()用来销毁所有已经创建的窗口， 如果需要销毁指定窗口使用cv2.destroyWindow()函数，他接受一个表示窗口名字的名字。

直接用cv2.imshow()创建的窗口是自动适应图片大小的，不能缩放，如果我们想放大缩小窗口，必须单独用cv2.namedWindow(),并通过flag参数指定窗口模式为cv2.WINDOW_NORMAL,默认为cv2.WINDOW_AUTOSIZE.

**保存图片**

> cv2.imwrite(filename, img)

- filename: 保存文件的路径名
- img: 表示图像的numpy.ndarray对象


# Reference
1. [OpenCV——图片的加载、显示、保存(python)](https://blog.csdn.net/u014630987/article/details/76713814)