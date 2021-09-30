---
layout:     post
title:      "【深度学习】Single-Cell Analysis"
subtitle:   ""
date:       2021-09-30
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - 
---


# About multimodal single-cell data

## The flow of genetic information in cells

细胞是生命的基本单位。一切生物都是由细胞构成的。这包括树木、鱼类、人类、细菌、真菌等。细胞有各种形状和大小，但无论我们从怎么看，它们都有一些共同的属性。例如，所有的细胞都是 membrane-bound(细胞膜)。这意味着他们在内部和外部之间有一个明确的界限。所有的细胞都含有某种形式的细胞器，这些细胞器是执行特定功能的特殊的子结构。而且，所有的细胞都包含三层遗传信息： `DNA`、 `RNA` 和 蛋白质。


![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1633003745368.png)


DNA定义有机体。事实上，你可以通过基因组移植(genome transplantation)来改变细菌的种类。 然而，DNA不是功能性的(functional)。它包含一套必须转化成RNA然后再转化成蛋白质的指令。在大多数情况下，你可以把RNA看作是DNA和蛋白质之间的信使。DNA是由基因组成的，这些基因包含如何制造蛋白质的指令。蛋白质在细胞中负责执行生物功能，如代谢葡萄糖为细胞创造能量。一般来说，你体内的每一种蛋白质都是由一个基因编码的。