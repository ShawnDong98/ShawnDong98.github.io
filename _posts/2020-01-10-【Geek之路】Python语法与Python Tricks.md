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

### startswith

> str.startswith(str, beg=0,end=len(string));

- str -- 检测的字符串。
- strbeg -- 可选参数用于设置字符串检测的起始位置。
- strend -- 可选参数用于设置字符串检测的结束位置。

Python startswith() 方法用于检查字符串是否是以指定子字符串开头，如果是则返回 True，否则返回 False。如果参数 beg 和 end 指定值，则在指定范围内检查。

### islower

> str.islower()

检测是否是小写


### split

> str.split(str="", num=string.count(str)).

通过指定分隔符对字符串进行切片，如果参数 num 有指定值，则分隔 num+1 个子字符串

- str -- 分隔符，默认为所有的空字符，包括空格、换行(\n)、制表符(\t)等。
- num -- 分割次数。默认为 -1, 即分隔所有。

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

## callable

callable() 函数用于检查一个对象是否是可调用的。如果返回 True，object 仍然可能调用失败；但如果返回 False，调用对象 object 绝对不会成功。

> callable(object)


## time

### time.strftime()

> time.strftime(format\[, t\])

- format -- 格式字符串。
- t -- 可选的参数t是一个struct_time对象

返回值：

返回以可读字符串表示的当地时间。

说明：

python中时间日期格式化符号：

- %y 两位数的年份表示（00-99）
- %Y 四位数的年份表示（000-9999）
- %m 月份（01-12）
- %d 月内中的一天（0-31）
- %H 24小时制小时数（0-23）
- %I 12小时制小时数（01-12）
- %M 分钟数（00=59）
- %S 秒（00-59）
- %a 本地简化星期名称
- %A 本地完整星期名称
- %b 本地简化的月份名称
- %B 本地完整的月份名称
- %c 本地相应的日期表示和时间表示
- %j 年内的一天（001-366）
- %p 本地A.M.或P.M.的等价符
- %U 一年中的星期数（00-53）星期天为星期的开始
- %w 星期（0-6），星期天为星期的开始
- %W 一年中的星期数（00-53）星期一为星期的开始
- %x 本地相应的日期表示
- %X 本地相应的时间表示
- %Z 当前时区的名称
- %% %号本身


### time.localtime()


time.localtime(\[ sec \])

返回：

```
time.struct_time(tm_year=2020, tm_mon=10, tm_mday=10, tm_hour=19, tm_min=17, tm_sec=55, tm_wday=5, tm_yday=284, tm_isdst=0)
```

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

### @property

在绑定属性时，如果我们直接把属性暴露出去，虽然写起来很简单，但是，没办法检查参数，导致可以把成绩随便改：

```python
s = Student()
s.score = 9999
```

这显然不合逻辑。为了限制score的范围，可以通过一个set_score()方法来设置成绩，再通过一个get_score()来获取成绩，这样，在set_score()方法里，就可以检查参数：

```python
class Student(object):

    def get_score(self):
         return self._score

    def set_score(self, value):
        if not isinstance(value, int):
            raise ValueError('score must be an integer!')
        if value < 0 or value > 100:
            raise ValueError('score must between 0 ~ 100!')
        self._score = value
```


现在，对任意的Student实例进行操作，就不能随心所欲地设置score了：


```python
>>> s = Student()
>>> s.set_score(60) # ok!
>>> s.get_score()
60
>>> s.set_score(9999)
Traceback (most recent call last):
  ...
ValueError: score must between 0 ~ 100!
```

有没有既能检查参数，又可以用类似属性这样简单的方式来访问类的变量呢？

Python内置的@property装饰器就是负责把一个方法变成属性调用的：

```python
class Student(object):

    @property
    def score(self):
        return self._score

    @score.setter
    def score(self, value):
        if not isinstance(value, int):
            raise ValueError('score must be an integer!')
        if value < 0 or value > 100:
            raise ValueError('score must between 0 ~ 100!')
        self._score = value
```

把一个getter方法变成属性，只需要加上@property就可以了，此时，@property本身又创建了另一个装饰器@score.setter，负责把一个setter方法变成属性赋值，于是，我们就拥有一个可控的属性操作：

```python
>>> s = Student()
>>> s.score = 60 # OK，实际转化为s.set_score(60)
>>> s.score # OK，实际转化为s.get_score()
60
>>> s.score = 9999
Traceback (most recent call last):
  ...
ValueError: score must between 0 ~ 100!
```

注意到这个神奇的@property，我们在对实例属性操作的时候，就知道该属性很可能不是直接暴露的，而是通过getter和setter方法来实现的。

还可以定义只读属性，只定义getter方法，不定义setter方法就是一个只读属性：

```python
class Student(object):

    @property
    def birth(self):
        return self._birth

    @birth.setter
    def birth(self, value):
        self._birth = value

    @property
    def age(self):
        return 2015 - self._birth
```


上面的birth是可读写属性，而age就是一个只读属性，因为age可以根据birth和当前时间计算出来。


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

### OrderedDict

python中的字典是无序的，因为它是按照hash来存储的。

python中有个模块collections(英文，收集、集合)，里面自带了一个子类OrderedDict，实现了对字典对象中元素的排序。

```python
import collections
print "Regular dictionary"
d={}
d['a']='A'
d['b']='B'
d['c']='C'
for k,v in d.items():
    print k,v
print "\nOrder dictionary"
d1 = collections.OrderedDict()
d1['a'] = 'A'
d1['b'] = 'B'
d1['c'] = 'C'
d1['1'] = '1'
d1['2'] = '2'
for k,v in d1.items():
    print k,v

输出：
Regular dictionary
a A
c C
b B

Order dictionary
a A
b B
c C
1 1
2 2
```

可以看到，同样是保存了ABC等几个元素，但是使用OrderedDict会根据放入元素的先后顺序进行排序。所以输出的值是排好序的。

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





## time、timeit、 datatime

### datatime



## base64编码

Base64是网络上最常见的用于传输8Bit字节码的编码方式之一，Base64就是一种基于64个可打印字符来表示二进制数据的方法。可查看RFC2045～RFC2049，上面有MIME的详细规范。
Base64编码是从二进制到字符的过程，可用于在HTTP环境下传递较长的标识信息。采用Base64编码具有不可读性，需要解码后才能阅读。

Base64由于以上优点被广泛应用于计算机的各个领域，然而由于输出内容中包括两个以上“符号类”字符（+, /, =)，不同的应用场景又分别研制了Base64的各种“变种”。为统一和规范化Base64的输出，Base62x被视为无符号化的改进版本。

### 将url编码成base64

```python
# 想将字符串转编码成base64,要先将字符串转换成二进制数据
url = "https://www.cnblogs.com/songzhixue/"
bytes_url = url.encode("utf-8")
str_url = base64.b64encode(bytes_url)  # 被编码的参数必须是二进制数据
print(str_url)

b'aHR0cHM6Ly93d3cuY25ibG9ncy5jb20vc29uZ3poaXh1ZS8='
```

### 解码base64

```python
# 将base64解码成字符串
import base64
url = "aHR0cHM6Ly93d3cuY25ibG9ncy5jb20vc29uZ3poaXh1ZS8="
str_url = base64.b64decode(url).decode("utf-8")
print(str_url)

'https://www.cnblogs.com/songzhixue/'
```

## socketio

创建一个Socket.IO server

> socketio.Server()


Socket.IO协议是基于事件的。 当一个客户端想要和服务器通信时，它会发出一个事件。每个事件都有一个名字和一系列参数。 

服务器使用 socketio.Server.event() 或者 socketio.Server.on() 装饰器注册事件句柄。

> @sio.on('telemetry')


Connect事件是执行用户身份验证， 以及应用程序中的用户实体与分配给客户机的 sid 之间的必要映射。

environ参数是一个标准 WSGI 格式的字典，包含请求信息，包括 HTTP 头。 在检查请求之后，连接事件处理句柄可以返回 False 以拒绝与客户端的连接。

> @sio.on('connect')

```python
@sio.on('connect')
def connect(sid, environ):
    print("connect ", sid)
    send_control(0, 0)
```


服务器可以在任何时候将事件发送到其连接的客户机

> sio.emit

```python
sio.emit('my event', {'data': 'foobar'})
```

有时，服务器可能只想将事件发送到特定的客户端。 这可以通过在 emit 调用中添加一个 room 参数来实现:

```python
sio.emit('my event', {'data': 'foobar'}, room=user_sid)
```

Socket.IO server 是 socketio.Server 的一个实例。 通过使用 socketio.WSGIApp 类包装这个实例，可以将其转换为标准的 WSGI 应用程序:

```python
import socketio

# create a Socket.IO server
sio = socketio.Server()

# wrap with a WSGI application
app = socketio.WSGIApp(sio)
```

对于基于异步的服务器, socketio.AsyncServer类提供了相同的功能, 但是是以协同程序友好的格式。如果需要，socketio.ASGIApp 类可以将服务器转换为标准的 ASGI 应用程序:

```python
# create a Socket.IO server
sio = socketio.AsyncServer()

# wrap with ASGI application
app = socketio.ASGIApp(sio)
```

这两个包装器还可以充当中间件，将不打算发送到 Socket.IO 服务器的任何流量转发到另一个应用程序。 这使得 Socket.IO 服务器可以轻松地集成到现有的 WSGI 或 ASGI 应用程序中:

```python
from wsgi import app  # a Flask, Django, etc. application
app = socketio.WSGIApp(sio, app)
```

### 什么是 WSGI

> Web服务器网关接口（Python Web Server Gateway Interface，缩写为WSGI）是为Python语言定义的Web服务器和Web应用程序或框架之间的一种简单而通用的接口。自从WSGI被开发出来以后，许多其它语言中也出现了类似接口。

Python web开发中，服务端程序可分为2个部分：
- 1、服务器程序（用来接收、整理客户端发送的请求）
- 2、应用程序（处理服务器程序传递过来的请求）

在开发应用程序的时候，我们会把常用的功能封装起来，成为各种框架，比如Flask，Django，Tornado（使用某框架进行web开发，相当于开发服务端的应用程序，处理后台逻辑）但是，服务器程序和应用程序互相配合才能给用户提供服务，而不同应用程序（不同框架）会有不同的函数、功能。 此时，我们就需要一个标准，让服务器程序和应用程序都支持这个标准，那么，二者就能很好的配合了

WSGI 是 python web 开发的标准，类似于协议。它是服务器程序和应用程序的一个约定，规定了各自使用的接口和功能，以便二和互相配合

WSGI应用程序的部分规定

1. 应用程序是一个可调用的对象 \\
    可调用的对象有三种：\\
  1)、一个函数 \\
  2)、一个类，必须实现call()方法 \\
  3)、一个类的实例 \\
2. 这个对象接收两个参数 \\
    这两个参数是environ, start_response. 以可调用对象为一个类为例:
	
```python
class application:
    def __call__(self, environ, start_response):
        pass
```

3. 可调用对象需要返回一个可迭代的值。以可调用对象为一个类为例：

```python
class application:
    def __call__(self, environ, start_response):
        return [xxx]
```

WSGI服务器程序的部分规定

服务器程序需要调用应用程序

```python
def run(application):               #服务器程序调用应用程序
    environ = {}                    #设定参数
    def start_response(xxx):        #设定参数
        pass
    result = application(environ, start_response)          #调用应用程序的__call__函数（这里应用程序是一个类）
    def write(data):
               pass
    def data in result:             #迭代访问
        write(data)
```

Middleware

middleware是介于服务器程序和应用程序中间的部分，middleware对服务器程序和应用程序是透明的。

- 对于服务器程序来说，middleware就是应用程序，middleware需要伪装成应用程序，传递给服务器程序
- 对于应用程序来说，middleware就是服务器程序，middleware需要伪装成服务器程序，接受并调用应用程序



## eventlet

Eventlet 主要是用于网络并发的库，专注于代码运行逻辑。

>  eventlet.listen(addr, family=2, backlog=50)

创建套接字，可以用于 serve() 或一个定制的 accept() 循环。设置套接字的 SO_REUSEADDR 可以减少打扰。

参数： \\
- addr：要监听的地址，比如对于 TCP 协议的套接字，这是一个(host, port) 元组。
- family：套接字族。
- backlog：排队连接的最大个数，至少是1，上限由系统决定。

返回:

监听中的“绿色”套接字对象。

> eventlet.wsgi.server(sock, site, log=None, environ=None, max_size=None, ...)

创建一个WSGI服务器

- sock: 服务器套接字，必须绑定一个端口监听
- site：+WSGI应用函数
- log：应写入日志的日志记录器实例或类似文件的对象。 如果提供了 Logger 实例，消息将被发送到 INFO 日志级别。 如果未指定，则使用 sys.stderr。
- environ：每个请求的 environ 字典中的附加参数。
- max_size： 此服务器在任何时候打开的客户端连接的最大数量。默认值为1024。


## sorted

sorted() 函数对所有可迭代的对象进行排序操作。

sort 与 sorted 区别：

sort 是应用在 list 上的方法，sorted 可以对所有可迭代的对象进行排序操作。

list 的 sort 方法返回的是对已经存在的列表进行操作，而内建函数 sorted 方法返回的是一个新的 list，而不是在原来的基础上进行的操作。

> sorted(iterable, key=None, reverse=False)  

## argparse

创建解析器对象

> class argparse.ArgumentParser(prog=None, usage=None, description=None, epilog=None, parents=[], formatter_class=argparse.HelpFormatter, prefix_chars='-', fromfile_prefix_chars=None, argument_default=None, conflict_handler='error', add_help=True, allow_abbrev=True)

添加参数

> ArgumentParser.add_argument(name or flags...[, action][, nargs][, const][, default][, type][, choices][, required][, help][, metavar][, dest])

- name or flags - 一个命名或者一个选项字符串的列表，例如 foo 或 -f, --foo
- choices - 可用的参数的容器， 参数值只能从几个选项里面选择, 如choices=['alexnet', 'vgg']。
- required - 此命令行选项是否可省略 （仅选项可用）。
- metavar - 在使用方法消息中使用的参数值示例。
- dest - 设置参数在代码中的变量名。
- action - add_argument中默认action=’store‘，直接保存从运行终端或程序中传入的变量。如果想修改为常量，需要修改action='store_const'，然后指定const。

```python
parser.add_argument('--foo', action='store_const', const=42)
```

store_true/false - 如果需要存储True或者False，只要指定action='store_true/false'

```python
parser.add_argument('--foo', action='store_true')
parser.add_argument('--foo', action='store_false')
```

需要注意的是，如果指定action为store_const或者store_true，则参数不可再进行赋值

append - 同一参数，需要多个值时候，需要指定action='append'

```python
parser.add_argument('--foo', action='append')

D:\desktop>python argparseLearn.py  --foo 1 --foo 2
Namespace(foo=['1', '2'])
```

version - 需要指定action='version'，打印version后会自动退出

```python
parser.add_argument('--version',action='version',version='PROG 2.0')

D:\desktop>python argparseLearn.py  --version
PROG 2.0
```


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



## os.environ

可用于设置可用GPU

> os.environ['CUDA_VISIBLE_DEVICES'] = '0, 2, 3, 4'

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

## np.vstack

vstack 表示将数组在第一维进行堆叠（即最外层的方括号），可将 arr1 和 arr2 第一维内的部分视为一个整体


## np.hstack

hstack 表示将数组在第二维进行堆叠（即第二层方括号），可将 arr 第二层括号里面的东西视为一个整体

## np.dstack

dstack 表示将数组在第三维进行堆叠（即第三层方括号），可将 arr 第三层括号里面的东西视为一个整体

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

## np.all()

> np.all()

返回的是一个布尔类型的值

例子：

```python
np.all([[True,False],[True,True]])
False
默认为对数组里的每个元素进行与运算
```

```python
np.all([[True,False],[True,True]], axis=0)
array([ True, False], dtype=bool)
当给定axis的值时，则是按照给定方向进行与运算
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

## np.random.choice

> numpy.random.choice(a, size=None, replace=True, p=None)

从a(只要是ndarray都可以，但必须是一维的)中随机抽取数字，并组成指定大小(size)的数组

size可以是list或者tuple

replace:True表示可以取相同数字，False表示不可以取相同数字

数组p：与数组a相对应，表示取数组a中每个元素的概率，默认为选取每个元素的概率相同。

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


## numpy.rollaxis

numpy.rollaxis(arr, axis, start)

- arr：数组
- axis：要向后滚动的轴，其它轴的相对位置不会改变
- start：默认为零，表示完整的滚动。会滚动到特定位置。


## np.corrcoef

> numpy.corrcoef(x, y=None, rowvar=True, bias=\<no value\>, ddof=\<no value\>)

返回Pearson乘积矩相关系数。

$$R_{ij} = \frac{C_{ij}}{\sqrt{C_{ii} * C_{jj}}}$$

- x： 包含多个变量和观测值的1-D或2-D数组。 x的每一行代表一个向量， 每一列都是对所有这些变量的单一观察。
- y：另一组变量和观察。 y与x具有相同的形状。
- rowvar： 如果rowvar为True（默认值）， 则每行代表一个向量， 并在列中显示。 否则， 转换关系： 每列代表一个变量， 而行包含观察。

返回：
- R：变量得相关系数矩阵

## np.arange()

np.arange()函数分为一个参数，两个参数，三个参数三种情况
- 一个参数时，参数值为终点，起点取默认值0，步长取默认值1。
- 两个参数时，第一个参数为起点，第二个参数为终点，步长取默认值1。
- 三个参数时，第一个参数为起点，第二个参数为终点，第三个参数为步长。其中步长支持小数

## np.cov

> numpy.cov(m, y=None, rowvar=True)

- m：array_like 包含多个变量和观测值的1-D或2-D数组。 m的每一行代表一个变量，每一列都是对所有这些变量的单一观察。
- y：array_like，可选。 另外一组变量和观察。 y具有与m相同的形式。
- rowvar：布尔值，可选。 如果rowvar为True（默认值），则每行代表一个变量X，另一个行为变量Y。否则，转换关系：每列代表一个变量X，另一个列为变量Y。

## np.loadtxt

> numpy.loadtxt(fname, dtype=, comments='#', delimiter=None, converters=None, skiprows=0, usecols=None, unpack=False, ndmin=0)

- fname要读取的文件、文件名、或生成器。
- dtype数据类型，默认float。
- comments注释。
- delimiter分隔符，默认是空格。
- skiprows跳过前几行读取，默认是0，必须是int整型。
- usecols：要读取哪些列，0是第一列。例如，usecols = （1,4,5）将提取第2，第5和第6列。默认读取所有列。
- unpack如果为True，将分列读取。


## np.meshgrid


二维坐标系中,X轴可以取三个值1,2,3, Y轴可以取三个值7,8, 请问可以获得多少个点的坐标?

显而易见是6个:

(1,7)(2,7)(3,7)
(1,8)(2,8)(3,8)

**np.meshgrid()就是干这个的!**

```python
#coding:utf-8
import numpy as np
# 坐标向量
a = np.array([1,2,3])
# 坐标向量
b = np.array([7,8])
# 从坐标向量中返回坐标矩阵
# 返回list,有两个元素,第一个元素是X轴的取值,第二个元素是Y轴的取值
res = np.meshgrid(a,b)
#返回结果: [array([ [1,2,3] [1,2,3] ]), array([ [7,7,7] [8,8,8] ])]
```

同理还可以生成更高维度的坐标矩阵

# np.random.multivariate_normal

> def multivariate_normal(mean, cov, size=None, check_valid=None, tol=None) 


其中mean和cov为必要的传参而size，check_valid以及tol为可选参数。

- mean：mean是多维分布的均值, 维度为1；
- cov：协方差矩阵（，注意：协方差矩阵必须是对称的且需为半正定矩阵；
- size：指定生成的正态分布矩阵的维度（例：若size=(1, 1, 2)，则输出的矩阵的shape即形状为 1X1X2XN（N为mean的长度））。
-  check_valid：这个参数用于决定当cov即协方差矩阵不是半正定矩阵时程序的处理方式，它一共有三个值：warn，raise以及ignore。当使用warn作为传入的参数时，如果cov不是半正定的程序会输出警告但仍旧会得到结果；当使用raise作为传入的参数时，如果cov不是半正定的程序会报错且不会计算出结果；当使用ignore时忽略这个问题即无论cov是否为半正定的都会计算出结果。
-   tol：检查协方差矩阵奇异值时的公差，float类型。

np.random.multivariate_normal方法用于根据实际情况生成一个多元正态分布矩阵

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


## npy文件ndarray转list

> np.load('./saved_models/pnet.npy')\[()\]

在后面加上\[()\]


# pandas语法

## 读取csv文件

> pandas.read_csv(filepath_or_buffer, sep=’, ‘, delimiter=None, header=’infer’, encoding=None,  ...)

- filepath_or_buffer : 路径 URL 可以是http, ftp, s3, 和 file.

- sep: 指定分割符，默认是’,’C引擎不能自动检测分隔符，但Python解析引擎可以

- delimiter: 同sep

- delimiter_whitespace: True or False 默认False, 用空格作为分隔符等价于spe=’\s+’如果该参数被调用，则delimite不会起作用

- header: 指定第几行作为列名(忽略注解行)，如果没有指定列名，默认header=0; 如果指定了列名header=None

- encoding: 编码方式

## iloc

iloc按位置进行提取, 按索引提取区域行数值

> df_inner.iloc[0:5]


## loc 

loc函数按标签值进行提取, 按索引提取单行的数值

> df_inner.loc[3]

## ix


ix可以同时按标签和位置进行提取。

> df_inner.ix[:'2013-01-03',:4] #2013-01-03号之前，前四列数据


## apply

apply() 函数， 函数作为一个对象，能作为参数传递给其它参数，并且能作为函数的返回值。

函数作为对象能带来代码风格巨大的改变。举一个例子，有一个包含 1 到 10 的 list，从其中找出能被 3 整除的数字。用传统的方法：

```python
def can_divide_by_three(number):
    if number % 3 == 0:
        return True
    else:
        return False

selected_numbers = []
for number in range(1, 11):
    if can_divide_by_three(number):
        selected_numbers.append(number)

```

循环是不可少的，因为 can_divide_by_three() 函数只用一次，可以用 lambda 表达式简化：

```python
divide_by_three = lambda x : True if x % 3 == 0 else False

selected_numbers = []
for number in range(1, 11):
    if divide_by_three(item):
        selected_numbers.append(item)
```

Python 语言提供 filter() 函数，语法如下：

```
filter(function, sequence)
```

filter() 函数的功能：对 sequence 中的 item 依次执行 function(item)，将结果为 True 的 item 组成一个 List/String/Tuple（取决于 sequence 的类型）并返回。有了这个函数，上面的代码可以简化为：

```python
divide_by_three = lambda x : True if x % 3 == 0 else False
selected_numbers = filter(divide_by_three, range(1, 11))
```

将 lambda 表达式放在语句中，代码简化到只需要一句话就够了：

```python
selected_numbers = filter(lambda x: x % 3 == 0, range(1, 11))
```


回到主题， pandas 的 apply() 函数可以作用于 Series 或者整个 DataFrame，功能也是自动遍历整个 Series 或者 DataFrame, 对每一个元素运行指定的函数。





# scipy语法

## import scipy.stats as st

> st.norm.rvs(loc = 0,scale = 0.1,size =10)

norm.rvs通过loc和scale参数可以指定随机变量的偏移和缩放参数，这里对应的是正态分布的期望和标准差。size得到随机数数组的形状参数。

> st.norm.pdf(x,loc = 0,scale = 1)

正态分布概率密度函数。

横轴为x， 纵轴为标准正态分布， 返回的值是纵轴坐标。

## rvs

> norm.rvs(loc=0, scale=1, size=1, random_state=None)

返回的是一个列表

不要认为norm.rvs(5)产生了五个变量， 它是产生了一个期望为5的随机变量。



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



# Bugs

## NameError:name ‘xrange’ is not defined

在Python 3中，range()与xrange()合并为range( )。
我的python版本为python3.5。

将xrange( )函数全部换为range( )。

## python3出现module "importlib.\_bootstrap" has no attribute "SourceFileLoader"


>有时候python或者pycharm会报出这个工具错误，此时使用如下命令重新安装工具包即可。
python3 -m ensurepip --upgrade
python会重新安装setuptools工具包


## UserWarning: Boolean Series key will be reindexed to match DataFrame index

```python
sample_df[sample_df['money']<=10][(sample_df['money']>0]
```

布尔型系列键将索引匹配获得对应的索引

意思就是这里有两个布尔值，就会语义不明，所以报错

方法

```python
sample_df[(sample_df['money']<=10)&(sample_df['money']>0)]
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


## 导入当前路径

```python
import sys 
import os
path = os.path.abspath(os.path.dirname(__file__))
sys.path.append(path)
```


## 引用不同目录下的包

### import 上级目录

有时候我们可能需要import另一个路径下的python文件，例如下面这个目录结构，我们想要在_train.py里import在networks目录下的_lstm.py和上级目录下的_config.py。

```python
_config.py
networks
    _lstm.py
    _cnn.py
pipelines
    _train.py
```

- 在networks文件夹下创建空的__init__.py文件

```python
_config.py
networks
    __init__.py
    _lstm.py
    _cnn.py
pipelines
    _train.py
```

- 使用sys库添加路径

```python
import sys
sys.path.append("..")
from networks._lstm import *
from _config import *
```


## 生成 requirements

```
生成requirements.txt文件
pip freeze > requirements.txt

安装requirements.txt依赖
pip install -r requirements.txt
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
32. [matplotlib.pyplot中cla()、cls()、close()区别详解](https://blog.csdn.net/The_Time_Runner/article/details/89887802)
33. [NameError:name ‘xrange’ is not defined](https://www.cnblogs.com/hdk1993/p/8893991.html)
34. [python3出现module "importlib._bootstrap" has no attribute "SourceFileLoader"](https://blog.csdn.net/qq_34696824/article/details/89609291)
35. [python中的base64加密解密](https://www.cnblogs.com/songzhixue/p/11253243.html)
36. [Python eventlet 模块笔记](https://blog.csdn.net/u010827484/article/details/81223035)
37. [pd.read_csv用法](https://blog.csdn.net/weixin_44056331/article/details/89366105)
38. [pandas用法总结](https://blog.csdn.net/yiyele/article/details/80605909)
39. [argparse简要用法总结](http://vra.github.io/2017/12/02/argparse-usage/)
40. [python 导入同级目录文件、上级目录文件以及下级目录数据集和模块包](https://www.cnblogs.com/ipersevere/p/10916803.html)
41. [Python 生成requirement 使用requirements.txt](https://blog.csdn.net/qq_41856814/article/details/89739514)
42. [numpy vstack hstack dstack 区别](https://www.jianshu.com/p/07fd005b0b42)
43. [python，numpy中np.random.choice()的用法详解及其参考代码](https://blog.csdn.net/ImwaterP/article/details/96282230)
44. [subplots()使用方法举例说明](https://blog.csdn.net/missyougoon/article/details/90510183)
45. [python中用matplotlib画多幅图时出现图形部分重叠的解决方案](https://blog.csdn.net/ymznice/article/details/83274600)
46. [matplotlib可视化篇hist()--直方图](https://www.jianshu.com/p/f2f75754d4b3)
47. [错误解决1：UserWarning: Boolean Series key will be reindexed to match DataFrame index](https://blog.csdn.net/qq_43003405/article/details/100005786)
48. [np.arange()用法](https://blog.csdn.net/qq_41550480/article/details/89390579)
49. [Numpy中 cov() 的使用方法](https://blog.csdn.net/qq_41800366/article/details/88063772)
50. [numpy.loadtxt()](https://www.jianshu.com/p/ef37f739b531)
51. [Matplotlib之设置x,y坐标轴的位置](https://blog.csdn.net/beautiful77moon/article/details/96478238)
52. [Matplotlib：mpl_toolkits.mplot3d工具包](https://www.jianshu.com/p/b563920fa7a8)
53. [3分钟理解np.meshgrid()](https://blog.csdn.net/littlehaes/article/details/83543459)
54. [3D绘图&ax.plot_surface()](https://blog.csdn.net/weixin_43584807/article/details/102331755)
55. [matplotlib.pyplot contourf()函数的使用](https://blog.csdn.net/lens___/article/details/83960810)
56. [Linux服务器没有GUI的情况下使用matplotlib绘图](https://www.cnblogs.com/devilmaycry812839668/p/10201971.html)
57. [np.random.multivariate_normal方法浅析](https://blog.csdn.net/zch1990s/article/details/80005940)
58. [Matplotlib入门-4-plt.legend( )创建图例](https://zhuanlan.zhihu.com/p/111108841)
59. [pandas apply() 函数用法](https://blog.csdn.net/stone0823/article/details/100008619)