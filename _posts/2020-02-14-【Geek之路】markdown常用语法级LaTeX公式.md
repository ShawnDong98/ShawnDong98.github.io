---
layout:     post
title:      "【Geek之路】markdown及LaTeX常用语法"
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
- $\star$： \star
- $\bigstar$： \bigstar
- $\mathfrak{ABCdef}$：\mathfrak{ABCdef}
- 向量$\vec{x}$： \vec{x}



# LaTex

pdfTeX程序：Tex语言的一个实现，也就是把Tex语言转换为排版的一个程序。它会把 TeX 语言写的代码直接编译成 PDF 文件。

pdftex命令：pdfTex程序中的命令，用来编译用Plain TeX格式写的tex文件。

pdflatex命令：pdfTex程序中的命令，用来编译用LaTeX格式写的tex文件。

XeTeX程序：TeX语言的新的实现，即把Tex语言转换为排版的一个新程序。支持Unicode 编码和直接访问操作系统字体。

xetex命令：XeTeX程序中的命令，用来编译用Plain TeX格式写的tex文件。

xelatex命令：XeTeX程序中的命令，用来编译用LaTeX格式写的tex文件。

解释：

pdfLaTeX是比较原始的版本，对Unicode的支持不是很好，所以显示汉字需要使用CJK宏包。它不支持操作系统的truetype字体(\*.ttf)，只能使用type1字体。优点是支持的宏包比较多，有些老一点的宏包必须用pdfLaTeX来编译。



XeLaTeX是新的Unicode版本，内建支持Unicode(UTF-8)，自然也包括汉字在内，而且可以调用操作系统的truetype字体。如果你的文档有汉字，那么推荐用XeLaTeX。缺点是不支持某一些宏包。


bibtex： 参考文献相关

## LaTex语法


### documentclass

> \documentclass[option]{class}

clsss 指定想要的文档类型。通过options 参数可以定制文档类的属性。同的选项之间须用逗号隔开。

例子：

```
\documentclass[11pt,twoside,a4paper]{article}
```

这条命令会引导 latex 使用article 格式、 11 磅大小的字体来排版该文档， 并得到在A4 纸上双面打印的效果。 

![](https://raw.githubusercontent.com/ShawnDong98/ShawnDong98.github.io/master/小书匠/1596116872759.png)

![](https://raw.githubusercontent.com/ShawnDong98/ShawnDong98.github.io/master/小书匠/1596116898459.png)

### usepackage

> \usepackage[options]{package}

![](https://raw.githubusercontent.com/ShawnDong98/ShawnDong98.github.io/master/小书匠/1596117424185.png)

### \begin{document}

> \begin{document}

此时可以输入带有LATEX 命令的正文。 在文章末尾使用命令

> \end{document}

来告诉LATEX 文档已经结束。LATEX 会忽略此命令后的所有内容。


### include

> \include{filename}

可以使用该命令将名为filename.tex 的文档内容插入到当前文档中。 需要注意
的是，在处理插入的filename.tex 文档前，LATEX 会另起一页。


### includeonly

> \includeonly{filename,filename,. . . }

该命令只能在导言区使用。 它可以让LATEX 仅读入某些\include 文件。

这条命令在文档的导言区执行后，在所有的\include 命令中，只有文档名出现在\includeonly 的命令参数中的文档才会被导入。注意文档名和逗号之间不能有空格。

\include 命令会在新的一页上排版载入的文本。当使用\includeonly 命
令时会很有帮助，因为即使一些载入的文本被忽略，分页处也不会发生变化。

##

### maketitle

> \maketitle

整篇文档的标题(title) 由以上命令产生。

标题的内容必须在调用\maketitle 以前，由命令\title{...}, \author{...} 和可选的\date{...}

在命令\author 的参量中，可以输入几个用\and 命令分开的名字。



### 交叉引用

> \label{marker}, \ref{marker} 和\pageref{marker}

如果在节、子节、图、表或定理后面输入\label 命令，LATEX 把\ref 替换为相应的序号。\pageref 命令排印\label输入处的页码


### 脚注

> \footnote{footnote text}

把脚注内容排印于当前页的页脚位置。

### 页面样式pagestyle


> \pagestyle{style}

LATEX 支持三种预定义的页眉/页脚(header/footer) 样式， 称为页面样式(pagestyle)

![](https://raw.githubusercontent.com/ShawnDong98/ShawnDong98.github.io/master/小书匠/1596122782197.png)

### 引入中文包：

这是为了显示中文字体 \\
\usepackage[UTF8]{ctex}

### 数学多条件公式

```
\begin{cases}

\end{cases}
```

### 矩阵

```latex
$$
P = from \quad
\begin{matrix}
    to \\
	\left[\begin{array}{rr}
	p_{11} & ... & p_{1n} \\
	... \\
	p_{n1} & ... & p_{nn}
	\end{array}\right]
\end{matrix}
$$
```

$$
P = from \quad
\begin{matrix}
    to \\
	\left[\begin{array}{rr}
	p_{11} & ... & p_{1n} \\
	... \\
	p_{n1} & ... & p_{nn}
	\end{array}\right]
\end{matrix}
$$

矩阵中加入省略号

```
$$
\begin{matrix}\
	\left[\begin{array}{ccc}
	v(1) \\
	\vdots \\
	v(n)
	\end{array}\right]
	= 
	\left[\begin{array}{ccc}
	R_1 \\
	\vdots\\
	R_n
	\end{array}\right]
	+ \gamma
	\left[\begin{array}{ccc}
	P_{11} & \cdots & P_{1n}\\
	\vdots \\
	P_{n1} & \cdots & P_{nn}
	\end{array}\right]
	\left[\begin{array}{ccc}
	v(1) \\
	\vdots \\
	v(n)
	\end{array}\right]
\end{matrix}
$$
```

$$
\begin{matrix}\
	\left[\begin{array}{ccc}
	v(1) \\
	\vdots \\
	v(n)
	\end{array}\right]
	= 
	\left[\begin{array}{ccc}
	R_1 \\
	\vdots\\
	R_n
	\end{array}\right]
	+ \gamma
	\left[\begin{array}{ccc}
	P_{11} & \cdots & P_{1n}\\
	\vdots \\
	P_{n1} & \cdots & P_{nn}
	\end{array}\right]
	\left[\begin{array}{ccc}
	v(1) \\
	\vdots \\
	v(n)
	\end{array}\right]
\end{matrix}
$$

其中{ccc}居中，{rr}向右对齐


### Markdown中LaTeX公式编号

在Markdown中使用LaTeX公式时，加上\tag{...}标签可以生成对应的编号。

比如这个代码可以生成

\$\$x+y = z \tag{1.1}\$\$

这样的带编号的公式。

$$x+y = z \tag{1.1}$$

### LaTex 箭头上添加文字

用法：

> \stackrel{a}{\longrightarrow}

示例：

 \$0\stackrel{a}{\longrightarrow}1\$
 
 效果：
 
  $$0\stackrel{a}{\longrightarrow}1$$
  
### Latex在符号上下加文字
  
1. 如果是数学符号，那么直接用\limits命令放在正下方，如
  
 ![](https://raw.githubusercontent.com/ShawnDong98/ShawnDong98.github.io/master/小书匠/1586270033422.png)

效果：

$$\sum\limits_{n = 0}^\infty$$

2. 若是普通符号，那么要用\mathop先转成数学符号再用\limits，如

![](https://raw.githubusercontent.com/ShawnDong98/ShawnDong98.github.io/master/小书匠/1586270053224.png)

效果：

$$\mathop{\theta}\limits_{i=1}^2$$


# 小书匠PPT常用语法

## 颜色幻灯片背景

``` html
<!-- .slide: data-background="#ff0000" -->
```

## 图片幻灯片背景

```html
<!-- .slide: data-background="img/zen/3.jpg" -->
```

## 水平幻灯片

语法：
```
----
```

## 垂直幻灯片

语法：
```
--
```

**注意前后都需要空一行**


## convex动画转场

```html
<!-- .slide: data-transition="convex"-->
```


## concave背景动画转场

```html
<!-- .slide: data-background="#4d7e65" data-background-transition="concave"-->
```





# Reference
1. [Markdown中LaTeX公式编号](https://blog.csdn.net/KitKat09/article/details/89162216)
2. [LaTex 箭头上添加文字](https://blog.csdn.net/z_feng12489/article/details/99861893)
3. [latex中怎么在符号正上和正下方编写公式](https://blog.csdn.net/WASEFADG/article/details/50499350?utm_source=blogxgwz0)
4. [LaTex 把上下标符号放在正上和正下方公式介绍](https://blog.csdn.net/z_feng12489/article/details/101422618)
5. [Markdown符号和公式](https://blog.csdn.net/xufox/article/details/91048187)
6. [markdown中在矩阵运算上方增加矩阵名称](https://blog.csdn.net/banglu2731/article/details/101079241)
7. [latex中矩阵里面的省略号怎么表示](https://zhidao.baidu.com/question/162572792.html)
8. [Tex, LaTex, pdflatex, xelatex, xetex等的区别和关系](https://blog.csdn.net/chen_shiqiang/article/details/52101836)