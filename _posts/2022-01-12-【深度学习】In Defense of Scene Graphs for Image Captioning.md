---
layout:     post
title:      "【深度学习】In Defense of Scene Graphs for Image Captioning"
subtitle:   ""
date:     2022-01-12  
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - Scene Graph
---

# Abstract

几个研究指出简单将Scene Gragh 当做黑盒使用会损害 image captioning 的性能， 基于scene graph 的 captioning 模型会过于挖掘图像特征导致难以生成得体的句子。

提出一个框架SG2Caps仅仅使用scene graph 标签生成有竞争力的 image captioning 性能。

基本的思想是拉进两个scene graph 的语义鸿沟， 一个来自图像一个来自句子。

为了达到这个目标， 我们利用了目标的空间位置以及 Human-Object-Interaction(HOI) 标签作为额外的 HOI graph。

直接利用 scene graph 标签避免了在高维CNN特征上卷积的代价， 减少了49%的可训练参数。

# Introduction

主流的 image captioning 模型依赖于图像卷积特征 以及对显著区域的注意力 以及 目标 通过循环模型生成 captions。

几乎没有工作报告使用 scene graph 提升生成 caption 的性能， 同时有几个工作强调仅仅使用 scene graph 会产生较差的 captioning 结果 并且会损害 captioning 的性能。

包含节点和边的 Scene Graph 表征可以通过两种方式获得： 1) Visual Scene Graph(VSG) 2) 基于规则的语义解析得从句子中得到 Textual Scene Graph(TSG)。 Scene graph 生成以及用于 image captioning 的文献主要指 VSG 表征

为了利用 scene graph 生成描述， 我们需要 VSG-Caption 标注对。

现在的方法在 Visual Genome 数据集上训练 VSG 生成器， 在 COCO-captions 数据集上训练 TSG 来生成 caption， 最后将在VG上训练的 VSGs 转换为 captions 一边随后使用。

这种方法有两个问题：

- VG 上训练的 VSGs 特定关系特别多(has, on等)， 关系的分布是一个长尾分布， 即便是最好性能的 VSG 生成器也不能准确地学习到有意义的关系。 这导致 VSGs 中的噪声， 进而导致损害 captions 的性能。 
- 现有的方法存在一种假设， 即 TSGs 和 VSGs 是分庭抗礼的。 然而，当以 VSG 作为输入的时候， 能够生成很好性能的描述。语言偏置并不能从 TSG 迁移到 VSG 上。

为了解决上述问题， 我们提出几种新的方法来提升 VSGs 的captioning 的上下文：

- Human-Object Interaction(HOI) information：人类倾向于通过关注人与物的交互来描述涉及到人类的视觉场景，而忽略其他细节。从一幅图像中提取HOI信息，可以提供一种有效的方法来突出其VSG中的显著部分，从而使其更接近其对应的TSG。因此，我们提出利用预先训练的HOI推断作为部分VSGs，其中场景中所有检测到的对象(不限于人类)构成图节点，HOI信息以适当的关系和属性扩充少数相关节点。
- VSG grounding：VSG的每个节点与图像中的目标边界框具有一对一的关联。这种空间信息可以用来捕捉物体之间的关系。在生成场景图的文献中，边界框极大地提高了对象间关系分类性能[18,17]。

相比于现有的工作， 我们没有使用任何图像或者 目标级的视觉特征； 然而，通过利用HOI信息和VSG grounding，我们实现了具有竞争力的描述生成性能。

研究人员已经表明，由于固有的数据集偏差和无法获得高质量的人工标注，图像描述生成算法的结果不太准确。

SG2Caps模型利用了来自 image captioning 数据集之外的其他来源的额外标注，从而减少了NLP偏差。

我们的贡献总结如下：

- 我们表明，在 coco-caption 数据集上，仅使用VSG就可以实现有竞争力的标题性能，而不需要任何视觉特征。
- 实验结果表明，VSG和TSG在描述生成过程中并不能分庭抗礼，因此提出了改进 VSG 到 captioning 的可学习的转换。
- SG2Caps 利用 VSG 的空间位置 和 HOI 信息从 VSGs 生成更好的描述。节点位置有助于识别对象之间有意义的关系(结果在CIDEr得分中增加5分)。HOI抓住了自然语言交流的本质(在CIDEr得分中获得7分)。因此，它们有助于缩小TSG和VSG之间的语义差距，从而实现image captioning。
- 为 SG2Caps 添加一种轻量化的如何视觉特征的策略。低维的全局视觉特征可以作为VSG 的一个节点， 进一步提升仅用 scene graph 模型的性能。

# Related Work

**Image Captioning**：主流的 image captioning 模型直接将卷积图像特征送到一个循环网络生成自然语言。此类图像描述模型中的自顶向下方法依赖于基于注意力的深度模型[13,15,31,24]。基于上下文的注意力， 将其应用于一层或多层 CNN 的输出。使用目标检测计算目标级的自底向上的注意力。这种自底向上的注意力机制是很多视觉-语言任务的SOTA。

**VSG in image captioning:** 许多研究[27,7,18,23,28,11,33]设计了一些方法，力求在基准VG数据集[8]上实现VSG生成任务。最近的一些研究[32,30,6,21,25,10]介绍了VSG(除了视觉特征)的使用，希望对对象属性和关系进行编码可以改善image captioning。一些工作用了隐式场景图表示[32,5]，而另一些作品则探索了关系和属性的显式表示[30,21,14,9]。显式场景图方法是将视觉神经网络特征与图像或物体的CNN特征相结合。这种显式的场景图方法将场景图生成器作为黑箱使用。例如，Wang等人[21]利用了 FactorizableNet[11]，有人[30,6,35]利用了Motif Net[33]，有人[10,14]利用 Iterative Mes-sage Passing[23]作为黑盒场景图生成器。

研究人员发现，单靠VSG的字幕效果很差。最近，一项深入的研究认为，正是VSG中的噪声(往往是关系)损害了图像描述性能[14]。



# Conclusion

发掘目标、属性和关系的编码对 image captioning 来说是有用的信息。 然而， 盲目地使用 visual scene graph 生成 句子难以生成合理的句子描述。 

所提出的 SG2Caps pipeline 使得预训练网络用于：

- SGDet 在其它 scene graph 数据集上 
- 大幅减小 HOI 数据集 和 COCO caption 数据集的 语义角色 的鸿沟——表明强大的 captioning 模型可以仅通过低维的目标和关系标签空间得到。