---
layout:     post
title:      "【Geek之路】markdown常用语法及LaTeX公式"
subtitle:   ""
date:       2020-02-14
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - Markdown
    - LaTex
    - Geek
---

# Markdown

## Markdown公式符号表


[Markdown公式符号表](https://blog.csdn.net/xufox/article/details/91048187)

### 常用符号

- 空集$\emptyset$： \emptyset
- 属于$\in$：\in
- 不属于$\notin$： \notin
- 包含于$\subseteq$：\subseteq
- 不等于$\neq$： \neq， 不是\noteq
- 布尔积$\odot$： \odot
- $\nabla$： \nabla
- $\epsilon$： \epsilon
- 恒等$\equiv$： \equiv
- $\mapsto$： \mapsto
- $\Theta$：\Theta
- $\xi$： \xi
- 累乘$\prod$： \prod
- 偏导$\partial$：\partial



# LaTex

## Markdown中LaTeX公式编号

在Markdown中使用LaTeX公式时，加上\tag{...}标签可以生成对应的编号。

比如这个代码可以生成

\$\$x+y = z \tag{1.1}\$\$

这样的带编号的公式。

$$x+y = z \tag{1.1}$$

## LaTex 箭头上添加文字

用法：

> \stackrel{a}{\longrightarrow}

示例：

 \$0\stackrel{a}{\longrightarrow}1\$
 
 效果：
 
  $$0\stackrel{a}{\longrightarrow}1$$
  
## Latex在符号上下加文字
  
1. 如果是数学符号，那么直接用\limits命令放在正下方，如
  
 ![](https://raw.githubusercontent.com/ShawnDong98/ShawnDong98.github.io/master/小书匠/1586270033422.png)

效果：

$$\sum\limits_{n = 0}^\infty$$

2. 若是普通符号，那么要用\mathop先转成数学符号再用\limits，如

![](https://raw.githubusercontent.com/ShawnDong98/ShawnDong98.github.io/master/小书匠/1586270053224.png)

效果：

$$\mathop{\theta}\limits_{i=1}^2$$


# Reference
1. [Markdown中LaTeX公式编号](https://blog.csdn.net/KitKat09/article/details/89162216)
2. [LaTex 箭头上添加文字](https://blog.csdn.net/z_feng12489/article/details/99861893)
3. [latex中怎么在符号正上和正下方编写公式](https://blog.csdn.net/WASEFADG/article/details/50499350?utm_source=blogxgwz0)
4. [LaTex 把上下标符号放在正上和正下方公式介绍](https://blog.csdn.net/z_feng12489/article/details/101422618)
5. [Markdown符号和公式](https://blog.csdn.net/xufox/article/details/91048187)