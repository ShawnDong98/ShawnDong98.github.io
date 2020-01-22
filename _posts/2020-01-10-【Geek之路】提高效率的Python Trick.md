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


# Reference
1. [python 字符串补全填充固定长度（补0）的三种方法](https://blog.csdn.net/weixin_42317507/article/details/93411132)
2. [Python3 菜鸟教程](https://www.runoob.com/python3/python3-assert.html)