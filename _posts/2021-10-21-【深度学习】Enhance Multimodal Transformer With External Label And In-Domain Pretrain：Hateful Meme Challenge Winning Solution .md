---
layout:     post
title:      "【深度学习】Enhance Multimodal Transformer With External Label And In-Domain Pretrain: Hateful Meme Challenge Winning Solution "
subtitle:   ""
date:       2021-10-21
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - 
---


# Abstract

Hateful meme detection 是一个最近的新的研究领域， 它需要视觉和语言上对 meme 的理解，以及一些背景知识来完成任务。这份技术报告总结了  Hateful Meme Detection Challenge 2020 的第一名解决方案，它拓展了 state-of-the-art visual-linguistic trans-formers 来解决这个问题。在报告的最后，我们还指出了不足之处和改进目前方法的可能方向。

# Introduction

Hateful Memes Challenge 引入了一个多模数据集。 尽管最近在多模态推理方面取得了进步，但在将最先进的多模态模型应用于这一挑战时，我们仅得到0.71 AUROC，远远落后于非专业的人类表现。本文讨论了常见的多模态推理任务与 meme classication 的区别。我们的方法在现有视觉语言模型的基础上提高了性能，在 hateful memes detection 数据集上获得了0.845 AUROC。

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1634803733374.png)

# Problem Description

在典型的视觉-语言多模态数据集中，图像与文本输入之间存在直接关系。Hateful memes 有其独特的特征，与通常的多模态数据集有很大的不同。与VCR和VQA等任务的多模态数据集相比，只有部分数据集与普通多模态下游任务和预训练数据集存在直接关系。大多数时候，表情包的 meme 部分与微妙的措辞或外界对现实事件的知识有关。从这个意义上说，hateful memes challenge 更像是一个视觉-语言-知识的多模态分类问题。


此外，hateful memes 建立在不同的主题上，通常包含没有现成的分类器能识别的新物体，这与在典型的多模态数据集中呈现的日常物体有很大不同。例如injury， traditional costume wear by the subject，  historical scenes等视觉暗示难以识别并且样本数量少。这些因素使视觉理解成为挑战的一部分，即使没有语言部分也很难解决。视觉模态上下文对 meme 的极性有巨大的影响。因为即使是最先进的图像分类器或对象检测器， 视觉提示也是很难识别的，合并来自不同来源和格式的信息变得至关重要。

在某些情况下，meme 标题的位置也会影响 meme 的意义。例如，故意把 \wishing machine"  的标题放在女性主题上，会让表情包 meme hateful，但如果我们把标题放在其他任何不是人类的东西上就不会。这在一般的视觉语言模型中并不常见。