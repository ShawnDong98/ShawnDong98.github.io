---
layout:     post
title:      "【深度学习】In Defense of Grid Features for Visual Question Answering"
subtitle:   ""
date:       2022-02-19
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - 
---

# Abstract

最近基于区域的 bottom-up 特征的表现在VQA 任务上已经超过了基于网格的卷积特征。然而，目前还不清楚是否是 region 的优势是 bottom-up attention 成功的关键原因。

这篇文章重新审视了VQA 中的网格特征，并且发现它工作地很好， 而且相同准确率下速度更快。

通过大量的实验证实了这一观察结果在不同的VQA模型、数据集上都是正确的，并且可以很好地推广到其他任务，比如 captioning。

由于网格特征使模型设计和训练过程更加简单，这使得我们能够端到端地训练它们，并使用更灵活的网络设计。

从像素直接到答案直接学习端到端VQA模型，并表明在训练前不使用任何区域标注也可以实现强大的性能。
# Conclusion

这篇文章重新审视网格特征，将其作为广泛应用于视觉和语言任务的自底向上区域特征的替代方案。

他们可以取得不同VQA 任务上， 不同模型上甚至image captioning 上取得相同的结果。

由于跳过了 pipeline 中与区域相关的计算成本高昂的瓶颈，我们看到了显著的加速，通常比依赖区域的现有系统的速度快一个数量级。

实验表明，比起特征的格式(regionvs， grids)，特性表示的语义内容对于其有效性更为关键。

这种有效的表征可以通过在 目标和属性数据集上(如VG)预训练得到， 更重要的是， 可以通过直接对网格特征端到端地训练。

端到端地训练对于网格特征很容易， 对于区域特征并不简单。