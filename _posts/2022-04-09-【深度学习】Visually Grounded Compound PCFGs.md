---
layout:     post
title:      "【深度学习】Visually Grounded Compound PCFGs"
subtitle:   ""
date:     2022-04-09  
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - 
---

# Abstract

利用 visual grounding 进行语言理解近年来备受关注。

这篇文章研究了 Visually grounded 语法归纳，并从无标记文本和其视觉基础中学习了一个 continuency parser。

现有的工作(Shi et al.， 2019)通过REINFORCE优化了解析器，并仅从图像和句子的对齐中获得学习信号。

虽然他们的模型总体上是相对准确的，但其错误分布非常不均匀，在某些成分类型上表现较差(例如，对动词短语、VPs的召回率为26.2%)，而在其他成分类型上表现较高(例如，对名词短语、NPs的召回率为79.6%)。


这并不奇怪，因为学习信号可能不足以获得短语结构语法的所有方面，而且梯度估计是嘈杂的。

此外，这使我们能够用语言建模目标来补充图像-文本对齐损失。

在MSCOCO test captions上，模型建立了一种新SOTA，优于 non-grounded 版本，从而证实了visual grounding 在 contituency 语法归纳中的有效性。

# Conclusion

这篇文章提出了 visually-grounded compound PCFGs(VC-PCFGs)学习框架，并推广了 visual grounded 的语法学习框架。

VC - PCFG 通过对比学习利用 visual groundings，学习信号来自最小化图像-文本对齐损失。

为了解决单纯基于协议的学习导致的错误和学习信号不足的问题，提出用一个定义在无标签文本上的对齐损失来补充图像-文本对齐损失。

使用 Compound PCFG，使我们能够用语言建模目标补充对齐损失，从而实现完全可微的端到端 visual grounding 学习。

实验表明，VC - PCFG 优于那些只通过 visual grounding 学习或只依赖文本训练的模型。