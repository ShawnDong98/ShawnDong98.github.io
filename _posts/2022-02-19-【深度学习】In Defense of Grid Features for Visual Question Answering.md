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