---
layout:     post
title:      "【Geek之路】Python语法与Python Tricks"
subtitle:   ""
date:       2020-01-10
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     true
tags:
    - Geek
    - Python
---

# Python 语法

## list

\*list[:2]和list[:2]区别

- list[:2]：返回的还是一个list
- \*list[:2]：返回的是内容

例子：

```python
ll = ['lalala', 'test', 'hello world']
print(ll[0:2])
print(*ll[0:2])
```

输出：\\
['lalala', 'test'] \\
lalala test

拓展来讲，一个迭代器使用\*返回的一串迭代结果。

如：

```
ll = ['lalala', 'test', 'hello world']
print(ll[0])
print(*ll[0])
```

输出：\\
lalala \\
l a l a l a

## dict

### get
通过dict提供的get方法，如果key不存在，可以返回None，或者自己指定的value：

```python
>>> d.get('Thomas')
>>> d.get('Thomas', -1)
-1
```

注意：返回None的时候Python的交互式命令行不显示结果。

### pop

要删除一个key，用pop(key)方法，对应的value也会从dict中删除：

```python
>>> d.pop('Bob')
75
>>> d
{'Michael': 95, 'Tracy': 85}
```




## str

### join

join()：连接字符串数组。将字符串、元组、列表中的元素以指定的字符(分隔符)连接生成一个新的字符串

### startwith

> str.startswith(str, beg=0,end=len(string));

- str -- 检测的字符串。
- strbeg -- 可选参数用于设置字符串检测的起始位置。
- strend -- 可选参数用于设置字符串检测的结束位置。

Python startswith() 方法用于检查字符串是否是以指定子字符串开头，如果是则返回 True，否则返回 False。如果参数 beg 和 end 指定值，则在指定范围内检查。

## map

> map（func, *iterables）:第一个是函数，第二个是可迭代序列

```
>>> help(map)
Help on class map in module builtins:
 
class map(object)
 |  map(func, *iterables) --> map object
 |  
 |  Make an iterator that computes the function using arguments from
 |  each of the iterables.  Stops when the shortest iterable is exhausted.
 |  
 |  Methods defined here:
 |  
 |  __getattribute__(self, name, /)
 |      Return getattr(self, name).
 |  
 |  __iter__(self, /)
 |      Implement iter(self).
 |  
 |  __new__(*args, **kwargs) from builtins.type
 |      Create and return a new object.  See help(type) for accurate signature.
 |  
 |  __next__(self, /)
 |      Implement next(self).
 |  
 |  __reduce__(...)
 |      Return state information for pickling.
```


map的用法：将序列的每一个元素作为函数的参数进行运算 

```python
>>> list(map(lambda x : x / 2 ,(1,2,3,4,5)))
[0.5, 1.0, 1.5, 2.0, 2.5]
 
>>> list(map(lambda x : x / 2,range(1,6)))
[0.5, 1.0, 1.5, 2.0, 2.5]
```

map返回的是一个迭代器

map也可以用作类型转换， 如

```python
",".join(map(str, (128, 128)))
```

返回字符串128， 128

## lambda

```python
g = lambda x:x+1
```

lambda作为一个表达式，定义了一个匿名函数，上例的代码x为入口参数，x+1为函数体


```python
>>> foo = [2, 18, 9, 22, 17, 24, 8, 12, 27]
>>>
>>> print filter(lambda x: x % 3 == 0, foo)
[18, 9, 24, 12, 27]
>>>
>>> print map(lambda x: x * 2 + 10, foo)
[14, 46, 28, 54, 44, 58, 26, 34, 64]
>>>
>>> print reduce(lambda x, y: x + y, foo)
```


## copy

![](https://raw.githubusercontent.com/ShawnDong98/ShawnDong98.github.io/master/小书匠/1585271722256.png)


> 首先直接上结论： —–我们寻常意义的复制就是深复制，即将被复制对象完全再复制一遍作为独立的新个体单独存在。所以改变原有被复制对象不会对已经复制出来的新对象产生影响。
—–而浅复制并不会产生一个独立的对象单独存在，他只是将原有的数据块打上一个新标签，所以当其中一个标签被改变的时候，数据块就会发生变化，另一个标签也会随之改变。这就和我们寻常意义上的复制有所不同了。

对于简单的 object，用 shallow copy 和 deep copy 没区别

复杂的 object， 如 list 中套着 list 的情况，shallow copy 中的 子list，并未从原 object 真的「独立」出来。也就是说，如果你改变原 object 的子 list 中的一个元素，你的 copy 就会跟着一起变。这跟我们直觉上对「复制」的理解不同。

## assert(断言)

> Python assert（断言）用于判断一个表达式，在表达式条件为 false 的时候触发异常。
断言可以在条件不满足程序运行的情况下直接返回错误，而不必等待程序运行后出现崩溃的情况，例如我们的代码只能在 Linux 系统下运行，可以先判断当前系统是否符合条件。

![](https://raw.githubusercontent.com/ShawnDong98/ShawnDong98.github.io/master/小书匠/1579654992263.png)

## random

> random.sample(population, k)

返回从总体序列或集合中选择的唯一元素的 k 长度列表。 用于无重复的随机抽样。

这里的唯一元素是指每个元素只会返回一次，是不重复的。

```python
style = [1, 2 ,3, 4]
t = random.sample(style, 2)
print(t)
```

输出：\\
[2, 1]

## super

如果在子类中也定义了_init_()函数，那么该如何调用基类的_init_()函数：

方法一、明确指定 ：

```python
class  C(P):
     def __init__(self):
             P.__init__(self)
             print 'calling Cs construtor'
```

方法二、使用super()方法 :

```python
class  C(P):
    def __init__(self):
            super(C,self).__init__()
            print 'calling Cs construtor'
 
c=C()
```

Python中的super()方法设计目的是用来解决多重继承时父类的查找问题，所以在单重继承中用不用 super 都没关系；但是，使用 super() 是一个好的习惯。一般我们在子类中需要调用父类的方法时才会这么用。

super()的好处就是可以避免直接使用父类的名字.主要用于多重继承，如下：

```python
class A:
 def m(self):
  print('A')
 
class B:
 def m(self):
  print('B')
 
class C(A):
 def m(self):
  print('C')
  super().m()
 
C().m()
```

这样做的好处就是：如果你要改变子类继承的父类（由A改为B），你只需要修改一行代码（class C(A): -> class C(B)）即可，而不需要在class C的大量代码中去查找、修改基类名，另外一方面代码的可移植性和重用性也更高。

另外：避免使用 super(self.\_\_class\_\_, self)，一般情况下是没问题的，就是怕极端的情况：

```python
class Foo(object):
    def x(self):
        print 'Foo'
 
class Foo2(Foo):
    def x(self):
        print 'Foo2'
        super(self.__class__, self).x() # wrong
 
class Foo3(Foo2):
    def x(self):
        print 'Foo3'
        super(Foo3, self).x()
 
f = Foo3()
f.x()
```

在 Foo2 中的 super(self.\_\_class\_\_, self) 导致了死循环，super 永远去找 Foo3 的 MRO 中的下一个类，super 的第一个参数应该总是当前的类，Python 没有规定代码必须怎样去写，但是养成一些好的习惯是很重要，会避免很多你不了解的问题发生。

Python3.x 和 Python2.x 的一个区别是: Python 3 可以使用直接使用 super().xxx 代替 super(Class, self).xxx 


## __call__

在类中定义__call__可以像调用函数一样使用实例调用__call__这个方法。

```python
class test:
    def __init__(self):
        super().__init__()
        print("I'm in init")

    @staticmethod
    def apply():
        t = test()
        print("I'm in apply")
        
        return t

    def __call__(self):
        print("I'm in call")
		
		
tt = test.apply()
tt()
```

输出：\\
I'm in init \\
I'm in apply \\
I'm in call



## 装饰器 

### @staticmethod@classmethod

一般来说，调用某个类的方法，需要先生成一个实例，再通过实例调用方法。Java中有静态变量，静态方法，可以使用类直接进行调用。Python提供了两个修饰符@staticmethod @classmethod也可以达到类似效果。

@staticmethod 声明方法为静态方法，直接通过 类||实例.静态方法（）调用。经过@staticmethod修饰的方法，不需要self参数，其使用方法和直接调用函数一样。

```python
#直接定义一个test()函数
def test():
    print "i am a normal method!"
#定义一个类，其中包括一个类方法，采用@staticmethod修饰    
class T:

    @staticmethod
    def static_test():#没有self参数
        print "i am a static method!"

if __name__ == "__main__":
    test()
    T.static_test()
    T().static_test()

output:
i am a normal method!
i am a static method!
i am a static method!      
```

@classmethod声明方法为类方法,直接通过 类||实例.类方法（）调用。经过@classmethod修饰的方法，不需要self参数，但是需要一个标识类本身的cls参数。

```python
class T:
    @classmethod
    def class_test(cls):#必须有cls参数
        print "i am a class method"
if __name__ == "__main__":
    T.class_test()
    T().class_test()

output:
i am a class method
i am a class method   
```


## nonlocal

### 闭包

```python
def line_6(k, b):
    def create_y(x):
        print(k * x + b)
    return create_y
```

return 后面返回的是引用，调用的话还是在外部调用。

闭包：一个函数中嵌套着另一个函数的定义，真正使用的也是内部函数，往往内部函数又要用到外部变量。这样子内部函数和要使用的外部函数的变量共同组成的空间就构成了一个闭包。也就是说，闭包是简单的功能+数据，跟实例对象类似但是更简单，数据、内存等也更少。


### nonlocal

字如其名， 声明非局部变量

使用这个关键字所要注意的点:
- 外部必须有这个量
- 在内部函数声明nonlocal变量之前不能出现同名变量
- 内部修改这个变量,在外部有这个变量的第一层函数中生效

```python
x = 300
def test1():
    x = 200
    def test2():
        nonlocal x    #如果没有这句话，下一句中默认在本函数中先找，找到了但是却发现在后面，之前没有定义，则报错
        print("---1---x = %d" % x)
        x = 100
        print("---2---x = %d" % x)
    return test2
 
t1 = test1()
t1()
 
#结果：
#---1---x = 200
#---2---x = 100
```

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

### 参数带星号的说明

> F(\*arg1)

有时候会不确定有多少个参数，它以一个\*加上形参名的方式来表示这个函数 的实参个数不定，可能为0个也可能为n个。注意一点是，不管有多少个，在函数内部都被存放在以形参名为标识符的tuple中。

```python
>>> def a(*x):
if len(x)==0:
print 'None'
else:
print x
>>> a(1)
(1,)        #存放在元组中
>>> a()
None
>>> a(1,2,3)
(1, 2, 3)
>>> a(m=1,y=2,z=3)

Traceback (most recent call last):
File "<pyshell#16>", line 1, in -toplevel-
a(m=1,y=2,z=3)
TypeError: a() got an unexpected keyword argument 'm
```

> F(**arg1)


形参名前加俩个\*表示，参数在函数内部将被存放在以形式名为标识符的dictionary中，这时调用函数的方法则需要采用arg1=value1,arg2=value2这样的形式。

```python
>>> def a(**x):
if len(x)==0:
print 'None'
else:
print x  
>>> a()
None
>>> a(x=1,y=2)
{'y': 2, 'x': 1}      #存放在字典中
>>> a(1,2)            #这种调用则报错

Traceback (most recent call last):
File "<pyshell#25>", line 1, in -toplevel-
a(1,2)
TypeError: a() takes exactly 0 arguments (2 given)

```

**优先级**：

```python
def test0(arg, *args):
    print(arg)
    print(args)

def test1(*args, arg):
    print(arg)
    print(args)

def test2(*args, arg=None):
    print(arg)
    print(args)

test0(1, 2, 3, 4)
test1(1, 2, 3, 4)
test2(1, 2, 3, 4)
```

打印结果分别为：

1 \\
(2, 3, 4)

TypeError: test1() missing 1 required keyword-only argument: 'arg'

None \\
(1, 2, 3, 4)

因此当arg在\*args前时，依次填入参数

当\*args在arg前，且arg没有默认值，且送入函数的值没有keywords， 报错。

当\*args在arg前，arg有默认参数，且送入函数的值没有keywords，参数全为\*args， arg为默认值。


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








## time和timeit



# os和sys


## os.listdir

> os.listdir(path)

返回指定目录下的所有文件和目录名。


## os.walk

> os.walk(top, topdown=True, οnerrοr=None, followlinks=False)

- top 是你所要便利的目录的地址
- topdown 为真，则优先遍历top目录，否则优先遍历top的子目录(默认为开启)
- onerror 需要一个 callable 对象，当walk需要异常时，会调用
- followlinks 如果为真，则会遍历目录下的快捷方式(linux 下是 symbolic link)实际所指的目录(默认关闭)

os.walk 的返回值是一个生成器(generator),也就是说我们需要不断的遍历它，来获得所有的内容。



## os.path常用方法：

> os.path.join(path1[, path2[, ...]])

将多个路径组合后返回，第一个绝对路径之前的参数将被忽略

> os.path.split(path)

将path分割成目录和文件名二元组返回。



## sys.path

返回模块的搜索路径，初始化时使用PYTHONPATH环境变量的值

比如就是我们在python源文件中import引入模块的时候就会在sys.path的目录中查找相应的模块，如果在这里面的目录中没有找到你要倒入的模块则会报错。

返回值是一个list则我们如果想导入一个自定义模块下面的的包或者是模块则可以使用list的append方法在PYTHONPATH环境变量中增加相应的路径。

```python
import os
import sys
path=os.path.dirname(__file__)    #os.path.dirname通俗的讲是返回上一级文件夹绝对路径的意思，多套一层就多返回一层
sys.path.append(path)    #将路径添加到python的搜索路径中
#import 你想导入的文件

```

## os.getcwd

> os.getcwd()

得到当前工作目录，即当前Python脚本工作的目录路径。


### 获取当前路径

```python
print("===获取当前文件目录===")
# 当前脚本工作的目录路径
print(os.getcwd())
# os.path.abspath()获得绝对路径
print(os.path.abspath(os.path.dirname(__file__)))
```


### 获取上层路径

```python
print("=== 获取当前文件上层目录 ===")
print(os.path.abspath(os.path.dirname(os.path.dirname(__file__))))
print(os.path.abspath(os.path.dirname(os.getcwd())))
print(os.path.abspath(os.path.join(os.getcwd(), "..")))
print(os.path.dirname(os.getcwd()))
# os.path.join()连接目录名与文件或目录
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

## np.stack

> numpy.stack(arrays, axis=0)

沿着新轴连接数组的序列。

## np.ravel

> numpy.ravel(a, order='C')

返回一个连续的、拉平的数组。

返回一个一维的数组， 包含输入的元素。 只有在必要的情况返回一个副本。

- a：输入的数组
- order {‘C’,’F’, ‘A’, ‘K’}, optional ： a的元素按照这个索引顺序读取。'C'意味着按行索引元素， ‘F’意味着按列索引元素。

## np.mgrid

> np.mgrid[start:end:step]

```python
mgrid[[1:3:3j, 4:5:2j]] 
```

- 3j：3个点
- 步长为复数表示点数，左闭右闭
- 步长为实数表示间隔，左闭右开

**例如1D结构（array），如下：**

```python
>>> import numpy as np
>>> x=np.mgrid[-5:5:5j]
>>> x
array([-5. , -2.5,  0. ,  2.5,  5. ])
>>> 
```

**例如2D结构 (2D矩阵)，如下：**

```python
>>> import numpy as np
>>> x,y=np.mgrid[-5:5:3j,-2:2:3j]
>>> x
array([[-5., -5., -5.],
       [ 0.,  0.,  0.],
       [ 5.,  5.,  5.]])
>>> y
array([[-2.,  0.,  2.],
       [-2.,  0.,  2.],
       [-2.,  0.,  2.]])
>>> 
```

其中x沿着水平向右的方向扩展(即是：每列都相同)，y沿着垂直的向下的方向扩展(即是：每行都相同)。

## np.prod

> np.prod()

用来计算所有元素的乘积，对于有多个维度的数组可以指定轴，如axis=1指定计算每一行的乘积。

![](https://raw.githubusercontent.com/ShawnDong98/ShawnDong98.github.io/master/小书匠/1580285712009.png)

## np.where

### np.where(condition, x, y)

满足条件(condition)，输出x，不满足输出y。

```python
>>> aa = np.arange(10)
>>> np.where(aa,1,-1)
array([-1,  1,  1,  1,  1,  1,  1,  1,  1,  1])  # 0为False，所以第一个输出-1
>>> np.where(aa > 5,1,-1)
array([-1, -1, -1, -1, -1, -1,  1,  1,  1,  1])
```

### np.where(condition)

只有条件 (condition)，没有x和y，则输出满足条件 (即非0) 元素的坐标 (等价于numpy.nonzero)。这里的坐标以tuple的形式给出，通常原数组有多少维，输出的tuple中就包含几个数组，分别对应符合条件元素的各维坐标。

```python
>>> a = np.array([2,4,6,8,10])
>>> np.where(a > 5)				# 返回索引
(array([2, 3, 4]),)   
>>> a[np.where(a > 5)]  			# 等价于 a[a>5]
array([ 6,  8, 10])

>>> np.where([[0, 1], [1, 0]])
(array([0, 1]), array([1, 0]))
```

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



## numpy.broadcast_to

> numpy.broadcast_to(array, shape, subok)

将array广播成shape的形状

## 完整打印矩阵

np.set_printoptions 设置打印选项，这些选项决定显示浮点数、数组和其他NumPy对象的方式。

> numpy.set_printoptions(precision=None, 
                       threshold=None, 
                       edgeitems=None, 
                       linewidth=None, 
                       suppress=None, 
                       nanstr=None, 
                       infstr=None, 


np.set_printoptions(threshold = 1e6) #设置打印数量的阈值，1e6 = 1000000.0此方法为设置一较大值



# pandas语法

# matplotlib语法

## subplot

subplot前面俩参数指定的是一个画板被分割成的行和列，后面一个参数则指的是当前正在绘制的编号！

那是个什么编号规则呢？就是 行优先数数规则！

![](https://raw.githubusercontent.com/ShawnDong98/ShawnDong98.github.io/master/小书匠/1586527444810.png)

# seaborn语法

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

## 显示Image类型图像

> plt.imshow(img)
> plt.show()

## transpose方法

>   im.transpose(method)⇒ image

返回当前图像的翻转或者旋转的拷贝。变量方法的取值为：FLIP_LEFT_RIGHT，FLIP_TOP_BOTTOM，ROTATE_90，ROTATE_180，或ROTATE_270。

## Image、numpy转化

Image转numpy：

> img = numpy.array(im)

numpy转Image：

> img = Image.fromarray(img.astype('uint8')).convert('RGB')



# tqdm

## 关于tqdm对于range的封装

```python
from tqdm import tqdm
import time

pbar = tqdm(range(3_000))

for i in pbar:
    time.sleep(0.01)
```

![](https://raw.githubusercontent.com/ShawnDong98/ShawnDong98.github.io/master/小书匠/1585587118021.png)

## set_description

```python
from tqdm import tqdm
import time

pbar = tqdm(range(3_000))

for i in pbar:
    time.sleep(0.01)
    pbar.set_description(f"Now get {i}")
```

![](https://raw.githubusercontent.com/ShawnDong98/ShawnDong98.github.io/master/小书匠/1585587226945.png)

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

## 判断一个数是不是2的n次幂

```python
assert latent_size!=0 and (latent_size & (latent_size - 1)) == 0), "latent size is not power of 2"
```

## 拼接多张图为一个网格

```python
# 18, 19, 20, 22, 34

l = [18, 19, 20, 22, 34]
pic = []

for i in l:
    if i<=11:
        img = cv2.imread("show_{}.png".format(i))
    else:
        img = cv2.imread("show{}.png".format(i))
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    img = cv2.resize(img, (265, 800))
    img = loader(img).unsqueeze(0)
    print(img.shape)
    pic.append(img)
    
pics = torch.cat(pic, dim=0)
pics = unloader(make_grid(pics, nrow=pics.size(0)))
pics.save("./processed_pic/merge_1.jpg")
```



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
14. [Python的map()](https://blog.csdn.net/qq_41709494/article/details/98984765)
15. [python中join()函数的使用方法](https://www.cnblogs.com/sui776265233/p/10755525.html)
16. [Python lambda介绍](https://www.cnblogs.com/evening/archive/2012/03/29/2423554.html)
17. [python中copy()和deepcopy()详解](https://blog.csdn.net/u010712012/article/details/79754132)
18. [Python中的super()用法](https://blog.csdn.net/qq_14935437/article/details/81458506)
19. [Python super() 函数](https://www.runoob.com/python/python-func-super.html)
20. [Python @staticmethod@classmethod用法](https://blog.csdn.net/qq_26369907/article/details/88824385)
21. [random --- 生成伪随机数](https://docs.python.org/zh-cn/3.7/library/random.html)
22. [Python的Tqdm模块——进度条配置](https://blog.csdn.net/qq_33472765/article/details/82940843)
23. [python中os的常用方法](https://www.cnblogs.com/lixiaoting/p/11136866.html)
24. [python中os.walk的用法详解](https://www.cnblogs.com/xiajq/p/11232574.html)
25. [【NumPy】 print 打印全部 np.set_printoptions](https://blog.csdn.net/tz_zs/article/details/87105524)
26. [Seaborn常见绘图总结](https://blog.csdn.net/qq_40195360/article/details/86605860)
27. [python笔记：numpy中mgrid的用法](https://blog.csdn.net/abc13526222160/article/details/88559162)
28. [Python怎么导入上一级文件，使用相对路径，被导入文件，导入自己路径下文件，就报不能导入此模块名？](https://www.zhihu.com/question/337566959/answer/786352423)
29. [python：获取当前目录、上层目录路径](https://www.cnblogs.com/juankai/p/11580122.html)
30. [numpy.where() 用法详解](https://www.cnblogs.com/massquantity/p/8908859.html)
31. [python闭包与nonlocal简单注意点](https://blog.csdn.net/weixin_42404145/article/details/90317221)