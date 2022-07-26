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
- $\subset$： \subset
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
- $\partial$： \partial
- $\check{a}$： \check{a}
- $\tilde{a}$： \tilde{a}
- $\perp$： \perp
- $\bullet$： \bullet
- 正比于$\propto$： \propto
- $\varphi$： \varphi
- $\triangleq$： \triangleq
- 恒等于$\equiv$： \equiv
- 因为$\because$： \because
- 所以$\therefore$： \therefore
- 存在$\exists$： \exists
- $\overline{test}$：\overline{test}
- $\lor$： \lor
- $\land$： \land 
- $\succ$:  \succ
- 伪逆符号 $\dagger$： \dagger

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



## documentclass

> \documentclass[option]{class}

clsss 指定想要的文档类型。通过options 参数可以定制文档类的属性。同的选项之间须用逗号隔开。

例子：

```
\documentclass[11pt,twoside,a4paper]{article}
```

这条命令会引导 latex 使用article 格式、 11 磅大小的字体来排版该文档， 并得到在A4 纸上双面打印的效果。 

![](https://raw.githubusercontent.com/ShawnDong98/ShawnDong98.github.io/master/小书匠/1596116872759.png)

![](https://raw.githubusercontent.com/ShawnDong98/ShawnDong98.github.io/master/小书匠/1596116898459.png)

## usepackage

> \usepackage[options]{package}

![](https://raw.githubusercontent.com/ShawnDong98/ShawnDong98.github.io/master/小书匠/1596117424185.png)

## \begin

> \begin{document}

此时可以输入带有LATEX 命令的正文。 在文章末尾使用命令

> \end{document}

来告诉LATEX 文档已经结束。LATEX 会忽略此命令后的所有内容。


## include

> \include{filename}

可以使用该命令将名为filename.tex 的文档内容插入到当前文档中。 需要注意
的是，在处理插入的filename.tex 文档前，LATEX 会另起一页。


## includeonly

> \includeonly{filename,filename,. . . }

该命令只能在导言区使用。 它可以让LATEX 仅读入某些\include 文件。

这条命令在文档的导言区执行后，在所有的\include 命令中，只有文档名出现在\includeonly 的命令参数中的文档才会被导入。注意文档名和逗号之间不能有空格。

\include 命令会在新的一页上排版载入的文本。当使用\includeonly 命
令时会很有帮助，因为即使一些载入的文本被忽略，分页处也不会发生变化。

## input

> \input{filename}

有些时候可能不希望在新的一页上排版载入的文本， \input 命令只是简单的载入指定的文本，没有其他限制。

## maketitle

> \maketitle

整篇文档的标题(title) 由以上命令产生。

标题的内容必须在调用\maketitle 以前，由命令\title{...}, \author{...} 和可选的\date{...}

在命令\author 的参量中，可以输入几个用\and 命令分开的名字。


## 标题、章和节

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


## 交叉引用

> \label{marker}, \ref{marker} 和\pageref{marker}

如果在节、子节、图、表或定理后面输入\label 命令，LATEX 把\ref 替换为相应的序号。\pageref 命令排印\label输入处的页码


## 脚注

> \footnote{footnote text}

把脚注内容排印于当前页的页脚位置。

## 页面样式pagestyle


> \pagestyle{style}

LATEX 支持三种预定义的页眉/页脚(header/footer) 样式， 称为页面样式(pagestyle)

![](https://raw.githubusercontent.com/ShawnDong98/ShawnDong98.github.io/master/小书匠/1596122782197.png)


## Itemize、Enumerate 和 Description

itemize 环境适用于简单的列表，enumerate 环境适用于有排列序号的列表， 而description 环境用于带描述的列表。

> \begin{enumerate}

![](https://raw.githubusercontent.com/ShawnDong98/ShawnDong98.github.io/master/小书匠/1596153280445.png)

> \begin{itemize}

![](https://raw.githubusercontent.com/ShawnDong98/ShawnDong98.github.io/master/小书匠/1596153315338.png)

> \begin{description}

![](https://raw.githubusercontent.com/ShawnDong98/ShawnDong98.github.io/master/小书匠/1596153369664.png)


## 左对齐、右对齐和居中

> \begin{flushleft}

> \begin{flushright}

> \begin{center}

flushleft 和flushright 环境分别产生左对齐(left-aligned) 和右对齐(right-aligned) 的段落。center 环境产生居中的文本。如果你不输入命令\\\\ 指定断行点，LATEX 将自行决定。

## 按原文输出

> \begin{verbatim}

位于\begin{verbatim} 和\end{verbatim} 之间的文本将直接打印，包括所有的断行和空白


> \verb+text+

可以完成类似的功能。 + 仅是分隔符的一个例子。除了* 或空格，可以使用任意一个字符。

## \begin{equation}

> \begin{equation}

产生带标号的公式

## 引入中文包：

这是为了显示中文字体 \\
\usepackage\[UTF8\]{ctex}

可以用以下命令替代

> \documentclass{ctexart}

在写中文时，可以使用以下命令设置字体

> \heiti， \kaishu


## 定义命令

> \newcommand\degree{^\circ}

> \newtheorem{defn}{定义}

定义命令，类似宏定义




## 字体设置

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

加上\{\}限制字体的作用域， 不加对全文有效

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

## 特殊符号

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

## 插入图片

> \usepackage{graphicx}

> \graphicspath{}

> \includegraphics\[width/height/scale/angle]{\<文件名\>}


```
\includegraphics[angle=-45, origin=c]
```

width 和 height 可以结合 \textwidth 来使用， 比如width = 0.5 \textwidth。

使用angle选项可以让图形逆时针旋转一定角度， 旋转的中心可以用origin选项确定。origin的值可以用字符l, r, c, t, b, B中的一个或两个， 分别表示左、右、中、上、下和基线。

> \graphicspath\{\{figures/\}, \{pics/\}\}

引入图片路径


使用\caption后，图片下方会出现figure。

> \usepackage{caption} \\
> \caption*{...}

这样会不显示figure。

在figure环境里使用\label\{\}可以引用该图片。



## 插入表格

> \begin{tabular}{\|l\|c\|c\|c\|p{1.5cm}\|}

l居左 c居中 r居右 \| 插入竖线 \|\| 插入双竖线

p指定行宽， 当宽度不足时，自动产生换行

> \hline

插入横线

> \hline \hline

插入双横线


表格宏包：booktab、 longtab、tabu

## 浮动体环境

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


## Latex 公式换行问题（换行，等号对齐）

> \begin{aligned}

aligned就是用来公式对齐的，在中间公式中，\\ 表示换行， & 表示对齐。在公式中等号之前加&, 要换行的地方加\\就可以了。

## 参考文献Bibtex


**一次管理、一次引用**

> \begin{thebibliography} {99}
> 
> \bibitem{article1/book1} ...  \emph{}
> 
> \end{thebibliography}

\{99\}一定得写上，表示的不是由99个参考文献，而是表示参考文献的数目最大是两位数。

emph强调某些内容。


**引用网页**

引入包

> \usepackage\[colorlinks\]{hyperref}

- colorlinks: 超链接是否带颜色；
- linkcolor： 目录，公式，图表等内部链接的颜色；
- filecolor： 文件型链接的颜色；
- urlcolor： 网页链接的颜色；
- citecolor： 参考文献连接的颜色；



>\url{网址}：生成网址链接，以等宽字体排版； \\
>\href{网址}{描述}：生成网址链接，以正常字体显示描述，隐藏网址。

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



## 数学多条件公式



```
\begin{cases}

\end{cases}
```

## 矩阵

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


## 将文字放在底部

> \vfill


##  Markdown中LaTeX公式编号

在Markdown中使用LaTeX公式时，加上\tag{...}标签可以生成对应的编号。

比如这个代码可以生成

\$\$x+y = z \tag{1.1}\$\$

这样的带编号的公式。

$$x+y = z \tag{1.1}$$

## Latex 子公式

```
\begin{subequations}
    \begin{gather}
        {\color{orange} v^{k} = \hat x^{k-1} - \rho \Phi^T (\Phi \hat x^{k-1} - y)}
        \label{eq5a} \\
        {\color{cyan} \hat x^k = \text{prox}_{\lambda, J}(v^k)}
        \label{eq5b}
    \end{gather}
\end{subequations} 
```

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1658719136427.png)


##  LaTex 箭头上添加文字

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

LaTeX默认的第一段不是首行缩进的, 这不符合我们的中文习惯.

要实现首行缩进也很简单,

在导言区加入宏包首行 \usepackage\{indentfirst\} 就可以了.

使用命令 设置 缩进的距离 \setlength\{\parindent\}\{2em\},

这里的 2em 表示缩进 2 个字符位置
.
如果有一个段落你不想首行缩进, 在段落前使用命令 \noindent.

同样的, 你要保证这一段是首行缩进, 使用命令 \indent, 如果使用了 CJK 宏包, 还可以用 \CJKindent.


英文直接使用 \hspace{0.3cm}

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


## 两张图并列显示

法一： 

```
\begin{figure}
      \centering
      \begin{minipage}{.5\textwidth}
        \centering
        \includegraphics[scale=0.9]{figure/fig7.png}
        \caption{Bar Chart of the newly visible edges $e$}
        \label{fig7}
      \end{minipage}
      \begin{minipage}{.5\textwidth}
        \centering
        \includegraphics[scale=0.9]{figure/fig8.png}
        \caption{Bar Chart of the mean ratio of the gradients $r$}
        \label{fig8}
      \end{minipage}
 \end{figure}
```


法二：

```
%导言区插入下面三行
\usepackage{graphicx}
\usepackage{float} 
\usepackage{subfigure}


\begin{figure}[H]
	\centering  %图片全局居中
	\subfigure[name1]{
	\label{Fig.sub.1}
	\includegraphics[width=0.45\textwidth]{DV_demand}}
	
	\subfigure[name2]{
	\label{Fig.sub.2}
	\includegraphics[width=0.45\textwidth]{P+R_demand}}
	\caption{Main name}
	\label{Fig.main}
\end{figure}
```


## Latex输入矩阵的几种方式

**直接用matrix、pmatrix、bmatrix、Bmatrix、vmatrix或者Vmatrix环境:**

```
$$
\begin{gathered}
\begin{matrix} 0 & 1 \\ 1 & 0 \end{matrix}
\quad
\begin{pmatrix} 0 & -i \\ i & 0 \end{pmatrix}
\quad
\begin{bmatrix} 0 & -1 \\ 1 & 0 \end{bmatrix}
\quad
\begin{Bmatrix} 1 & 0 \\ 0 & -1 \end{Bmatrix}
\quad
\begin{vmatrix} a & b \\ c & d \end{vmatrix}
\quad
\begin{Vmatrix} i & 0 \\ 0 & -i \end{Vmatrix}
\end{gathered}
$$
```

$$
\begin{gathered}
\begin{matrix} 0 & 1 \\ 1 & 0 \end{matrix}
\quad
\begin{pmatrix} 0 & -i \\ i & 0 \end{pmatrix}
\quad
\begin{bmatrix} 0 & -1 \\ 1 & 0 \end{bmatrix}
\quad
\begin{Bmatrix} 1 & 0 \\ 0 & -1 \end{Bmatrix}
\quad
\begin{vmatrix} a & b \\ c & d \end{vmatrix}
\quad
\begin{Vmatrix} i & 0 \\ 0 & -i \end{Vmatrix}
\end{gathered}
$$

**第二种方法是使用array环境来输入矩阵，示例如下：**

```
\begin{matrix}       %开始数学环境
\left(                 %左括号
  \begin{array}{ccc}   %该矩阵一共3列，每一列都居中放置
    a11 & a12 & a13\\  %第一行元素
    a21 & a22 & a23\\  %第二行元素
  \end{array}
\right)                 %右括号
\end{matrix}
```
效果为：

$$
\begin{matrix}       %开始数学环境
\left(                 %左括号
  \begin{array}{ccc}   %该矩阵一共3列，每一列都居中放置
    a11 & a12 & a13\\  %第一行元素
    a21 & a22 & a23\\  %第二行元素
  \end{array}
\right)                 %右括号
\end{matrix}
$$


## 页码、页眉、页脚

页码的计数器时page， 它会随着文档自动计数，

\pagenumbering\{(格式)\}来设置页码的编号方式， 这个命令会令页码重新从1开始按（格式）参数进行计数， 例如：


```
\pagenumbering{roman}
```

另一种重新从1开始计数的方法

```
\setcounter{page}{1}
```

去掉页码：

```
\thispagestyle{empty}
```


页码的风格：

- arabic - 阿拉伯数字
- roman - 小写的罗马数字
- Roman - 大写的罗马数字
- alph - 小写的字符形式
- Alph -大写的字符形式

latex提供了多种预定义的页面风格(page style)， 它们控制页眉页脚的整体风格设置：
- empty: 没有页眉页脚
- plain： 没有页眉， 页脚时居中的页码
- herdings： 没有页脚， 页眉是章节名称和页码
- myheadings： 没有页脚， 页眉是页码和用户自定义的内容

可以用\pagestyle{(风格)}整体设置页面风格， 也可以用\thispagestyle{(风格)}单独设置当前页的风格。标准文档中，book类默认使用headings风格， report和article默认使用plain风格； 中文的几个ctex文档类都默认使用headings风格。

例如， 可以在article类中设置带章节名称的页眉：

```
\documentclass{article}
\pagestyle{headings}
```

又如， 可以再插入大幅图片的页面使用plain风格，取消复杂的页眉：

```
\begin{figure}{p}
	\thispagestyle{plain}
	...
\end{figure}
```

latex在标题页（包括手工或自动由\maketitle生成的titlepage环境）， 会使用empty风格禁用所有的页眉页脚；而在不单独成页的\maketitle， 单独成页的\part以及\chapter命令所在的一页，则使用plain风格只显示页码。

headings和myheadings两种风格是由标准文档类定义的， 它们的表现其实基本相同，都是在页眉显示页码和一些文字。不同的是， headings风格的页眉内容不能改变， 它是由\chapter、\section等命令自动生成的， 而myheadings风格的页眉可以由用户自己使用\markright和\markboth命令设置。


单面文档（oneside）  \markright\{(页眉文字)\} \\
双面文档（twoside）   \markboth\{(左面页眉)\}\{(右面页眉)\}

![](https://raw.githubusercontent.com/ShawnDong98/ShawnDong98.github.io/master/小书匠/1597929588222.png)

这里“右面”指奇数页， “左面”指偶数页， 因为当双面文档在侧面装订好后， 翻开的页面正好是右奇左偶， 单面文档的所有页面都认为是右面。 \markright和\markboth命令实际会修改\leftmark和\rightmark两个宏的内容， 并在页眉处输出。例如， 如果想让文章在每页的页眉显示作者的名字， 就可以使用：

```
\documentclass{ctexart}
\pagestyles{headings}
\markright{张三}
```

fancyhdr宏包提供了新的页面风格fancy, 以及一系列的设置命令，用作标准的latex的myheadings及\markboth， \markright机制的扩展。

fancyhdr的fancy页面风格把页面的页眉和页脚都分成左、中、右3个部分, 因而一个页面就有6个部分。 对于双面文档， 则还分奇数页和偶数页， 即有12个部分。

![](https://raw.githubusercontent.com/ShawnDong98/ShawnDong98.github.io/master/小书匠/1597930977768.png)

各个部分可以用下列命令进行设置修改：

![](https://raw.githubusercontent.com/ShawnDong98/ShawnDong98.github.io/master/小书匠/1597931004583.png)

这里， \fancyhead、\fancyfoot和\fancyhf命令可以带表示位置的可选参数.

- H、F分别表示页眉(header)和页脚(footer)
- E、O分别表示双面文档的偶数页(even page)和奇数页(odd page), 单面文档仅奇数页有效
- L、C、R分别表示左(left)、中(center)、右(right)。

位置参数可以任意组合，多个参数用逗号分隔。如果省略位置参数，则表示所有的页眉、页脚， 例如：

```
\documentclass{twoside}{ctexrep}
\usepackage{fancyhdr}
\pagestyle{fancy} % 使用fancy风格
\fancyhf{} % 清楚所有页眉页脚
\cfoot{\thepage} % 页脚居中页码
\fancyhead[CO]{张三} % 奇数页居中页眉作者名
\fancyhead[CE]{论语言} % 偶数页居中页眉文章题目
\fancyfoot[RO, LE]{$\hearsuit$} % 奇数页脚右， 偶数页脚左（即外侧）装束符号
```

在fancy页面风格的设置中，可以在页眉页脚的内容中使用\leftmark和\rightmark命令， 它们的意义与headings风格中的页眉相同，即为文档的章节标题内容： article只有\rightmark是节标题； report和book的\leftmark是章标题， \rightmark是节标题。 事实上， fancy风格的默认设置就是：

```
\fancyhead[LE, RO]{\slshape \rightmark}
\fancyhead[LO，RE]{\slshape \leftmark}
\fancyfoot[C]{\thepage}
```

在ctex宏提供的文档类中，可以使用fancyhdr选项，表示使用fancyhdr宏包及fancy页面风格。

```
\documentclass{twoside}{ctexrep}
\usepackage{fancyhdr}
\pagestyle{fancy} % 使用fancy风格
\fancyhf{} % 清楚所有页眉页脚
```

可以写成

```
\documentclass{twoside, fancyhdr}{ctexrep}
\fancyhf{}
%...
```

除了页眉页脚的内容， fancy页面风格还会给页眉和页脚加一条横线。 可以重新定义宏\headrulewidth和\footrulewidth来修改页眉线和页脚线的宽度， 如果宽度为零就是没有页眉页脚线， 注意它们只是文本宏而不是长度变量， 如：

```
\renewcommand\headrulewidth{0.6pt} % 默认为 0.4pt
\renewcommand\footrulewidth{0.6pt} % 默认为 0pt
```

使用fancyhdr还可以使用\fancypagestyle命令重定义原有的页面风格， 通常可以用它来重新定义plain风格， 这样在每章的第1页等位置也可以使用特殊的页面风格， 如

```
\fancypagestyle{plain}{
	\fancyhf{}
	\cfoot{--\textit{\thepage}--} % 改变页码形状
	\renewcommand\headrulewidth{0pt} % 无页眉线
	\renewcommand\footrulewidth{0pt} % 无页脚线
```

## 四号字体对应于latex是多少pt?


word中的四号字体对应于14pt

初号  42pt

小初号& 36pt

一号& 28pt

二号& 21pt

小二号& 18pt

三号& 15.75pt

四号& 14pt

小四号& 12pt

五号& 10.5pt

小五号& 9pt

六号 & 7.875pt

七号 & 5.25pt

## 如何输入分段函数

使用**amsmath宏包**提供的cases环境


或者


```
\begin{equation}
    \left\{
    \begin{aligned}
        I &= A · P · e^{- \beta z} + A · (1 - e^{-\beta G^z}) \\
        I_G &= A_G · P · e^{-\beta G^z} + A_G · (1 - e^{-\beta G^z})
    \end{aligned}
    \right.
\end{equation}
```


效果：

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1615615897545.png)



## latex中同一处引用多篇文献

如何使连续的参考文献能够中间用破折号连起来？比如\[6,7,8,9\]变成\[6-9\]?


方法：在文档开始前加上下面的语句命令

```
\usepackage\[numbers,sort&compress\]{natbib}
```


不但可以压缩参考文献标号，还可以进行排序，即无论正文里面的顺序怎样，显示出来都是先后顺序。


## latex 特殊字体字

> mathbb：blackboard bold，黑板粗体
mathcal：calligraphy（美术字）
mathrm：math roman
mathbf：math boldface


- 花体 \mathcal： \mathcal{L,F,D,N}
- - $\mathcal{L}$ (\mathcal L)常用来表示损失函数
- - $\mathcal{D}$(\mathcal D)表示样本集
- - $\mathcal{N}$ (\mathcal N)常用来表示高斯分布；
- 空心 \mathbb：$\mathbb{R,N}$
- \mathsf: $\mathsf{f(x,y) = 3(x+y)y / (2xy-7)}$
- \mathtt: $\mathtt{f(x,y) = 3(x+y)y / (2xy-7)}$
- \mathit:  $\mathit{f(x,y) = 3(x+y)y / (2xy-7)}$

## 双栏格式放置大图


```
\begin{figure*}
    \centering
    \includegraphics[scale=0.37]{figure/fig6.png}
    \caption{Example results using Dehazenet \cite{28}, AODnet \cite{29}, DCPDN \cite{30}, EPDN \cite{32}, GCANet \cite{33}, and, proposed USTM respectively.}
    \label{fig6}
\end{figure*}
```

figure 后面加 *


## 让希腊字母变粗体


```
\usepackage{bm}

$\bm{\sigma}$
```


## 修改线条粗细hline

可以使用booktabs宏包

```
\usepackage{booktabs}
```


然后使用\toprule, \midrule and \bottomrule


## 设置表格宽度

调整表格宽度, 效果为”按内容调整表格”.

```
 \resizebox{\textwidth}{15mm}{XXXX}
```

Example：

```
\begin{center}
\textbf{Table 1}~~Original table.\\
\resizebox{\textwidth}{15mm}{
\begin{tabular}{cccccccccccc} \toprule
Models  &  $\hat c$  &  $\hat\alpha$  &  $\hat\beta_0$  &  $\hat\beta_1$  &  $\hat\beta_2$ & Models  &  $\hat c$  &  $\hat\alpha$  &  $\hat\beta_0$  &  $\hat\beta_1$  &  $\hat\beta_2$  \\ \hline
model  & 30.6302  & 0.4127  & 9.4257  & - & -  & model  & 30.6302  & 0.4127  & 9.4257  & - & -\\
model  & 12.4089  & 0.5169  & 18.6986  & -6.6157  & - & model  & 30.6302  & 0.4127  & 9.4257  & - & - \\
model  & 14.8586  & 0.4991  & 19.5421  & -7.0717  & 0.2183 & model  & 30.6302  & 0.4127  & 9.4257  & - & - \\
model  & 3.06302  & 0.41266  & 0.11725  & - & - & model  & 30.6302  & 0.4127  & 9.4257  & - & - \\
model  & 1.24089  & 0.51691  & 0.83605  & -0.66157  & - & model  & 30.6302  & 0.4127  & 9.4257  & - & - \\
model  & 1.48586  & 0.49906  & 0.95609  & -0.70717  & 0.02183  & model  & 30.6302  & 0.4127  & 9.4257  & - & - \\
\bottomrule
\end{tabular}}
\end{center}
```

## figure的位置

\[htbp\]就是浮动格式 

h 当前位置。将图形放置在正文文本中给出该图形环境的地方。如果本页所剩的页面不够，这一参数将不起作用。 t 顶部。将图形放置在页面的顶部。

 b 底部。将图形放置在页面的底部。 p 浮动页。将图形放置在一只允许有浮动对象的页面上。
 
 
 一般使用\[htb\]这样的组合，只用\[h\]是没有用的（原因请读者思考）。这样组合的意思就是latex会尽量满足排在前面的浮动格式，就是h-t-b这个顺序，让排版的效果尽量好。
 
 如果你就是要插在你想插的位置怎么办？ 
 
 如果tex不让你插在你想插的位置，说明你的图片太大了，你可以试试调整\[width=6.5cm\]中的大小，让它能够插得下，其实我们在word中也是这样做的。推荐使用。
 
 
## 左引号和右引号

在latex中加引号时，使用""的输出为两个同向的引号；

正确的做法为：

```
``Firewall''
```

## 调整段间距


setlength{\parskip}{0em} 


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

> \begin{columns}

> \column{.5\textwidth}

左右两边块垂直顶部对齐, 在 columns 环境中加入\[t\] 选项

在第一栏的末尾放置 \pause 命令, 允许只“显示（uncover）”帧的第二张幻灯片的第二栏


# Bug

## Package amsmath Error: \begin{aligned} allowed only in math mode


> begin{math}

使用math环境


## ! pdfTeX error (ext4): \pdfendlink ended up in different nesting level than \pdfstartlink.

最好不要在这个模板里面用 超链接符号宏包。

使用了 \usepackage{hyperref} 这个宏包

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1615613239056.png)


其注释掉，不会出现这个错误。


在 AAAI 的模板上不要使用这个超链接宏包 ，即可(ICCV也是)
# References
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
16. [Latex输入矩阵的几种方式](https://blog.csdn.net/luohuiwu/article/details/80722026)
17. [word中的四号字体对应于latex是多少pt?](https://zhidao.baidu.com/question/470388972.html)
18. [LaTex排版技巧：[16]如何输入分段函数](https://jingyan.baidu.com/article/b0b63dbfcf3f814a49307043.html)
19. [LaTex技巧[22]：LaTex插图命令includegraphics参数详解](https://blog.csdn.net/king0406/article/details/51252298)
20. [LaTex建立参考文献链接](https://blog.csdn.net/yql_617540298/article/details/88651282)
21. [How to remove figure caption prefix “figure” in beamer](https://tex.stackexchange.com/questions/82456/how-to-remove-figure-caption-prefix-figure-in-beamer)
22. [latex页码从1开始计数](https://www.jianshu.com/p/d2f76b04126e)
23. [latex中同一处引用多篇文献](https://blog.csdn.net/lqhbupt/article/details/49925911)
24. [Latex 编译错误： ! pdfTeX error (ext4): \pdfendlink ended up in different nesting level than \pd fstartlink. 解决方法](https://www.cnblogs.com/wangxiaocvpr/p/5860286.html)
25. [LaTeX —— 特殊符号与数学字体](https://blog.csdn.net/lanchunhui/article/details/54633576)
26. [LATEX 中修改表格线条粗细hline](https://blog.csdn.net/lqhbupt/article/details/47150317)
27. [Latex 表格过大(或过小)的调整方法](Latex 表格过大(或过小)的调整方法)
28. [latex论文插图位置问题](https://blog.csdn.net/king0406/article/details/51252133)
29. [LaTeX排版札记：part 4—插入图片（并排显示、自定义编号）](https://zhuanlan.zhihu.com/p/32925549)
30. [latex第一段的首行缩进问题](https://blog.csdn.net/qq_32791307/article/details/80715599)
31. [LATEX 公式编号、子公式编号方法](https://zhuanlan.zhihu.com/p/99406531)