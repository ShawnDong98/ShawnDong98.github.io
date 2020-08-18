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
- $\cap$： \cap
- $\cup$： \cup
- $\hat{a}$： \hat{a}
- $\pm$： \pm
- $\propto$： \propto
- $\Gamma$： \Gamma



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

### \begin

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

### input

> \input{filename}

有些时候可能不希望在新的一页上排版载入的文本， \input 命令只是简单的载入指定的文本，没有其他限制。

### maketitle

> \maketitle

整篇文档的标题(title) 由以上命令产生。

标题的内容必须在调用\maketitle 以前，由命令\title{...}, \author{...} 和可选的\date{...}

在命令\author 的参量中，可以输入几个用\and 命令分开的名字。


### 标题、章和节

> \ctexset

设置ctex的格式

> \part{...}

把文档分成几个部分而且不影响章节编号

> \chapter{...}

使用report 或者book 类的时候，可以用这个高层次的分节命令

- 命令\part 不影响章的序号。
- 命令\appendix 不带参量，只把章的序号改用为字母标记

> \tableofcontents

在其出现的位置插入目录。


> \frontmatter

它应接着命令\begin{document} 使用。它把页码更换为罗马数字，而且章节不计数。当你使用带星的分节命令(例如，\chapter*{Preface}) 时，这些章节就不会出现在目录里

> \mainmatter

应出现在书的第一章前面。它启用阿拉伯数字的页码计数器，并对页码重新计数。

> \appendix

标志书中附录材料的开始。该命令后的各章序号改用字母标记。

> \backmatter

应该插入与书中最后一部分内容的前面，如参考文献和索引。在标准文档类型中，它对页面没有什么效果。


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


### Itemize、Enumerate 和 Description

itemize 环境适用于简单的列表，enumerate 环境适用于有排列序号的列表， 而description 环境用于带描述的列表。

> \begin{enumerate}

![](https://raw.githubusercontent.com/ShawnDong98/ShawnDong98.github.io/master/小书匠/1596153280445.png)

> \begin{itemize}

![](https://raw.githubusercontent.com/ShawnDong98/ShawnDong98.github.io/master/小书匠/1596153315338.png)

> \begin{description}

![](https://raw.githubusercontent.com/ShawnDong98/ShawnDong98.github.io/master/小书匠/1596153369664.png)


### 左对齐、右对齐和居中

> \begin{flushleft}

> \begin{flushright}

> \begin{center}

flushleft 和flushright 环境分别产生左对齐(left-aligned) 和右对齐(right-aligned) 的段落。center 环境产生居中的文本。如果你不输入命令\\\\ 指定断行点，LATEX 将自行决定。

### 按原文输出

> \begin{verbatim}

位于\begin{verbatim} 和\end{verbatim} 之间的文本将直接打印，包括所有的断行和空白


> \verb+text+

可以完成类似的功能。 + 仅是分隔符的一个例子。除了* 或空格，可以使用任意一个字符。

### \begin{equation}

> \begin{equation}

产生带标号的公式

### 引入中文包：

这是为了显示中文字体 \\
\usepackage\[UTF8\]{ctex}

可以用以下命令替代

> \documentclass{ctexart}

在写中文时，可以使用以下命令设置字体

> \heiti， \kaishu


### 定义命令

> \newcommand\degree{^\circ}

> \newtheorem{defn}{定义}

定义命令，类似宏定义




### 字体设置

**字体族设置**

> \textrm{Roman Family}

> \textsf{Sans Serif Family}

> texttt{Typewriter Family}

> {\rmfamily Roman Family}

> {\sffamily Sans Serif Family}

> {\ttfamily Typewriter Family}

**字体系列设置（粗细、宽度）**

> \textmd{Medium Series}

> \textbf{Boldface Series}

> {\mdseries Medium Series} 

> {\bfseries Boldface Series}

**字体形状（直立、斜体、伪斜体、小型大写）**

> \textup{Upright Shape}

> \textit{Italic Shape}

> \textsl{Slanted Shape}

> \textsc{Small Caps Shape}

> {\upshape Upright Shape} {\itshape Italic Shape} {\slshape Slanted Shape} {\scshape Small Caps Shape}

**中文字体**

> {\songti 宋体} {\heiti 黑体} {\fangsong 仿宋} {\kaishu 楷书}  

中文字体的\textbf{粗体}与\textit{斜体}

粗体是用黑体表示的，斜体是用楷书表示的。

**字体大小**

字体大小是相对normalsize设置的

> {\tiny Hello} \\
> {\scriptsize Hello} \\
> {\footnotesize Hello} \\
> {\small Hello} \\
> {\normalsize Hello} \\
> {\large Hello} \\
> {\Large Hello} \\
> {\LARGE Hello} \\
> {\huge Hello} \\
> {\Huge Hello}

normalsize在documentclass的参数中设置，一般只有10pt、11pt、12pt

**中文字号设置命令**

> \zihao{5} 你好！

latex中有格式与内容分离的思想，应该使用newcomand设置自己的命令

### 特殊符号

空白符

> \quad

1em（当前字体中M的宽度）

> \qquad

2em

> \thinspace

约为1/6个em

> \enspace

0.5个em

> \ 

上面其实是\加上空格， 这样就能输出空格

> ~

硬空格

> \kern 1pc

1pc = 12pt = 4.218mm

> \kern -1em

> hskip 1em

> hspace{35pt}

> hphantom{xyz}

产生和xyz一样长度的占位符

> \hfill

填满空间

### 插入图片

> \usepackage{graphicx}

> \graphicspath{}

> \includegraphics[width/height/scale/angle]{\<文件名\>}


```
\includegraphics[angle=-45, origin=c]
```

使用angle选项可以让图形逆时针旋转一定角度， 旋转的中心可以用origin选项确定。origin的值可以用字符l, r, c, t, b, B中的一个或两个， 分别表示左、右、中、上、下和基线。

> \graphicspath\{\{figures/\}, \{pics/\}\}

引入图片路径


### 插入表格

> \begin{tabular}{\|l\|c\|c\|c\|p{1.5cm}\|}

l居左 c居中 r居右 \| 插入竖线 \|\| 插入双竖线

p指定行宽， 当宽度不足时，自动产生换行

> \hline

插入横线

> \hline \hline

插入双横线


表格宏包：booktab、 longtab、tabu

### 浮动体环境

> begin{figure}[\<允许位置\>]

\<允许位置\>参数（默认tbp）
- h， 此处(here)-代码所在的上下文位置
- t， 页顶(top)-代码所在页面或之后页面的顶部
- b， 页底(bottom)-代码所在页面或之后的页面的底部
- p， 独立一页(page)-浮动页面

> begin{tabular}

在环境中可使用\centering设置位置



使用\caption设置环境标题

\label为浮动体设置标签， 通过该标签使用\ref引用

标题控制(captipn、bicaption等宏包)

并排与子图标（subcaption、subfig、floatrow等宏包）

绕排（picinpar、wrapfig等宏包）


### Latex 公式换行问题（换行，等号对齐）

> \begin{aligned}

aligned就是用来公式对齐的，在中间公式中，\\ 表示换行， & 表示对齐。在公式中等号之前加&, 要换行的地方加\\就可以了。

### 参考文献Bibtex


**一次管理、一次引用**

> \begin{thebibography}  
> 
> \bibitem{article1/book1} ...  \emph{}
> 
> \end{thebibography}


emph强调某些内容

**一次管理、多次使用**

创建.bib后缀的文献数据库

> bibliographystyle{alpha} %plain

设定参考文献的样式

使用natbib宏包选用更多的样式


> \bibliography{test， cnki}

在需要输出参考文献的地方， 引入文献数据库


> \cite{}

无格式化引用

> \parencite{}

带方括号的引用

> \supercite{}

上标引用

> \nocite{\*} 

无参考文献的引用



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


### 将文字放在底部

> \vfill


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


## 实现居中左对齐

使用center加tabular环境

> \begin{center}
> \begin{tabular}
> ...
> \end{tabular}
> \end{center}

## 首段缩进

LaTeX默认的第一段不是首bai行缩进的, 这不符合我们的du中文习惯.

要实现首行缩进也很zhi简单,

在导言区加入宏包dao首行 \usepackage\{indentfirst\} 就可以了.

使用命令 设置 缩进的距离 \setlength\{\parindent\}\{2em\},

这里的 2em 表示缩进 2 个字符位置
.
如果有一个段落你不想首行缩进, 在段落前使用命令 \noindent.

同样的, 你要保证这一段是首行缩进, 使用命令 \indent, 如果使用了 CJK 宏包, 还可以用 \CJKindent.

## 两张图片并排显示

宏包：

> \usepackage{graphicx}

代码：

```
\begin{figure}[htbp]
\centering
\begin{minipage}[t]{0.48\textwidth}
\centering
\includegraphics[width=6cm]{test1.jpg}
\caption{World Map}
\end{minipage}
\begin{minipage}[t]{0.48\textwidth}
\centering
\includegraphics[width=6cm]{test2.jpg}
\caption{Concrete and Constructions}
\end{minipage}
\end{figure}
```




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

> \documentclass\[10pt,handout]{beamer}

生成讲义版本

> \mode\<beamer>\{\% \\
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
- \[handout\] 适用于 PDF 讲义.
- \[trans\] 适用于 PDF 幻灯片.
-  \[notes=hide/show/only\] 适用于笔记。隐藏注释(默认), 为 PDF screen 添加注释, 仅产生 PDF 注释。

### frame

- \frame\[plain\]{\frametitle{}..}
- \[containsverbatim\] 适用于使用 verbatim 环境和 \verb 命令。
- \[allowframebreaks\] 适用于一张幻灯片放不下内容时自动分开。
- \[shrink\] 适用于缩小内容充满一张幻灯片。
- \[squeeze\] 适用于挤压垂直空间。


### 定理与区块

在beamer中， 已经预定义了许多定理类环境： theorem， corollary， definition， definitions， fact， example以及examples， 它们都以英文名称给出。

不过我们需要的是中文定理环境，可以使用\newtheorem另行定义：

> \newtheorem{thm}{定理}

证明环境汉化：

> \renewcommand\proofname{证明}

block、alertblock和exampleblock环境是beamer定义的三种区块环境， 它们除了配色不同外，用法和结果大致相同。


### 左右分栏

在columns 环境中，用 \column 命令产生新的一栏

> \begin{在columns}

> \column{.5\textwidth}

左右两边块垂直顶部对齐, 在 columns 环境中加入\[t\] 选项

在第一栏的末尾放置 \pause 命令, 允许只“显示（uncover）”帧的第二张幻灯片的第二栏


# Bug

## Package amsmath Error: \begin{aligned} allowed only in math mode


> begin{math}

使用math环境

# Reference
1. [Markdown中LaTeX公式编号](https://blog.csdn.net/KitKat09/article/details/89162216)
2. [LaTex 箭头上添加文字](https://blog.csdn.net/z_feng12489/article/details/99861893)
3. [latex中怎么在符号正上和正下方编写公式](https://blog.csdn.net/WASEFADG/article/details/50499350?utm_source=blogxgwz0)
4. [LaTex 把上下标符号放在正上和正下方公式介绍](https://blog.csdn.net/z_feng12489/article/details/101422618)
5. [Markdown符号和公式](https://blog.csdn.net/xufox/article/details/91048187)
6. [markdown中在矩阵运算上方增加矩阵名称](https://blog.csdn.net/banglu2731/article/details/101079241)
7. [latex中矩阵里面的省略号怎么表示](https://zhidao.baidu.com/question/162572792.html)
8. [Tex, LaTex, pdflatex, xelatex, xetex等的区别和关系](https://blog.csdn.net/chen_shiqiang/article/details/52101836)
9. [LaTeX学习（入门到入土）](https://www.bilibili.com/video/BV147411G7yk?p=13)
10. [Latex 公式换行问题（换行，等号对齐）](https://blog.csdn.net/leichaoaizhaojie/article/details/53463598)
11. [Beamer中左边画图, 右边文字解释](https://blog.csdn.net/weixin_30810239/article/details/97211862)
12. [LaTeX（1）设置部分文本居中左对齐、居中右对齐](https://blog.csdn.net/qq_40675882/article/details/84556527)
13. [latex如何让一段缩进](https://zhidao.baidu.com/question/455732580636575605.html)
14. [LaTeX 如何让两张图并排显示？](https://www.zhihu.com/question/41322252)
15. [latex 加减号堆积，放在一起](https://blog.csdn.net/robert_chen1988/article/details/73301780)