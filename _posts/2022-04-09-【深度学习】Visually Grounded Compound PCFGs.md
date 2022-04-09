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

# Conclusion

