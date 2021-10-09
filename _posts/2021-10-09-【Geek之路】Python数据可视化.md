---
layout:     post
title:      "【Geek之路】Python数据可视化"
subtitle:   ""
date:       2021-10-09
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - Geek
    - Python
---

# 使用函数绘制 matplotlib 的图表组成元素

## 绘制 matplotlib 图表组成元素的主要函数


在一个图形输出窗口中， 底层是一个 `Figure` 实例， 我们通常称之为画布， 包含一些可见和不可见的元素。

在画布上的图形就是 `Axes` 实例， `Axes` 实例几乎包含了我们要介绍的 matplotlib 的所有组成元素， 例如坐标轴、刻度、标签、线和标记等。 `Axes` 实例有 x 轴和 y轴属性， 可以用 `Axes.xaxis` 和 `Axes.yaxis` 来控制 x 轴 和 y 轴的相关组成元素， 例如刻度线、刻度标签、刻度线定位器和刻度标签格式器。


通过调用 `matploblib.pyplot` 模块的API中的函数， 我们可以快速绘制这些组成元素， 例如 `matplotlib.pyplot.xlim()` 和 `matplotlib.pyplot.ylim()` 控制 x 轴和 y 轴的数值显示范围。 

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1633767191099.png)

本章以上图为讲解切入点， 从这些函数的 **函数功能**、**调用签名**、**参数说明**和**调用展示**四个方面来全面阐述 API 函数的使用方法和技术细节。 


## 绘制 matplotlib 图表组成元素的函数用法

### plot() —— 展现变量的趋势变化


> plt.plot(x, y, ls="-", lw=2, label="plot figure")

展现变量的趋势变化

- ls: 折线图的线条风格
- lw：折线图的线条宽度
- label： 标记图形内容的标签

```python
import matplotlib.pyplot as plt
import numpy as np

x = np.linspace(0.05, 10, 1000)
y = np.cos(x)

plt.plot(x, y,  ls="-", lw=2, label="plot figure")

plt.legend()

plt.show()
```

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1633769283214.png)


### scatter()——寻找变量之间的关系

> plt.scatter(x, y, c="b", label="scatter figure")

- c: 散点图中的标记的颜色
- label： 标记图形内容的标签文本


```python
import matplotlib.pyplot as plt
import numpy as np

x = np.linspace(0.05, 10, 1000)
y = np.random.rand(1000)

plt.scatter(x, y, c="b", label="scatter figure")

plt.legend()

plt.show()
```

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1633769588424.png)


### xlim()——设置 x 轴的数值显示范围

> plt.xlim(xmin, xmax)

```python
import matplotlib.pyplot as plt
import numpy as np

x = np.linspace(0.05, 10, 1000)
y = np.random.rand(1000)

plt.scatter(x, y, label="scatter figure")

plt.legend()

plt.xlim(0.05, 10)
plt.ylim(0, 1)

plt.show()
```

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1633769930326.png)


### xlabel()——设置 x 轴的标签文本

> plt.xlabel(string)

- string：标签文本内容

```python
import matplotlib.pyplot as plt
import numpy as np

x = np.linspace(0.05, 10, 1000)
y = np.sin(x)

plt.plot(x, y, ls="-.", lw=2, c="c", label="plot figure")

plt.legend()

plt.xlabel("x-axis")
plt.ylabel("y-axis")

plt.show()
```


![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1633770164422.png)