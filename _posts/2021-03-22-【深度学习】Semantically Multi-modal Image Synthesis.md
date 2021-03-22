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


![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1616423714180.png)

Figure 1： 语义多模态图像合成（SMIS）任务的演示。图像上方每列的文本表示整个列中正在变化的语义区域。第一行代表输入标签，其余行是通过我们的方法生成的图像。