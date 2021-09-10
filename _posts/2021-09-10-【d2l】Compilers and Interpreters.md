---
layout:     post
title:      "【d2l】Compilers and Interpreters"
subtitle:   ""
date:       2021-09-10
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - d2l
---

到目前为止，本书主要关注命令式编程，它使用print, +等语句，以及 if 改变程序状态。  

```python
def add(a, b):
    return a + b

def fancy_func(a, b, c, d):
    e = add(a, b)
    f = add(c, d)
    g = add(e, f)
    return g

print(fancy_func(1, 2, 3, 4))
```

```
10
```

Python 是一门解释性语言。 我们评估上面 `fancy_func` 函数， 它按顺序执行函数体的操作。 评估 $e = add(a, b)$ 并且存储结果为变量 $e$，  从而改变程序的状态。 接下来的两个状态 $f = add(c, d)$ 和 $g = add(e, f)$ 也相似地实现加法并且存储结果为变量。  

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1631242344427.png)

尽管命令式的编程是方便的， 但是是不足够的。 一方面，即便 add 函数反复地调用 `fancy_fuc` 函数， Python 将会分别执行调用三次函数。 如果它们在GPU上执行， 由Python解释器引起的开销可能会变得难以承受。 此外， 它需要保存 $e$ 和 $f$ 的变量值， 直到所有 `fancy_func`  的状态被执行。 这是因为我们不知道变量 $e$ 和 $f$ 是否将会用于程序的其他部分。

# Symbolic Programming

考虑另一种方法，`symbolic programming`，在这种方法中，只有在完全定义了进程之后，才会执行计算。这个策略被多个深度学习框架使用，包括 Theano 和 TensorFlow。它通常包括以下步骤：

1. 定义要执行的操作
2. 将操作编译成可执行程序
3. 提供所需的输入并调用编译后的程序以供执行


这允许进行大量的优化。首先，在许多情况下，我们可以跳过Python解释器，从而消除在多个GPU上与CPU上的单个Python线程配对时的性能瓶颈。其次， 一个编译器能优化和重写上述代码为 print((1 + 2) + (3 + 4)) 甚至 print(10)。 例如，当不再需要某个变量时，它可以释放内存(或从不分配内存)。或者它可以将代码完全转换成等价的部分。为了更好地理解，考虑下面对命令式编程的模拟。

```python
def add_():
    return '''
def add(a, b):
    return a + b
'''

def fancy_func_():
    return '''
def fancy_func(a, b, c, d):
    e = add(a, b)
    f = add(c, d)
    g = add(e, f)
    return g
'''

def evoke_():
    return add_() + fancy_func_() + 'print(fancy_func(1, 2, 3, 4))'

prog = evoke_()
print(prog)
y = compile(prog, '', 'exec')
exec(y)
```

```
def add(a, b):
    return a + b

def fancy_func(a, b, c, d):
    e = add(a, b)
    f = add(c, d)
    g = add(e, f)
    return g
print(fancy_func(1, 2, 3, 4))
10
```

命令式(解释式)编程和符号编程之间的区别如下:

- 命令式编程更容易。在Python中使用命令式编程时，大多数代码都是简单易懂的。 调试命令式编程代码也更容易。这是因为获取和打印所有相关中间变量值或使用Python的内置调试工具更容易。
- 符号编程更有效，也更容易移植。符号编程使得在编译期间更容易优化代码，同时还能够将程序移植到独立于Python的格式中。这允许程序在非Python环境中运行，从而避免了与Python解释器相关的任何潜在性能问题。

# Hybrid Programming

从历史上看，大多数深度学习框架都是在命令式方式和符号式方式之间进行选择的。例如，Theano, TensorFlow，Keras, CNTK都是用符号式构建模型。相反，Chainer和PyTorch采用命令式方法。 在后来的版本中，TensorFlow 2.0和Keras添加了命令模式。

如上所述，PyTorch基于命令式编程并使用动态计算图。为了利用符号编程的可移植性和效率，开发人员考虑是否有可能将两种编程模型的优点结合起来。这就产生了torchscript，允许用户使用纯命令式编程进行开发和调试，同时能够将大多数程序转换为符号程序，以便在需要产品级计算性能和部署时运行。
