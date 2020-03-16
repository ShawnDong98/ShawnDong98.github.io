---
layout:     post
title:      "【Geek之路】Python语法与Python Tricks"
subtitle:   ""
date:       2020-01-10
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     true
tags:
    - Python
    - 
---

# Python 语法


## assert(断言)

> Python assert（断言）用于判断一个表达式，在表达式条件为 false 的时候触发异常。
断言可以在条件不满足程序运行的情况下直接返回错误，而不必等待程序运行后出现崩溃的情况，例如我们的代码只能在 Linux 系统下运行，可以先判断当前系统是否符合条件。

![](https://raw.githubusercontent.com/ShawnDong98/ShawnDong98.github.io/master/小书匠/1579654992263.png)

 ## zip() 函数
 
 > zip() 函数用于将可迭代的对象作为参数，将对象中对应的元素打包成一个个元组，然后返回由这些元组组成的对象，这样做的好处是节约了不少的内存。

>我们可以使用 list() 转换来输出列表。

>如果各个迭代器的元素个数不一致，则返回列表长度与最短的对象相同，利用 * 号操作符，可以将元组解压为列表。

```
>>>a = [1,2,3]
>>> b = [4,5,6]
>>> c = [4,5,6,7,8]
>>> zipped = zip(a,b)     # 返回一个对象
>>> zipped
<zip object at 0x103abc288>
>>> list(zipped)  # list() 转换为列表
[(1, 4), (2, 5), (3, 6)]
>>> list(zip(a,c))              # 元素个数与最短的列表一致
[(1, 4), (2, 5), (3, 6)]
 
>>> a1, a2 = zip(*zip(a,b))          # 与 zip 相反，zip(*) 可理解为解压，返回二维矩阵式
>>> list(a1)
[1, 2, 3]
>>> list(a2)
[4, 5, 6]
>>>
```


## Python中collections模块

这个模块实现了特定目标的容器，以提供Python标准内建容器 dict、list、set、tuple 的替代选择。

- Counter：字典的子类，提供了可哈希对象的计数功能
- defaultdict：字典的子类，提供了一个工厂函数，为字典查询提供了默认值
- OrderedDict：字典的子类，保留了他们被添加的顺序
- namedtuple：创建命名元组子类的工厂函数
- deque：类似列表容器，实现了在两端快速添加(append)和弹出(pop)
- ChainMap：类似字典的容器类，将多个映射集合到一个视图里面

**defaultdict**

defaultdict的一个典型用法是使用其中一种内置类型(如str、int、list或dict)作为默认工厂，因为这些内置类型在没有参数调用时返回空类型。

使用int作为default_factory的例子：

```python
>>> from collections import defaultdict
>>> fruit = defaultdict(int)
>>> fruit['apple'] += 2 
>>> fruit
defaultdict(<class 'int'>, {'apple': 2})
>>> fruit
defaultdict(<class 'int'>, {'apple': 2})
>>> fruit['banana']  # 没有对象时，返回0
0
>>> fruit
defaultdict(<class 'int'>, {'apple': 2, 'banana': 0})
```
使用list作为default_factory的例子：

```python
>>> s = [('NC', 'Raleigh'), ('VA', 'Richmond'), ('WA', 'Seattle'), ('NC', 'Asheville')]
>>> d = collections.defaultdict(list)
>>> for k,v in s:
...      d[k].append(v)
... 
>>> d
defaultdict(<class 'list'>, {'NC': ['Raleigh', 'Asheville'], 'VA': ['Richmond'], 'WA': ['Seattle']})

```

## 介绍python函数传参

1. Python不允许程序员选择采用传值还是传引用。Python参数传递采用的肯定是“传对象引用”的方式。实际上，这种方式相当于传值和传引用的一种综合。如果函数收到的是一个可变对象（比如字典或者列表）的引用，就能修改对象的原始值——相当于通过“传引用”来传递对象。如果函数收到的是一个不可变对象（比如数字、字符或者元组）的引用，就不能直接修改原始对象——相当于通过“传值”来传递对象。

2. 当人们复制列表或字典时，就复制了对象列表的引用同，如果改变引用的值，则修改了原始的参数。

3. 为了简化内存管理，Python通过引用计数 机制实现自动垃圾回收功能，Python中的每个对象都有一个引用计数，用来计数该对象在不同场所分别被引用了多少次。每当引用一次Python对象，相应的引用计数就增1，每当消毁一次Python对象，则相应的引用就减1，只有当引用计数为零时，才真正从内存中删除Python对象。


上面也就是说，当我们传的参数是int、字符串(string)、float、（数值型number）、元组（tuple) 时，无论函数中对其做什么操作，都不会改变函数外这个参数的值；

当传的是字典型(dictionary)、列表型(list)时，如果是重新对其进行赋值，则不会改变函数外参数的值，如果是对其进行操作，则会改变。

即变量中存储的是引用 , 是指向真正内容的内存地址 , 对变量重新赋值 , 相当于修改了变量副本存储的内存地址 , 而这时的变量已经和函数体外的变量不是同一个了, 在函数体之外的变量 , 依旧存储的是原本的内存地址 , 其值自然没有发生改变 。

简单来说 :
- 函数体传入的参数 , 为函数体外变量引用的副本 .
- 在函数体中改变变量指向的堆中的值 , 对函数外变量有效.
- 在函数体中改变变量的引用 , 对函数外变量无效

## glob

glob 文件名模式匹配，不用遍历整个目录判断每个文件是不是符合。

1、通配符

星号(\*)匹配零个或多个字符

```python
import glob
for name in glob.glob('dir/*'):
    print (name)
```

```python
dir/file.txt
dir/file1.txt
dir/file2.txt
dir/filea.txt
dir/fileb.txt
dir/subdir
```

列出子目录中的文件，必须在模式中包括子目录名：

```python
import glob

#用子目录查询文件
print ('Named explicitly:')
for name in glob.glob('dir/subdir/*'):
    print ('\t', name)
#用通配符* 代替子目录名
print ('Named with wildcard:')
for name in glob.glob('dir/*/*'):
    print ('\t', name)
```

```python
Named explicitly:
        dir/subdir/subfile.txt
Named with wildcard:
        dir/subdir/subfile.txt
```

2、单个字符通配符

用问号(?)匹配任何单个的字符。

```python
import glob

for name in glob.glob('dir/file?.txt'):
    print (name)
```

```python
dir/file1.txt
dir/file2.txt
dir/filea.txt
dir/fileb.txt
```

3、字符范围

当需要匹配一个特定的字符，可以使用一个范围

```python
import glob
for name in glob.glob('dir/*[0-9].*'):
    print (name)
```

```python
dir/file1.txt
dir/file2.txt

```


## setattr()、getattr()、hasattr() 
在动态检查对象是否包含某些属性（包括方法〉相关的函数有如下几个：

- hasattr(object,name)：检查 object 对象是否包含名为 name 的属性或方法。
- getattr(object,name,default=None)：获取 object 对象中名为 name 的属性的属性值(属性和函数都叫做属性)。
- setattr(object,name,value)：将 object 对象的 name 属性设为 value。

## python字符串前加r、f、u、l 的区别

### 字符串前加 “f”

f-strings 是指以 f 或 F 开头的字符串，其中以 {} 包含的表达式会进行值替换。（目前支持python3.6版本）

下面看下 f-strings 的使用方法

基本使用（作用：替换值）

```python
>>>name = 'hoxis'
>>> age = 18
>>> f"hi, {name}, are you {age}"
#结果如下
'hi, hoxis, are you 18'
>>> F"hi, {name}, are you {age}"
'hi, hoxis, are you 18'
```

### 字符串前加 “r”

在字符串前加r可防止字符串转义


### 字符串前加 “u”

u/U:表示unicode字符串 

不是仅仅是针对中文, 可以针对任何的字符串，代表是对字符串进行unicode编码。 

一般英文字符在使用各种编码下, 基本都可以正常解析, 所以一般不带u；但是中文, 必须表明所需编码, 否则一旦编码转换就会出现乱码。 

建议所有编码方式采用utf8

### 字符串前加 “l”

表示宽字符，unicode字符（ unicode字符集是两个字节组成的。L告示编译器使用两个字节的 unicode 字符集） 如  L"我的字符串"    表示将ANSI字符串转换成unicode的字符串，就是每个字符占用两个字节。

```python
不加时占用字节
strlen("asd")   =   3;   
  
  
加之后占用字节
strlen(L"asd")   =   6;
```
# numpy语法

## numpy 模块的 size,shape, len的用法

### size的用法

```python
import numpy as np
X=np.array([[1,2,3,4],
              [5,6,7,8],
              [9,10,11,12]])
 
number=X.size  # 计算 X 中所有元素的个数
X_row=np.size(X,0)  #计算 X 一行元素的个数
X_col=np.size(X,1)  #计算 X 一列元素的个数
 
print("number:",number)
print("X_row:",X_row)
print("X_col:",X_col)
 
<<
number: 12
X_row: 3
X_col: 4
```

### shape的用法

```python
import numpy as np
X=np.array([[1,2,3,4],
              [5,6,7,8],
              [9,10,11,12]])
 
X_dim=X.shape  # 以元组形式，返回数组的维数
print("X_dim:",X_dim)
print(X.shape[0])  # 输出行的个数
print(X.shape[1])  #输出列的个数
 
<<
X_dim: (3, 4)
3
4
```

注意返回的是个元组

### len的用法

```python
import numpy as np
X=np.array([[1,2,3,4],
              [5,6,7,8],
              [9,10,11,12]])
 
length=len(X)  #返回对象的长度   不是元素的个数
print("length of X:",length)
 
<<
length of X: 3
```

## np.prod

> np.prod()

用来计算所有元素的乘积，对于有多个维度的数组可以指定轴，如axis=1指定计算每一行的乘积。

![](https://raw.githubusercontent.com/ShawnDong98/ShawnDong98.github.io/master/小书匠/1580285712009.png)

## np.random.normal()

> numpy.random.normal(loc=0.0, scale=1.0, size=None) 

参数的意义为：

　　loc:float

　　概率分布的均值，对应着整个分布的中心center

　　scale:float

　　概率分布的标准差，对应于分布的宽度，scale越大越矮胖，scale越小，越瘦高

　　size:int or tuple of ints

　　输出的shape，默认为None，只输出一个值

　　我们更经常会用到np.random.randn(size)所谓标准正太分布（μ=0, σ=1），对应于np.random.normal(loc=0, scale=1, size)


## numpy.random.randint

> numpy.random.randint(low, high=None, size=None, dtype='l')

- low: int
生成的数值最低要大于等于low。
（hign = None时，生成的数值要在[0, low)区间内）
- high: int (可选)
如果使用这个值，则生成的数值在[low, high)区间。
- size: int or tuple of ints(可选)
输出随机数的尺寸，比如size = (m * n* k)则输出同规模即m * n* k个随机数。默认是None的，仅仅返回满足要求的单一随机数。
- dtype: dtype(可选)：
想要输出的格式。如int64、int等等

## np.maximum、 np.minimum

### np.max 与 np.maximum

> np.max(a, axis=None, out=None, keepdims=False)

- 求序列的最值
- 最少接收一个参数
- axis：默认为列向（也即 axis=0），axis = 1 时为行方向的最值；

> np.maximum：(X, Y, out=None)

- X 与 Y 逐位比较取其大者；
- 最少接收两个参数
- 带有广播机制

> np.minimum：(X, Y, out=None)

- 与maximum基本一致，只不过取小者

```python
import numpy as np
>>> np.maximum([1,2,3,4,5],2)
array([2, 2, 3, 4, 5])
 
>>> np.minimum([2, 3, 4], [1, 5, 2])
array([1, 3, 2])

```


## np.expand_dims

np.expand_dims:用于扩展数组的形状

原始数组：

```python
import numpy as np

In [12]:
a = np.array([[[1,2,3],[4,5,6]]])
a.shape
Out[12]:
(1, 2, 3)
```

np.expand_dims(a, axis=0)表示在0位置添加数据,转换结果如下：

```python
In [13]:
b = np.expand_dims(a, axis=0)
b
Out[13]:
array([[[[1, 2, 3],
         [4, 5, 6]]]])

In [14]:
b.shape
Out[14]:
(1, 1, 2, 3)
```

np.expand_dims(a, axis=1)表示在1位置添加数据,转换结果如下：

```python
In [15]:
c = np.expand_dims(a, axis=1)
c
Out[15]:
array([[[[1, 2, 3],
         [4, 5, 6]]]])

In [16]:
c.shape
Out[16]:
(1, 1, 2, 3)
```

np.expand_dims(a, axis=2)表示在2位置添加数据,转换结果如下：

```python
In [17]:
d = np.expand_dims(a, axis=2)
d
Out[17]:
array([[[[1, 2, 3]],
        [[4, 5, 6]]]])

In [18]:
d.shape
Out[18]:
(1, 2, 1, 3)
```

np.expand_dims(a, axis=3)表示在3位置添加数据,转换结果如下：

```python
In [19]:
e = np.expand_dims(a, axis=3)
e

In [20]:
e.shape
Out[20]:
(1, 2, 3, 1)
```

能在(1,2,3)中插入的位置总共为4个，再添加就会出现以下的警告，要不然也会在后面某一处提示AxisError。

```python
In [21]:
f = np.expand_dims(a, axis=4)
D:\ProgramData\Anaconda3\envs\dlnd\lib\site-packages\ipykernel_launcher.py:1: DeprecationWarning: Both axis > a.ndim and axis < -a.ndim - 1 are deprecated and will raise an AxisError in the future.
  """Entry point for launching an IPython kernel.
```

axis = -1 也就是相当于在最后插入

```
a = np.array([[[1,2,3],[4,5,6]]])
b = np.expand_dims(a,axis=-1)
print(b.shape)
```

输出：\\
> (1, 2, 3, 1)

# pandas语法

# matplotlib语法

# seaborn语法

# PIL(Image)用法

## transpose方法

>   im.transpose(method)⇒ image

返回当前图像的翻转或者旋转的拷贝。变量方法的取值为：FLIP_LEFT_RIGHT，FLIP_TOP_BOTTOM，ROTATE_90，ROTATE_180，或ROTATE_270。

## Image、numpy转化

Image转numpy：

> img = numpy.array(im)

numpy转Image：

> img = Image.fromarray(img.astype('uint8')).convert('RGB')



# tqdm



# sys

## sys.path

返回模块的搜索路径，初始化时使用PYTHONPATH环境变量的值

比如就是我们在python源文件中import引入模块的时候就会在sys.path的目录中查找相应的模块，如果在这里面的目录中没有找到你要倒入的模块则会报错。

返回值是一个list则我们如果想倒入一个自定义模块下面的的包或者是模块则可以使用list的append方法在PYTHONPATH环境变量中增加相应的路径。


# Python Tricks

## 将20W张图片分别存放在100个文件夹中

```python
import os
import shutil
import traceback

def move_file(src_path, dst_path, file):
    print('from : ',src_path)
    print('to : ',dst_path)
    try:
        # cmd = 'chmod -R +x ' + src_path
        # os.popen(cmd)
        f_src = os.path.join(src_path, file)
        if not os.path.exists(dst_path):
            os.mkdir(dst_path)
        f_dst = os.path.join(dst_path, file)
        shutil.move(f_src, f_dst)
    except Exception as e:
        print('move_file ERROR: ',e)
	
i = 0
j = 0
for i in range(200000):
    move_file(("./data/img_align_celeba/"),\
                  ("./data/"+str(j)+"/"), (str(i).rjust(6,'0')+".jpg"))
    if (((i+1) % 2000) == 0):
        j = j + 1
```

## .h5文件的使用



# Reference
1. [python 字符串补全填充固定长度（补0）的三种方法](https://blog.csdn.net/weixin_42317507/article/details/93411132)
2. [Python3 菜鸟教程](https://www.runoob.com/python3/python3-assert.html)
3. [np.prod() 函数计算数组元素乘积等](https://blog.csdn.net/Hero_Never_GIVE_UP/article/details/81114308)
4. [H5文件简介和使用](https://blog.csdn.net/omg_orange/article/details/90378193)
5. [python：函数传参是否会改变函数外参数的值](https://blog.csdn.net/liuxiao214/article/details/81673093)
6. [python字符串前加r、f、u、l 的区别](https://www.cnblogs.com/navysummer/p/12131824.html)
7. [Python图像库PIL的类Image及其方法介绍](https://blog.csdn.net/leemboy/article/details/83792729)
8. [Python的Tqdm模块——进度条配置](https://blog.csdn.net/qq_33472765/article/details/82940843)
9. [python3 sys模块](https://www.jianshu.com/p/985980202ea7)
10. [np.max 与 np.maximum](https://blog.csdn.net/lanchunhui/article/details/52700895)
11. [np.maximum vs np.minimum](https://blog.csdn.net/u014080555/article/details/93859079)
12. [Numpy知识点补充：np.expand_dims()&np.argmax()](https://www.jianshu.com/p/da10840660cb)
13. [python setattr()、getattr()、hasattr() 函数用法介绍](https://www.cnblogs.com/hao2018/p/11428951.html)