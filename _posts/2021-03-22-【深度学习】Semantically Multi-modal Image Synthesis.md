---
layout:     post
title:      "【深度学习】Semantically Multi-modal Image Synthesis"
subtitle:   ""
date:       2021-03-22
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - GAN
---


# Abstract

在本文中，我们专注于语义多模态图像合成（SMIS）任务，即在语义级别生成多模态图像。先前的工作试图使用多个特定于类的生成器，以限制其在具有少量类的数据集中的使用。我们进一步提出了一种新颖的组减少网络（GroupDNet），它利用生成器中的组卷积并逐渐减少解码器中卷积的组数。因此，GroupDNet在将语义标签转换为自然图像方面具有更大的可控性，并且对于具有多个类的数据集具有合理的高质量收益。在几个具有挑战性的数据集上进行的实验证明了GroupNet在执行SIMS任务方面的优越性。我们还表明GroupDNet能够执行各种有趣的综合应用程序。 可以在以下位置找到代码和模型：[https://github.com/Seanseattle/SMIS](https://github.com/Seanseattle/SMIS)。


# Introduction

语义图像合成（Semantic image synthesis）是一种将语义标签转换为自然图像的方法，在现实生活中有着广泛的应用，受到了社会各界的广泛关注。它本质上是一个一对多映射问题。无数可能的自然图像对应于一个单一的语义标签。以前的工作采用了不同的策略：采用变分自动编码器的思想\[36，56，2，11\]，在训练时引入噪声\[19\]，构建多个子网络\[10\]，包括实例级特征嵌入\[41\]等。

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1616423714180.png)

Figure 1： 语义多模态图像合成（SMIS）任务的演示。图像上方每列的文本表示整个列中正在变化的语义区域。第一行代表输入标签，其余行是通过我们的方法生成的图像。

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1616423829525.png)

Figure 4： GroupDNet与其他基准模型之间的定性比较。前两行表示通过更改其上衣隐编码的不同模型的结果，而后两行表示其在更改裤子隐编码的结果。请注意，对于那些没有类特定控制器的模型（例如VSPADE），我们将更改其整体隐编码以生成不同的图像。

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1616424144322.png)


Figure 5： 与SOTA标签到图像方法的定性比较。图像从上到下分别代表在DeepFashion，Cityscapes和ADE20K上进行的实验。


![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1616424225616.png)

Figure 6： 所提出方法的典型应用。 (a) 演示语义多模式图像合成（SMIS）任务。(b) 我们的SMIS模型在外观混合中的应用。 我们的模型从不同的来源提取不同语义类别的风格，并通过将这些语义风格与给定的语义mask组合来生成混合图像。(c) 我们的SMIS模型在语义处理中的应用。(d)我们的SMIS模型在图像外推中的应用。

