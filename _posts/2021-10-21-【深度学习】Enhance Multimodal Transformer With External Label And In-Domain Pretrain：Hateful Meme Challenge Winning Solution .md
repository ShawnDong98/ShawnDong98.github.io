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

