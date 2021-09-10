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