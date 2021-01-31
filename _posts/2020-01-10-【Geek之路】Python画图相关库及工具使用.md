---
layout:     post
title:      "【Geek之路】Python画图相关库及工具使用"
subtitle:   ""
date:       2020-01-10
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - Geek
    - 机器学习
---


# matplotlib语法

## subplot

> matplotlib.pyplot.subplots(nrows=1, ncols=1, sharex=False, sharey=False, squeeze=True, subplot_kw=None, gridspec_kw=None, \*\*fig_kw)

- nrows, ncols(int, optional,  default: 1): 输出几行几列，默认是1行1列
- sharex, sharey(bool or \{‘none’, ‘all’, ‘row’, ‘col’\}, default: False):  可以选择共享x轴或者y轴：

True or ‘all’: x- or y-axis will be shared among all subplots.

False or ‘none’: each subplot x- or y-axis will be independent.

‘row’: each subplot row will share an x- or y-axis.

'col’: each subplot column will share an x- or y-axis.

plt.subplots()是一个函数，返回一个包含figure和axes对象的元组。因此，使用fig,ax = plt.subplots()将元组分解为fig和ax两个变量。

subplot前面俩参数指定的是一个画板被分割成的行和列，后面一个参数则指的是当前正在绘制的编号！

那是个什么编号规则呢？就是 行优先数数规则！

![](https://raw.githubusercontent.com/ShawnDong98/ShawnDong98.github.io/master/小书匠/1586527444810.png)

## vlines

> matplotlib.pyplot.vlines(x, ymin, ymax, colors=None, linestyles='solid', label='', *, data=None, \*\*kwargs)

绘制垂直的线

为每个x绘制从ymin到ymax的垂直的线

- x(float or array-like): 要绘制线的x索引
- ymin, ymax(float or array-like): 每条线的开始到结束
- linestyles({'solid', 'dashed', 'dashdot', 'dotted'}, 可选)
- label(字符串, 默认为空): 标签
- lw: 线宽

## set_xlim

> matplotlib.pyplot.xlim(\*args, \*\*kwargs)

设置x轴的上下限

## set_xticks

> Axes.set_xticks(self, ticks, *, minor=False)

设置坐标轴的标号.

- ticks(list of floats): 标号位置的列表

## hist

> Axes.hist(self, x, bins=None, range=None, density=False, weights=None, cumulative=False, bottom=None, histtype='bar', align='mid', orientation='vertical', rwidth=None, log=False, color=None, label=None, stacked=False, *, data=None, \*\*kwargs)

- x: 数据集，最终的直方图将对数据集进行统计
- bins: 条形数
- range: tuple, 显示的区间，range在没有给出bins时生效
- density: bool，默认为false，显示的是频数统计结果，为True则显示频率统计结果，这里需要注意，频率统计结果=区间数目/(总数\*区间宽度)，和normed效果一致，官方推荐使用density
- histtype: 可选{'bar', 'barstacked', 'step', 'stepfilled'}之一，默认为bar，推荐使用默认配置，step使用的是梯状，stepfilled则会对梯状内部进行填充，效果与bar类似
- align: 可选{'left', 'mid', 'right'}之一，默认为'mid'，控制柱状图的水平分布，left或者right，会有部分空白区域，推荐使用默认
- log: bool，默认False,即y坐标轴是否选择指数刻度
- stacked: bool，默认为False，是否为堆积状图

**对直方图进行曲线拟合**

hist()第一个返回值是统计各个区间的频数，第二个返回值是bins，即区间，所以我们有了点坐标，使用plot函数即可

PS: 返回值的bins的数据长度比频数的长度大1，这里推荐使用从1开始直到bins结束，即将第0个元素去掉，保证二者的长度一致，当然还需要减去width的一半，保证在中点。

![](https://raw.githubusercontent.com/ShawnDong98/ShawnDong98.github.io/master/小书匠/1596941259762.png)

如果density为True， 那么每个bin的面积表示的才是频率。

```python
import numpy as np
import matplotlib.pyplot as plt


a = [0.1, 0.1, 0.2, 0.2, 0.2, 0.3, 0.3, 0.4, ]

plt.hist(a, bins=4, density=True)
plt.show()
```

![](https://raw.githubusercontent.com/ShawnDong98/ShawnDong98.github.io/master/小书匠/1596941522632.png)
 
## plot

> Axes.plot(self, *args, scalex=True, scaley=True, data=None, \*\*kwargs)

- ‘bo’： 蓝色圆点图
- alpha： 不透明度
- ‘ro’： 红色圆点图

画出y对x的线

可选参数\[fmt\] 是一个字符串来定义图的基本属性如：颜色（color），点型（marker），线型（linestyle），

具体形式 fmt = '\[color]\[marker]\[line]'，如指定fmt为'bo-' # 蓝色圆点实线

fmt接收的是每个属性的单个字母缩写，例如：plot(x, y, 'bo-') # 蓝色圆点实线


**1.  其中常见的颜色参数：colors**

也可以对关键字参数color赋十六进制的RGB字符串如 color='#900302'

![](https://raw.githubusercontent.com/ShawnDong98/ShawnDong98.github.io/master/小书匠/1596427201177.png)

**2. 点型参数Markers**

用关键字参数对单个属性赋值，如：marker='+'这个只有简写，英文描述不被识别

![](https://raw.githubusercontent.com/ShawnDong98/ShawnDong98.github.io/master/小书匠/1596427248153.png)

**3. 线型参数Line Styles**

![](https://raw.githubusercontent.com/ShawnDong98/ShawnDong98.github.io/master/小书匠/1596427289786.png)

 
 ## matplotlib.pyplot contourf()
 
 > coutour(\[X, Y,] Z,\[levels], \*\*kwargs)

是来绘制等高线的，contour和contourf都是画三维等高线图的，不同点在于contour() 是绘制轮廓线，contourf()会填充轮廓。除非另有说明，否则两个版本的函数是相同的。

![](https://raw.githubusercontent.com/ShawnDong98/ShawnDong98.github.io/master/小书匠/1599377031709.png)

如果想显示热力图，那只要在plt.contourf()函数中添加属性cmap=plt.cm.hot就能显示热力图，其中cmap代表为color map，我们把color map映射成hot(热力图)


## plt.legend()

plt.legend（）函数主要的作用就是给图加上图例。

> 图例是集中于地图一角或一侧的地图上各种符号和颜色所代表内容与指标的说明，有助于更好的认识地图。

语法参数如下: matplotlib.pyplot.legend(\*args, \*\*kwargs)

![](https://raw.githubusercontent.com/ShawnDong98/ShawnDong98.github.io/master/小书匠/1601110509950.png)

![](https://raw.githubusercontent.com/ShawnDong98/ShawnDong98.github.io/master/小书匠/1601110531343.png)

常用的几个参数：

(1)设置图列位置

plt.legend(loc='upper center')

![](https://raw.githubusercontent.com/ShawnDong98/ShawnDong98.github.io/master/小书匠/1601110570789.png)

(2)设置图例字体大小

fontsize : int or float or {‘xx-small’, ‘x-small’, ‘small’, ‘medium’, ‘large’, ‘x-large’, ‘xx-large’}

(3)设置图例边框及背景

plt.legend(loc='best',frameon=False) #去掉图例边框
plt.legend(loc='best',edgecolor='blue') #设置图例边框颜色
plt.legend(loc='best',facecolor='blue') #设置图例背景颜色,若无边框,参数无效

对于边框还可以采用面向对象方式：

legend = plt.legend(\[\"First\", \"Second\"\])
frame = legend.get_frame()
frame.set_facecolor('blue')

4)设置图例标题

legend = plt.legend(\[\"CH\", \"US\"\], title='China VS Us')

(5)设置图例名字及对应关系

legend = plt.legend(\[p1, p2\],\[\"CH\",\"US\"\])


### 采用plt.legend( )默认参数


**第一步**：给plt.plot( )中参数label=''传入字符串类型的值，也就是图例的名称

**第二步**： 使用plt.legend( )使上述代码产生效果

### 向plt.legend( )中设置参数，进行个性化图例定制


plt.legend( )中有handles、labels和loc三个参数，其中：

handles需要传入你所画线条的实例对象，这个我也解释不清楚......

labels是图例的名称（能够覆盖在plt.plot( )中label参数值）

loc代表了图例在整个坐标轴平面中的位置（一般选取'best'这个参数值）



## plt.clabel()

> plt.clabel(C,inline = True,fontsize = 10)

该函数用于定义等高线中的标签。

其中，C代表需要添加标签的线；inline代表标签添加的位置，当其为True时是上面那副等高线图的效果，当其为False时，线会穿过数字；fontsize代表标签大小。

## plt.quiver()

> plt.quiver(*args, \*\*kw)

```
quiver(U, V, **kw)

quiver(U, V, C, **kw)

quiver(X, Y, U, V, **kw)

quiver(X, Y, U, V, C, **kw)
```

X 和 Y 是箭头的 x 和 y 坐标（默认是箭头的尾部）

U 和 V  是箭头矢量的 x 和 y 分量

C 是映射箭头和颜色的颜色数组

所有参数可能是 1D或2D数组及序列。如果 X 和 Y 缺省，将视为规则网格。如果 U 和 V是 2D 数组，但 X 和 Y 是 1D 数组，并且 len(X) 和 len(Y) 与 U 的列和行相同，则使用 numpy.meshgrid 生成 2D 网格。

## matplotlib.use('agg')

python3 中用matplotlib 不进行交互画图，而是直接将图保存到硬盘，主要的一个设置就是  matplotlib.use('agg')。

其实不设置  matplotlib.use('agg') 也可以把图片保存到硬盘，但是设置了这条语句再调用 matplotlib.pyplot.show 等进行交互式图片查看就会报错。

可以这么理解，设置了  matplotlib.use('agg') 后便强制你不能交互式查看显示图片，而只能保存到磁盘再查看。

## 多个图重叠

> plt.tight_layout()

使得子图横纵坐标更加紧凑，主要用于自动调整图区的大小以及间距，使所有的绘图及其标题、坐标轴标签等都可以不重叠的完整显示在画布上。

## 设置全局标题

> plt.suptitle()


## cla()、cls()、close()

> cla()   # Clear axes
> clf()   # Clear figure
> close()   #Close a figure window

## 设置显示中文

>  plt.rcParams['font.family'] = 'SimHei'

## 设置x， y坐标轴的位置

```python
import matplotlib.pyplot as plt
from numpy import *
x=linspace(-2,2)
y=2*x+1
plt.xlim(-2,2)
plt.ylim(-3,5)
 
ax=plt.gca()  #gca:get current axis得到当前轴
#设置图片的右边框和上边框为不显示
ax.spines['right'].set_color('none')
ax.spines['top'].set_color('none')
 
#挪动x，y轴的位置，也就是图片下边框和左边框的位置
ax.spines['bottom'].set_position(('data',0))  #data表示通过值来设置x轴的位置，将x轴绑定在y=0的位置
ax.spines['left'].set_position(('axes',0.5))  #axes表示以百分比的形式设置轴的位置，即将y轴绑定在x轴50%的位置，也就是x轴的中点
 
plt.plot(x,y)

```

## mpl_toolkits.mplot3d

mpl_toolkits.mplot3d是Matplotlib里面专门用来画三维图的工具包，官方指南请点击此处[《mplot3d tutorial》](https://matplotlib.org/tutorials/toolkits/mplot3d.html)

使用from mpl_toolkits.mplot3d import \*或者import mpl_toolkits.mplot3d as p3d导入

有两种画图方式

```python
fig = plt.figure()
ax = p3d.Axes3D(fig)
```

```python
fig = plt.figure()
ax = fig.add_subplot(111, projection='3d')
```

画三维图需要先得到一个Axes3D对象，上面两种方式得到的ax都是Axes3D对象，接下来就可以调用函数在ax上画图了。如下(IPython)：

```python
In [1]: %matplotlib inline
        import numpy as np
        import matplotlib.pyplot as plt
        import mpl_toolkits.mplot3d as p3d

        fig = plt.figure()
        ax = p3d.Axes3D(fig)

        z = np.linspace(0, 15, 1000)
        x = np.sin(z)
        y = np.cos(z)
        ax.plot(x, y, z, 'green')
```

效果如下：

![](https://raw.githubusercontent.com/ShawnDong98/ShawnDong98.github.io/master/小书匠/1599375546609.png)

### plot_surface

3D 图形需要的数据与等高线图基本相同：X、Y 数据决定坐标点，Z 轴数据决定 X、Y 坐标点对应的高度。与等高线图使用等高线来代表高度不同，3D 图形将会以更直观的形式来表示高度。

为了绘制 3D 图形，需要调用 Axes3D 对象的 plot_surface()方法来完成。

plot_surface参数:

![](https://raw.githubusercontent.com/ShawnDong98/ShawnDong98.github.io/master/小书匠/1599376104600.png)

# seaborn语法

## seaborn.set()

> seaborn.set(context='notebook', style='darkgrid', palette='deep', font='sans-serif', font_scale=1, color_codes=True, rc=None)

一步设置外观参数

- context(string or dict): 画文本时的参数
- style(string or dict): 轴样式参数
- palette(string or sequence): 调色板
- font(string): 字体族
- font_scale(float, optimal): 字体放缩大小
- color_codes(bool): 如果是True并且是seaborn的调色板, 重映射速记的颜色编码(e.g. "b", "g", "r", etc.)到这个调色板的颜色.
- rc(dict or None): rc参数的字典映射到重写上述参数.

## 绘制线图

> seaborn.lineplot(x=None, y=None, hue=None, size=None, style=None,
 data=None, palette=None, hue_order=None, hue_norm=None, sizes=None,
  size_order=None, size_norm=None, dashes=True, markers=None, 
  style_order=None, units=None, estimator='mean', ci=95, n_boot=1000, 
  sort=True, err_style='band', err_kws=None, legend='brief', ax=None, \*\*kwargs)
  
参数：
- x, y：输入数据变量，必须是数字。可以直接传递数据或引用数据中的列
- hue：分组变量将产生具有不同颜色的线。可以是分类的也可以是数字的，尽管颜色映射在后一种情况下的表现会有所不同。
- size：分组变量将产生不同宽度的线。可以是分类的也可以是数字的，尽管大小映射在后一种情况下会有所不同。
- style：分组变量将产生带有不同破折号和/或标记的线。可以具有数字dtype，但始终将其视为类别。
- data：整齐（“长格式”）数据帧，其中每一列都是变量，每一行都是观察值。


# PIL(Image)用法

## open


```python
>>> from PIL import Image
>>> im = Image.open("hopper.ppm")
```

```python
>>> print(im.format, im.size, im.mode)
PPM (512, 512) RGB
```



## 显示Image类型图像

方法1：

```python
img.show()
```

方法2：

```python
plt.imshow(img)
plt.show()
```

## transpose方法

>   im.transpose(method)⇒ image

返回当前图像的翻转或者旋转的拷贝。变量方法的取值为：FLIP_LEFT_RIGHT，FLIP_TOP_BOTTOM，ROTATE_90，ROTATE_180，或ROTATE_270。

## Image、numpy转化

Image转numpy：

> img = numpy.array(im)

numpy转Image：

> img = Image.fromarray(img.astype('uint8')).convert('RGB')


