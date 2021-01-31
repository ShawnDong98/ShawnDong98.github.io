---
layout:     post
title:      "【机器学习笔录】深度学习图像处理相关库"
subtitle:   ""
date:       2020-03-04
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 机器学习
    - 深度学习
    - OpenCV
---

# OpenCV

## 安装

### python安装

```
pip install opencv-contrib-python
```





## API

### cv2.imread

**读取图片**：

> cv2.imread(path, flags)

- path: 该参数制定图片的路径，可以使用相对路径，也可以使用绝对路径；
- flags:指定以何种方式加载图片，有三个取值：
  - cv2.IMREAD_COLOR:读取一副彩色图片，图片的透明度会被忽略，默认为该值，实际取值为1；
  - cv2.IMREAD_GRAYSCALE:以灰度模式读取一张图片，实际取值为0
  - cv2.IMREAD_UNCHANGED:加载一副彩色图像，透明度不会被忽略。

如果给定的图片路径不对，该函数不会抛出异常，而是返回一个None

### cv2.imshow

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

### cv2.imwrite

**保存图片**

> cv2.imwrite(filename, img)

- filename: 保存文件的路径名
- img: 表示图像的numpy.ndarray对象

### cv2.cvtColor

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


### 画矩形和文字注释

> cv2.rectangle(img, pt1, pt2, color[, thickness[, lineType[, shift]]]) 

- img：要画的圆所在的矩形或图像
- pt1：矩形左上角的点
- pt2：矩形右下角的点
- color：线条颜色，如 (0, 0, 255) 红色，BGR
- thickness：线条宽度
- lineType：\\
8 (or omitted) ： 8-connected line \\
4：4-connected line \\
CV_AA - antialiased line
- shift：坐标点小数点位数

```python
##!/usr/bin/python
## -*- coding: UTF-8 -*-
"""
@Time    : 2018-11-13 21：03
@Author  : jianjun.wang
@Email   : alanwang6584@gmail.com
"""

import numpy as np
import cv2 as cv
 
img = np.zeros((320, 320, 3), np.uint8) ##生成一个空灰度图像
print img.shape ## 输出：(320, 320, 3)

## 矩形左上角和右上角的坐标，绘制一个绿色矩形
ptLeftTop = (60, 60)
ptRightBottom = (260, 260)
point_color = (0, 255, 0) ## BGR
thickness = 1 
lineType = 4
cv.rectangle(img, ptLeftTop, ptRightBottom, point_color, thickness, lineType)

## 绘制一个红色矩形
ptLeftTop = (120, 100)
ptRightBottom = (200, 150)
point_color = (0, 0, 255) ## BGR
thickness = 1
lineType = 8
cv.rectangle(img, ptLeftTop, ptRightBottom, point_color, thickness, lineType)

cv.namedWindow("AlanWang")
cv.imshow('AlanWang', img)
cv.waitKey (10000) ## 显示 10000 ms 即 10s 后消失
cv.destroyAllWindows()

```

> cv2.putText(img, 'lena', (50,150), cv2.FONT_HERSHEY_COMPLEX, 5, (0, 255, 0), 12)


### cv2.resize


```
img_test2 = cv.resize(img, (0, 0), fx=0.25, fy=0.25, interpolation=cv.INTER_NEAREST)
```

- (0, 0)： 输出图片尺寸， 如果为0受到fx和fy的控制
- fx, fy: x轴和y轴的缩放因子
- interpolation： 插值方式

### 画点和圆

> cv2.circle(img, center, radius, color[, thickness[, lineType[, shift]]])

circle() 函数可以绘制以一个点为圆心特定半径的圆

- img：要画的圆所在的矩形或图像
- center：圆心坐标，如 (100, 100)
- radius：半径，如 10
- color：圆边框颜色，如 (0, 0, 255) 红色，BGR
- thickness：正值表示圆边框宽度. 负值表示画一个填充圆形
- lineType：圆边框线型，可为 0，4，8
- shift：圆心坐标和半径的小数点位数



### cv2.remap

> cv.remap(	src, map1, map2, interpolation[, dst[, borderMode[, borderValue]]]	)

重映射，就是把一幅图像中某位置的像素放置到另一个图片指定位置的过程。

![](https://raw.githubusercontent.com/ShawnDong98/ShawnDong98.github.io/master/小书匠/1586617413791.png)

- map1： 用于存放图像X方向的映射关系，类型必须是CV_32FC1的。
- map2：于存放图像Y方向的映射关系，类型必须是CV_32FC1的。
- interpolation：插值方式


在国内的网站上讲这个函数都十分简单， 并不清楚， 在[stackoverflow](https://stackoverflow.com/questions/46520123/how-do-i-use-opencvs-remap-function)找到了好的解释。

首先，mapx和mapy在干什么？ 

mapx和mapy每个对应位置取出来一个点， 可以确定地对应到原图中的一个点，将这个点的像素值赋值给mapx和mapy对应矩阵的位置， 如果mapx和mapy是非整数， 那么会采用插值的方式来确定这个点的像素值， 举个例子：

如果是一一对应的关系：

```python
	img = np.uint8(np.random.rand(8, 8)*255)
    print(img)
    ##array([[230,  45, 153, 233, 172, 153,  46,  29],
    ##       [172, 209, 186,  30, 197,  30, 251, 200],
    ##       [175, 253, 207,  71, 252,  60, 155, 124],
    ##       [114, 154, 121, 153, 159, 224, 146,  61],
    ##       [  6, 251, 253, 123, 200, 230,  36,  85],
    ##       [ 10, 215,  38,   5, 119,  87,   8, 249],
    ##       [  2,   2, 242, 119, 114,  98, 182, 219],
    ##       [168,  91, 224,  73, 159,  55, 254, 214]], dtype=uint8)

    map_y = np.array([[0, 1], [2, 3]], dtype=np.float32)
    map_x = np.array([[5, 6], [7, 10]], dtype=np.float32)
    mapped_img = cv2.remap(img, map_x, map_y, cv2.INTER_LINEAR)
    ##array([[153, 251],
    ##     [124,   0]], dtype=uint8)
```

```python
map_y
=====
0  1
2  3

map_x
=====
5  6
7  10
```

可以看到有mapx = 5, mapy = 0确定的点为第0行，第5列的像素值， 该值为153。其他的点类似。

那么当mapx和mapy为非整数的时候：

```python
	img = np.uint8(np.random.rand(8, 8)*255)
    ##array([[230,  45, 153, 233, 172, 153,  46,  29],
    ##       [172, 209, 186,  30, 197,  30, 251, 200],
    ##       [175, 253, 207,  71, 252,  60, 155, 124],
    ##       [114, 154, 121, 153, 159, 224, 146,  61],
    ##       [  6, 251, 253, 123, 200, 230,  36,  85],
    ##       [ 10, 215,  38,   5, 119,  87,   8, 249],
    ##       [  2,   2, 242, 119, 114,  98, 182, 219],
    ##       [168,  91, 224,  73, 159,  55, 254, 214]], dtype=uint8)

    map_y = np.array([[0, 1.5], [2, 3]], dtype=np.float32)
    map_x = np.array([[5, 6], [7, 10]], dtype=np.float32)
    mapped_img = cv2.remap(img, map_x, map_y, cv2.INTER_LINEAR)
    ##array([[153, 203],
    ##      [124,   0]], dtype=uint8)
```

可以看到，当我把mapx中的1改为1.5后，对应的值变成了203， 这个值怎么算出来的。

首先mapy对应第6列, mapx在第1列和第2列之间， 通过以下公式计算得到：

$$dst = 0.5 * 251 + 0.5 * 155$$

并不是所有的插值都是按照这样的比例关系算的，但是意思是这么个意思。

上述的行和列都从0开始算起。

### cv2.warpAffine

> cv2.warpAffine(src, M, dsize[, dst[, flags[, borderMode[, borderValue]]]])


- M: 变换矩阵，需要通过其它函数获得，当然也可以手动输入。
- dst: 输出图像，尺寸为dsize， 类型和src相同
- dsize:   输出图像的尺寸
- flags:  结合的插值方式 (see InterpolationFlags) 以及选项 WARP_INVERSE_MAP意思是 M 是变换的逆 ( dst→src ).

### cv2.getRotationMatrix2D

> getRotationMatrix2D(center, angle, scale)

- center表示中间点的位置
- angle表示逆时针旋转角度
- scale表示缩放比例


### cv2.copyMakeBorder

给图片做填充（paddinng）

> cv2.copyMakeBorder(img,120,120,0,0,cv2.BORDER_CONSTANT,value=\[0, 0, 0\])


- src ： 输入的图片
- top, bottom, left, right ：相应方向上的边框宽度
- borderType：定义要添加边框的类型，它可以是以下的一种：
- - cv2.BORDER_CONSTANT：添加的边界框像素值为常数（需要额外再给定一个参数）
- - cv2.BORDER_REFLECT：添加的边框像素将是边界元素的镜面反射，类似于gfedcb  \|  abcdefgh  \|  gfedcba
- - cv2.BORDER_REFLECT_101 or cv2.BORDER_DEFAULT：和上面类似，但是有一些细微的不同，类似于gfedcb  \|  abcdefgh \| gfedcba
- - cv2.BORDER_REPLICATE：使用最边界的像素值代替，类似于aaaaaa \| abcdefgh \| hhhhhhh
- - cv2.BORDER_WRAP：不知道怎么解释，直接看吧，cdefgh \| abcdefgh \| abcdefg
- value：如果borderType为cv2.BORDER_CONSTANT时需要填充的常数值。




### cv2.addWeighted

> cv2.addWeighted(src1, alpha, src2, beta, gamma[, dst[, dtype]]) → dst

- src1： 第一个输入数组
- alpha：第一个数组元素的权重
- src2： 和src1形同通道和尺寸大小的第二个输入数组
- beta：第二个数组元素的权重
- dst：和输入元素相同通道和尺寸的输出数组
- gamma：给个和上加上的标量
- dtype：输出数组可选的深度；当两个输入数组具有相同的深度， dtype可以被设置为-1， 它等价于src1.depth().

等价于下面的公式：

$$dst = src1 * alpha + src2 * beta + gamma;$$


### cv2.canny

- T1， T2为阈值， 凡是高于T2的都保留， 凡是小于T1都丢弃， 从高于T2的像素出发， 凡是大于T1而且相互连接的，都保留。最终得到一个输出二值图像。
- 推荐的高低阈值比值为T2：T1 = (3：1 ) / (2：1)其中T2为高阈值， T1为低阈值。

```
  Canny(
    inputArray src, //8-bit的输入图像
    OutputArray edges, //输出边缘图像， 一般都是二值图像
    double threshold1, //低阈值， 常取高阈值的1/2， 或者1/3
    double threshold2, //高阈值
    int aptertureSize, //Sobel算子的size， 通常3x3， 取值3
    boot L2gradient //选择true表示是L2来归一化， 否则用L1归一化
    ）
```

### cv2.VideoWriter_fourcc

VideoWriter_fourcc为视频编解码器, fourcc意为四字符代码（Four-Character Codes），顾名思义，该编码由四个字符组成,下面是VideoWriter_fourcc对象一些常用的参数，注意：字符顺序不能弄混

- cv2.VideoWriter_fourcc('I', '4', '2', '0'),该参数是YUV编码类型，文件名后缀为.avi
- cv2.VideoWriter_fourcc('P', 'I', 'M', 'I'),该参数是MPEG-1编码类型，文件名后缀为.avi
- cv2.VideoWriter_fourcc('X', 'V', 'I', 'D'),该参数是MPEG-4编码类型，文件名后缀为.avi
- cv2.VideoWriter_fourcc('T', 'H', 'E', 'O'),该参数是Ogg Vorbis,文件名后缀为.ogv
- cv2.VideoWriter_fourcc('F', 'L', 'V', '1'),该参数是Flash视频，文件名后缀为.flv

fourcc为 四个字符用来表示压缩帧的codec 例如：

- CV_FOURCC('P','I','M','1') = MPEG-1 codec
- CV_FOURCC('M','J','P','G') = motion-jpeg codec
- CV_FOURCC('M', 'P', '4', '2') = MPEG-4.2 codec
- CV_FOURCC('D', 'I', 'V', '3') = MPEG-4.3 codec
- CV_FOURCC('D', 'I', 'V', 'X') = MPEG-4 codec
- CV_FOURCC('U', '2', '6', '3') = H263 codec
- CV_FOURCC('I', '2', '6', '3') = H263I codec
- CV_FOURCC('F', 'L', 'V', '1') = FLV1 codec
- 若编码器代号为 -1，则运行时会弹出一个编码器选择框.



### cv2.videowriter


```
VideoWriter(filename, fourcc, fps, frameSize[, isColor]) -> <VideoWriter object>
```

- 第一个参数是要保存的文件的路径
- fourcc 指定编码器
- fps 要保存的视频的帧率
- frameSize 要保存的文件的画面尺寸
- isColor 指示是黑白画面还是彩色的画面



## CV概念知识


### 图像格式

HSV图像： 色调（H）， 饱和度（S）， 亮度（V）

LAB图像： 亮度（L）， 红色至绿色的范围（A），蓝色至黄色的范围（B） 



### 形态学操作

腐蚀：白像素的连同域变小

膨胀： 白像素的连同域变大

开操作：先膨胀再腐蚀， 会让相近的小点连同起来

闭操作：先腐蚀再膨胀， 会让一些小点消失






## Trick

### 视频的加载和保存

编程实现从视频文件中读取并显示视频

```python
import cv2
 
cap = cv2.VideoCapture(‘vtest.avi’)##打开相机
 
while( True):
    ret,frame = cap.read()##捕获一帧图像
    if ret:
        cv2.imshow('frame',frame)
        cv2.waitKey(25)
    else:
        break
 
cap.release()##关闭相机
cv2.destroyAllWindows()##关闭窗口
```

### 仿射变换（Affine Transformation）

**图像的几何变换——拉伸、收缩、扭曲、旋转（stretch，shrink，distortion，rotation）**

> 拉伸、收缩、扭曲、旋转是图像的几何变换，在三维视觉技术中大量应用到这些变换，又分为仿射变换和透视变换。仿射变换通常用单应性（homography）建模，利用cvWarpAffine解决稠密仿射变换，用cvTransform解决稀疏仿射变换。仿射变换可以将矩形转换成平行四边形，它可以将矩形的边压扁但必须保持边是平行的，也可以将矩形旋转或者按比例变化。透视变换提供了更大的灵活性，一个透视变换可以将矩阵转变成梯形。当然，平行四边形也是梯形，所以仿射变换是透视变换的子集。

**算法原理简介**

首先，我们需要使用轮廓检测等其它方法获取到目标的4个关键点坐标值；然后利用相应的变换关系获取到新的4个坐标点；接着利用这4对关键点计算出仿射变换矩阵M；最后应用仿射变换矩阵到目标中即可。

**算法实现步骤**

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





# Bug总结

## 'depth' is 6 (CV_64F)

CV_64F表示numpy数组’dtype’是64位浮点opencv只适用于’float32’（32位浮点），其中imshow的图像范围是0.0-1.0或’uint8’（无符号8位）0-255。用8位显示更高位图像自然会报错。
同时附上数据类型mat和位数关系：
http://blog.sina.com.cn/s/blog_662c7859010105za.html



# Reference
1. [OpenCV——图片的加载、显示、保存(python)](https://blog.csdn.net/u014630987/article/details/76713814)、
2. [【Python+OpenCV入门学习】四、视频的读取、显示、保存](https://blog.csdn.net/qq_18995069/article/details/82772944)
3. [Python+Opencv4点仿射变换](https://blog.csdn.net/wzz18191171661/article/details/99174861)
4. [Opencv-Python学习笔记五——图像翻转，平移，仿射及透视 warpAffine](https://www.jianshu.com/p/ef67cacf442c)
5. [[python]OpenCV之cvtColor](https://blog.csdn.net/wszsdsd/article/details/89639175)
6. [Python-OpenCV 图像叠加or图像混合加权（cv2.addWeighted）](https://blog.csdn.net/zh_jessica/article/details/77992578)
7. [How do I use OpenCV's remap function?](https://stackoverflow.com/questions/46520123/how-do-i-use-opencvs-remap-function)
8. [opencv-python图片边框填充（padding）](https://blog.csdn.net/ngy321/article/details/80145242)
9. [opencv关于图像imshow显示报错'depth' is 6 (CV_64F)](https://blog.csdn.net/qq_40637643/article/details/89704900)
10. [Python 用 OpenCV 画矩形 (4)]https://blog.csdn.net/u011520181/article/details/84036425
11. [python下的opencv画矩形和文字注释](https://blog.csdn.net/alansss/article/details/84978672)
12. [Python 用 OpenCV 画点和圆 (2)](https://blog.csdn.net/u011520181/article/details/83933325)