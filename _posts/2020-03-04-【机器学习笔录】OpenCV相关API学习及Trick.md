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
    - 机器学习
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


## 图片格式转换

> cvtColor(src,dst,code,dstCn)  ===>  (原图像，输出图像，color转化代码，输出通道) 

- 原图像：input image: 8-bit unsigned, 16-bit unsigned ( CV_16UC... ), or single-precision floating-point.，解释的很清楚8位无符号，16位无符号，或者单精浮点数。
- 输出图像：output image of the same size and depth as src. 输出与src相同大小和深度的图像。
- code ：color转化代码 \\
COLOR_BGR2BGRA  \\
COLOR_RGB2RGBA  \\
COLOR_BGRA2BGR  \\
COLOR_RGBA2RGB  \\
COLOR_BGR2GRAY  \\
COLOR_RGB2GRAY  \\
COLOR_GRAY2BGR  \\
COLOR_GRAY2RGB  \\
COLOR_BGR2HSV  \\
COLOR_RGB2HSV 

## 视频的加载和保存

### 编程实现从视频文件中读取并显示视频

```python
import cv2
 
cap = cv2.VideoCapture(‘vtest.avi’)#打开相机
 
while( True):
    ret,frame = cap.read()#捕获一帧图像
    if ret:
        cv2.imshow('frame',frame)
        cv2.waitKey(25)
    else:
        break
 
cap.release()#关闭相机
cv2.destroyAllWindows()#关闭窗口
```

## 仿射变换（Affine Transformation）

**图像的几何变换——拉伸、收缩、扭曲、旋转（stretch，shrink，distortion，rotation）**

> 拉伸、收缩、扭曲、旋转是图像的几何变换，在三维视觉技术中大量应用到这些变换，又分为仿射变换和透视变换。仿射变换通常用单应性（homography）建模，利用cvWarpAffine解决稠密仿射变换，用cvTransform解决稀疏仿射变换。仿射变换可以将矩形转换成平行四边形，它可以将矩形的边压扁但必须保持边是平行的，也可以将矩形旋转或者按比例变化。透视变换提供了更大的灵活性，一个透视变换可以将矩阵转变成梯形。当然，平行四边形也是梯形，所以仿射变换是透视变换的子集。

### 算法原理简介

首先，我们需要使用轮廓检测等其它方法获取到目标的4个关键点坐标值；然后利用相应的变换关系获取到新的4个坐标点；接着利用这4对关键点计算出仿射变换矩阵M；最后应用仿射变换矩阵到目标中即可。

### 算法实现步骤

- 读取输入图片；
- 获取原始目标的4个坐标点（左上，左下，右上，右下）；
- 通过4个坐标点计算出新的坐标点；
- 使用opencv计算仿射变换矩阵M；
- 应用仿射变换进行变换并进行结果显示。

> cv2.warpAffine(src, M, dsize[, dst[, flags[, borderMode[, borderValue]]]])

- dst: output image that has the size dsize and the same type as src .
- dsize:   size of the output image.
- flags:  combination of interpolation methods (see InterpolationFlags) and the optional flag WARP_INVERSE_MAP that means that M is the inverse transformation ( dst→src ).
- borderMode:  pixel extrapolation method (see BorderTypes); when borderMode=BORDER_TRANSPARENT, it means that the pixels in the destination image corresponding to the "outliers" in the source image are not modified by the function.
- borderValue: value used in case of a constant border; by default, it is 0.

> cv.GetAffineTransform(src, dst, mapMatrix) → None

- src – Coordinates of triangle vertices in the source image
- dst – Coordinates of the corresponding triangle vertices in the destination image.

M=cv2.getAffineTransform(pos1,pos2),其中两个位置就是变换前后的对应位置关系。输出的就是仿射矩阵M。然后在使用函数cv2.warpAffine()。

# Reference
1. [OpenCV——图片的加载、显示、保存(python)](https://blog.csdn.net/u014630987/article/details/76713814)、
2. [【Python+OpenCV入门学习】四、视频的读取、显示、保存](https://blog.csdn.net/qq_18995069/article/details/82772944)
3. [Python+Opencv4点仿射变换](https://blog.csdn.net/wzz18191171661/article/details/99174861)
4. [Opencv-Python学习笔记五——图像翻转，平移，仿射及透视 warpAffine](https://www.jianshu.com/p/ef67cacf442c)
5. [[python]OpenCV之cvtColor](https://blog.csdn.net/wszsdsd/article/details/89639175)