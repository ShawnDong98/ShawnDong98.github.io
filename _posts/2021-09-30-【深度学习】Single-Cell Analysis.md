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

尽管你体内的所有细胞都包含相同的基因组，相同的DNA，但这数万亿个细胞执行着非常不同的生物功能。免疫细胞、神经元或肌肉细胞之间的区别是由这些细胞内基因的开启或关闭决定的。当一个基因被激活时，就会产生更多的RNA副本，从而增加蛋白质的产量。我们直到蛋白质数量的调节同时发生在转录阶段(DNA $\rightarrow$ RNA) 和翻译阶段(RNA $\rightarrow$ 蛋白质)。


![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1633004050911.png)

因为我们知道不同类型的细胞与不同水平的RNA和蛋白质有关，所以能够在单个细胞的水平上测量这些分子的丰富程度是非常有用的。这不仅让我们对体内不同种类的细胞有了精细的了解，还让我们深入了解了同一组DNA指令是如何在全身被如此不同地解释的。

单细胞基因信息测量的前景是，通过更好地了解这些信息在我们的细胞和组织中是如何流动的，我们可能会更好地了解在疾病的背景下哪里出了问题。

## A rough history of single-cell technologies

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1633004268605.png)

Eberwine等人(1992)首次使用分子探针对单细胞RNA进行了测量。直到2009年，Tang等人描述了单个细胞(小鼠卵裂球)的转录组序列。在接下来的6年里，一些创新被开发出来以提高单细胞RNA测序(scRNA-seq)的吞吐量。也许最具影响力的是由Klein et al. (2015) and Macosko et al. (2015)同时描述了两种 用于将单个细胞捕获到 oil emulsion 的 nanoliter droplets 中的  droplet-based 的协议。有了 droplet-based 的单细胞方法，就有可能用数万个细胞进行实验。

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1633007372169.png)


接下来在单细胞测量的主要创新是  Steockius et al. (2017) and Cao et al. (2018) 引入了多模态单细胞数据， 分别测量RNA和蛋白质 或 chromatin accessibility 和 RNA。 第一种方法叫做 ` Cellular Indexing of Transcriptomes` 和 `Epitopes by Sequencing (CITE-seq)`， 测量每个细胞的所有 RNA 以及 ~10-200个细胞表面markers。 第二种方法， 称作 `Multiome Assay for Transposase-Accessible Chromatin using sequencing (ATAC) + Gene Expression`， 提供一个通过基因组和所有基因的基因表达 测量染色体 accessibility。与 `CITE-seq` 不同， 这种 Multiome technology 提供在细胞中横跨所有 DNA 和 RNA 的一种视角。第二年，Nature Methods将单细胞多模态组学评为2019年度方法，指出这些方法为先进统计和计算方法的发展打开了前所未有的机遇。

令我们兴奋的是，到2021年，我们可以使用强大的商业可用试剂来创建参考基准数据集，以推动多模态单细胞数据集成的创新。


## Measuring multiple modalities in single cells

我们直到 DNA 必须是  accessible 的(ATAC data) 以生产 mRNA (expression data)， 以及 mRNA反过来作为一种模板生产蛋白质(protein abundance)。 这些过程通常是由它们产生的相同分子控制的:例如，一种蛋白质可以结合DNA来阻止更多mRNA的产生。理解这些调控过程对于生物合成和药物发现是革命性的。任何从一种模态预测另一种模态的方法可以解释这些调控过程， 而且对于多模数据的需求表明这是重要的。