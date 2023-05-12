---
layout:     post
title:      "【深度学习】Converting a spectrum to a colour"
subtitle:   ""
date:       2023-05-11
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - HSI
---

本文提供了一个Python脚本，用于将波长光谱映射到颜色的表示形式。

没有独特的方法来做到这一点，但这里使用的公式是基于色彩匹配函数(CIE, colour matching functions)， $x(\lambda), y(\lambda)$ 和 $z(\lambda)$。 这些模型通过映射波长的能量光谱 $P(\lambda)$ 映射为三原色 $X， Y， Z$ 来模拟 “standard observer” 的 chromatic response, 类似于人眼中三种视锥细胞的实际响应。


$$X = \int P(\lambda) x(\lambda)d\lambda$$
$$Y = \int P(\lambda) y(\lambda)d\lambda$$
$$Z = \int P(\lambda)z(\lambda)d\lambda$$

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1683817862408.png)

X、Y 和 Z 可以通过除以它们的总和来归一化（以失去有关光亮度的信息为代价）：

$$
x = \frac{X}{X+Y+Z}, \quad y = \frac{Y}{X + Y + Z}, \quad z = \frac{Z}{X + Y + Z} = 1 - x - y
$$

这样，只需要两个参数，x 和 y 来描述光的颜色（更准确地说，色度）。CIE标准色度图如下所示。

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1683818429632.png)

通过显示设备将（x，y）进一步转换为 RGB 值以输出，需要通过适当的色度矩阵进行转换。从几何上讲，这将上述颜色“舌头”中的点映射到 RGB “色域”内的点子集，即所示的三角形区域。颜色系统可以由三个原色色度(三角形的顶点)和一个白点组成的矩阵来定义:一组色度坐标为某种目的定义了“颜色”白色。

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1683818660233.png)

因此，将（x，y，z）值的向量乘以该矩阵的倒数，给出描述所用系统中相应颜色的 RGB 值。

# 将波长映射为 XYZ 色彩空间， 再将 XYZ 色彩空间映射为 sRGB 色彩空间 

将波长映射为 XYZ 色彩空间， 再将 XYZ 色彩空间映射为 sRGB 色彩空间， 最后将 sRGB 色彩空间对应到灰度图上， 生成 colormap。

```python
import numpy as np
from PIL import ImageCms, Image 
from scipy.interpolate import interp1d
from colormath.color_objects import sRGBColor, XYZColor
from colormath.color_conversions import convert_color

class ColorMatchFunc:
    def __init__(self):
        self.cmf = np.loadtxt("cmf.txt", usecols=(0, 1, 2, 3))
        lams, Xs, Ys, Zs = self.cmf[:, 0], self.cmf[:, 1], self.cmf[:, 2], self.cmf[:, 3]
        self.f = interp1d(lams, np.column_stack((Xs, Ys, Zs)), kind='linear', fill_value=(0,0,0), bounds_error=False, axis=0)

    def spec2srgb(self, lam):
        XYZ = self.f(lam)
        xyz = XYZColor(*XYZ)
        sRGB = convert_color(xyz, sRGBColor).get_value_tuple()
        return sRGB
    
    def __call__(self, lam):
        srgb = self.spec2srgb(lam)
        srgb = np.kron(np.ones((3, 1)), srgb)
        gray = np.arange(0., 1., 1/256.)[:, None].repeat(3, axis=1)
        cmM = np.dot(gray, srgb)
        cmM = cmM / np.max(cmM)

        return cmM
```


# 应用 colormap

```python
from scipy import io as sio
import matplotlib.colors as mcolors

hsi = sio.loadmat("./TSA_simu_data/Truth/scene01.mat")['img']

cmap_name = 'CustomColormap'
cm = mcolors.LinearSegmentedColormap.from_list(cmap_name, list(cmap), N=len(cmap))
mapped_img = cm(hsi[:, :, 0])

plt.imshow(mapped_img)
```


# Reference
1. [Converting a spectrum to a colour](https://scipython.com/blog/converting-a-spectrum-to-a-colour/)