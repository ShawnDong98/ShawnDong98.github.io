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
- 向量$\vec{x}$： \vec{x}\
- $\Omega$: \Omega 



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




### 引入中文包：

这是为了显示中文字体 \\
\usepackage\[UTF8\]{ctex}

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


# slides制作

## 小书匠PPT常用语法

### 颜色幻灯片背景

``` html
<!-- .slide: data-background="#ff0000" -->
```

### 图片幻灯片背景

```html
<!-- .slide: data-background="img/zen/3.jpg" -->
```

### 水平幻灯片

语法：
```
----
```

### 垂直幻灯片

语法：
```
--
```

**注意前后都需要空一行**


### convex动画转场

```html
<!-- .slide: data-transition="convex"-->
```


### concave背景动画转场

```html
<!-- .slide: data-background="#4d7e65" data-background-transition="concave"-->
```


## beamer

> \documentclass[10pt,handout]{beamer}

生成讲义版本

> \mode\<beamer>{% \\
\usetheme[hideothersubsections, \\
right,width=22mm]{Goettingen} \\
}

屏幕阅读版本的演示文稿\mode\<beamer>,  选择Goettingen 主题, 它将目录合成到导航面板。选项hideothersubsections 显示章节的标题，但只显示当前章节的子节标题。

对于\mode\<trans> 和\mode\<handout> 的设置也是一样的，它们将出现在它们标准的版面上。

> \title{}，\author{}，\institute{} 和\titlegraphic{}

定义标题页的内容


> \frametitle{}

重新设置每一张幻灯片的标题

> \pause

允许一个接一个地显示列表栏目的内容

> \only、\uncover、\alt 和\temporal

其他的一些演示效果

### Beamer输出

- 默认: PDF屏幕阅读 (尺寸 128mm × 96 mm)3
- [handout] 适用于 PDF 讲义.
- [trans] 适用于 PDF 幻灯片.
-  [notes=hide/show/only] 适用于笔记。隐藏注释(默认), 为 PDF screen 添加注释, 仅产生 PDF 注释。

### frame

- \frame[plain]{\frametitle{}..}
- [containsverbatim] 适用于使用 verbatim 环境和 \verb 命令。
- [allowframebreaks] 适用于一张幻灯片放不下内容时自动分开。
- [shrink] 适用于缩小内容充满一张幻灯片。
- [squeeze] 适用于挤压垂直空间。

# Reference
1. [Markdown中LaTeX公式编号](https://blog.csdn.net/KitKat09/article/details/89162216)
2. [LaTex 箭头上添加文字](https://blog.csdn.net/z_feng12489/article/details/99861893)
3. [latex中怎么在符号正上和正下方编写公式](https://blog.csdn.net/WASEFADG/article/details/50499350?utm_source=blogxgwz0)
4. [LaTex 把上下标符号放在正上和正下方公式介绍](https://blog.csdn.net/z_feng12489/article/details/101422618)
5. [Markdown符号和公式](https://blog.csdn.net/xufox/article/details/91048187)
6. [markdown中在矩阵运算上方增加矩阵名称](https://blog.csdn.net/banglu2731/article/details/101079241)
7. [latex中矩阵里面的省略号怎么表示](https://zhidao.baidu.com/question/162572792.html)
8. [Tex, LaTex, pdflatex, xelatex, xetex等的区别和关系](https://blog.csdn.net/chen_shiqiang/article/details/52101836)