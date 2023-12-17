---
layout:     post
title:      "【Research & Writting】TCSVT 投稿"
subtitle:   ""
date:       2023-12-11
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - Research & Writing
    - 
---

# The IEEE Article Submission Process

在你写完你的文章并准备好你的图片之后，你可以提交你的文章供审查。按照以下步骤完成IEEE文章提交流程。

# Select Your Target Journal

如果一篇文章超出了期刊的研究范围，那么它可能会在同行评议之前被拒绝。根据这些建议选择合适的日志。

- 从IEEE出版物推荐工具获得针对您的文章的定制推荐。
- 在IEEE Xplore数字图书馆中进行关键词搜索，查找具有类似内容的出版物列表。
- 查看相关期刊的参考书目。
- 向你所在领域的同事和合著者寻求建议。
- 阅读你的潜在目标出版物的目的和范围，以确保你的文章是一个很好的适合。《目标与范围》可以在《IEEE探索》杂志主页的“关于”标签中找到。
- 请记住，有些出版物只接受某些类型的文章。 Letters 出版物将接受简短的文章，而 Transactions 或 Journal 出版物将接受全文文章。

您一次只能向一个出版物提交文章。

# Follow All Submission Guidelines

所有IEEE期刊都在“作者信息”部分提供了投稿指南，这些信息发布在期刊或协会网站上。

查找目标期刊的指南：

- 在 IEEE Xplore 上找到该期刊的主页
- 单击“关于日志”选项卡
- 单击发布详细信息

不遵守指导方针可能会导致你的提交被延迟处理，未经审查而被拒绝，或者在你发表的文章中出现错误。


# Submit Your Article

在检查你的文章是否符合目标期刊的投稿指南之后，你就可以投稿了。在期刊的 IEEE Xplore 主页上点击Submit Your Manuscript 按钮。您将进入期刊的在线提交系统，该系统将引导您完成提交过程。


# TCSVT Submission of a Manuscript

## A. Submission of a Manuscript

1. 只有电子提交才会被考虑。您需要一个ScholarOne帐户和一个开放研究人员和贡献者ID（ORCID）才能提交手稿。详细说明发布在TCSVT ScholarOne提交网站上。未来作者应熟悉IEEE作者中心网站（[ https://ieeeauthorcenter.ieee.org/](https://ieeeauthorcenter.ieee.org/) 上发布的作者一般信息。在困难的情况下，作者可以通过发送电子邮件至（单击以显示电子邮件）来寻求帮助。
2. 所有文章都必须写得清晰且井井有条。手稿应在导言中说明这个问题的意义。文章应以明确讨论文章与最相关的先前工作的关系为动机。
3. 使用IEEE双列交易格式，包括数字在内的交易文件提交手稿的总长度不得超过十四（14）页，或交易信提交提交的总长度不得超过五（5）页。（注：超长费用从交易文件的第2页开始，或交易信件的第6页开始。详情见下文。）LaTeX和Word的样式文件可以从IEEE作者中心网站 ( [https://journals.ieeeauthorcenter.ieee.org/create-your-ieee-journal-article/authoring-tools-and-templates/tools-for-ieee-authors/ieee-article-templates/](https://journals.ieeeauthorcenter.ieee.org/create-your-ieee-journal-article/authoring-tools-and-templates/tools-for-ieee-authors/ieee-article-templates/) ) 下载，寻找交易的一般模板。最终提交格式必须是PDF。
4. 插图原件应在接受手稿后立即提交。
5. 作者必须从TCSVT EDICS（可在TCSVT ScholarOne提交网站上找到）中选择至少一个主题类别进行提交。作者可以指定的详细EDICS类别越多，它们就越能帮助识别匹配的副编辑和审稿人和审稿人。


# Template

## Abstract

本文档描述了最常见的文章元素以及如何使用IEEEtran类与LATEX一起生成适合提交给IEEE的文件。IEEEtran可以根据类选项的适当选择，生成会议期刊和技术说明（通信）论文。


## Introduction

本文件旨在作为IEEE期刊论文的“示例文章文件”，在LATEX下使用IEEEtran.cls版本1.8b及以后版本制作。最常见的元素在“New IEEEtran how-to.pdf”中有简化和更新的指导。对于不太常见的元素，您可以参考原始的“IEEEtran HOWTO.pdf”。假设读者具有LATEX的基本工作知识。LATEX新手被鼓励阅读Tobias Oetiker的“The Not So Short Introduction to LATEX”，该文档提供了关于使用LATEX的概览。


## THE DESIGN, INTENT, AND LIMITATIONS OF THE TEMPLATES

这些模板旨在近似文章/论文的最终外观和页面长度。它们并非旨在成为在打印或IEEEXplore®上展示的最终制作作品。它们将帮助作者大致了解最终版本中的页面数量。LATEX文件的结构设计使得它们可以轻松转换为IEEE使用的组合系统的XML。这些XML文件用于制作最终的打印/IEEEXplore PDF，然后转换为IEEEXplore的HTML格式。


## WHERE TO GET LATEX HELP — USER GROUPS

以下在线组对初学者和经验丰富的LATEX用户很有帮助。搜索他们的档案可以为常见问题提供许多答案。

- [http://www.latex-community.org/](http://www.latex-community.org/)
- [https://tex.stackexchange.com/](https://tex.stackexchange.com/)

## OTHER RESOURCES

有关将数学格式化为文本的资源以及使用LATEX的其他帮助，请参阅[1]-[5]。


## TEXT

## SOME COMMON ELEMENTS

### A. Sections and Subsections

对章节标题进行编号是可取的，但非必需的。在编号时，请在整篇文章中保持一致，即文章中的所有标题和所有级别的章节标题都应进行编号。主要标题用罗马数字表示，次要标题用大写字母表示，三级标题用阿拉伯数字表示；四级标题用小写字母表示。参考文献和致谢标题与文中所有其他章节标题不同。它们从不进行编号。

### B. Citations to the Bibliography

文献引用的编码使用LATEX的 \cite 命令完成。这将显示为：见[1]。对于多个引用，编码如下：\cite{ref1,ref2,ref3}，这将产生[1]–[3]。对于不连续的引用范围，编码为 \cite{ref1,ref2,ref3,ref9}，这将产生[1]–[3], [9]。


### C. Lists

在本节中，我们将考虑三种类型的列表：简单的无编号、编号和项目符号。IEEEtran添加了许多选项来增强列表的创建。如果您的列表比下面显示的更复杂，请参阅原始的“IEEEtran HOWTO.pdf”以获取其他选项。

### D. Figures

图1是使用graphicx包的浮动图形的一个例子。请注意，\label命令必须在\caption命令之后（或其内部）。对于图形，\caption应该在\includegraphics之后。

图2(a)和2(b)是使用两个子图形的双栏浮动图形的示例。（要使这个功能工作，必须加载subfig.sty包。）子图形的\label命令设置在每个子浮动命令内部，整个图形的\label必须在\caption之后。使用\hfil作为分隔符以获得等间距。图形的所有部分的总宽度不应超过文本宽度，否则会发生换行。

请注意，IEEE论文中的多部分图形通常不会在图像本身内部放置标签（使用\subfloat[]的可选参数），而是会在主标题中引用/描述所有这些部分（a），（b）等。请注意，为了生成（a），（b）等子图形标签，subfig.sty需要\subfloat的可选参数存在。如果不需要子标题，请将其内容留空，例如\subfloat[]。

## VII. TABLES

请注意，对于IEEE风格的表格，\caption命令应该放在表格之前。表格标题使用标题大小写。冠词（a、an、the）、并列连词（and、but、for、or、nor）以及大多数短介词在非首词或末词时应使用小写。表格文字默认为\footnotesize，因为IEEE通常对表格使用这种较小的字体。如同往常，\label必须放在\caption之后。

## VIII. ALGORITHMS

算法应该编号，并包括一个简短的标题。它们用标题上下和最后一行之后的规则与文本区分开来。

## IX. MATHEMATICAL TYPOGRAPHY AND WHY IT MATTERS

数学公式的排版规范已经被开发出来，以提供数学文本中的统一性和清晰性。这使得阅读这些文本的读者既能理解作者的想法，又能迅速掌握新概念。虽然像LATEX和MathType®这样的软件在正确使用时可以产生美观的数学公式，但也很容易误用这些软件，可能导致数学显示不正确。

IEEE旨在为作者提供关于数学排版风格的正确指导，并协助他们撰写尽可能优秀的文章。因此，IEEE汇编了一系列好的和不好的数学排版示例[1]–[5]。


### Display Equations

下面显示的简单显示方程示例使用“方程”环境。要对方程进行编号，请使用\label宏为方程创建标识符。LaTeX将自动为您对方程进行编号。


### Equation Numbering

**连续编号：** 文章中的方程从文章的开头到结尾连续编号，即（1）、（2）、（3）、（4）、（5）等。不要使用罗马数字或截面编号进行方程编号。


**Appendix Equations:** 连续编号方程的延续最好在附录中，但允许编号为（A1）、（A2）等。

**Hyphens and Periods:**  连字符和句号不应用于方程号，即使用（1a）而不是（1-a）和（2a）而不是（2.a）作为子方程。这应该在整篇文章中保持一致。



# 使用LaTex写IEEE trans 论文的参考文献(bib)

1、 .tex文件同目录下新建reference.bib文件

2、添加包

```
\usepackage{cite}
```

3、在latex代码参考文献部分添加语句

```
% references section
\bibliographystyle{IEEEtran}
\bibliography{reference.bib}
```

4、把需要引用的文献bib格式的参考文献复制到bib文件里，可以直接通过百度学术、谷歌学术、web of science导出，例如

```
@article{2016Deep,
  title={Deep Convolutional Neural Networks for Computer-Aided Detection: CNN Architectures, Dataset Characteristics and Transfer Learning},
  author={ Shin, H. C.  and  Roth, H. R.  and  Gao, M.  and  Le, L.  and  Xu, Z.  and  Nogues, I.  and  Yao, J.  and  Mollura, D.  and  Summers, R. M. },
  journal={IEEE Transactions on Medical Imaging},
  volume={35},
  number={5},
  pages={1285-1298},
  year={2016},
}
```


# Reference

1. [使用LaTex写IEEE trans 论文的参考文献(bib)](https://blog.csdn.net/asfdsdg/article/details/114889672)
2. 