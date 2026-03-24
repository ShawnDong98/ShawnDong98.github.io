---
layout:     post
title:      "【深度学习】ORDERED NEURONS: INTEGRATING TREE STRUCTURES INTO RECURRENT NEURAL NETWORKS "
subtitle:   ""
date:       2022-03-27
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - 
---

# Abstract

自然语言是层次结构的:较小的单元(如短语)嵌套在较大的单元(如子句)中。

当一个较大的组成部分结束时，所有嵌套在其中的较小组成部分也必须关闭。

虽然标准的LSTM体系结构允许不同的神经元在不同的时间尺度上跟踪信息，但它并没有明确地偏向于建模成分的层次结构。

这篇文章提出通过对神经元进行排序来增加这种归纳偏置; master input 和遗忘门的向量保证了当一个给定的神经元被更新时，所有跟随它的神经元也按顺序被更新。

这篇文章的新循环架构，ordered neurons LSTM (on -LSTM)，在四种不同的任务上都取得了良好的性能:语言建模、无监督解析、有针对性的句法评估和逻辑推理。


# Conclusion

在本文中，我们提出了有序神经元，一种新的循环神经网络的归纳偏置。

在此基础上，我们提出了一种新的循环单元on - lstm，它包括一个新的门控机制和一个新的激活函数cumax()。

通过分别分配隐藏状态神经元的长期和短期信息，这使得循环神经网络更接近于执行树状组成操作。

模型在无监督成分解析中的性能表明，on - lstm以一种与人类专家注释一致的方式归纳了自然语言的潜在结构。

归纳偏置也使on - lstm能够在语言建模、长期依赖关系和逻辑推理任务上取得良好的性能。