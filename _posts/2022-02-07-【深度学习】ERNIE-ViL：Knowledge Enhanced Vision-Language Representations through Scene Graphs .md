---
layout:     post
title:      "【深度学习】ERNIE-ViL：Knowledge Enhanced Vision-Language Representations through Scene Graphs "
subtitle:   ""
date:       2022-02-07
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - 
---

# Abstract

这篇文章提出一种知识增强方法， ERNIE-ViL， 其将从 scene graph 得到的结构化知识加入学习视觉-语言联合表征中。

ERNIE-ViL 试图建立视觉语言之间的详细的语义连接 (目标、 目标的属性以及目标之间的关系)。

利用视觉场景的 scene graph， ERNIE-Vil 构造 Scene Graph Prediction 任务， 例如预训练阶段的目标预测， 属性预测和关系预测任务。

这些预测任务通过预测从句子中解析的场景图的不同节点实现。

因此， ERNIE-ViL 可以跨视觉和语言学习联合表征对详细的语义进行对齐。

# Conclusion
这篇文章提出 ERNIE-ViL 学习视觉和语言的联合表征。

除了传统的 MLM 用于跨模态预训练外， 引入了 Scene graph prediction 任务建模跨模态详细的语义对齐。

在未来， 从图像中提取的 scene graph 也可以被加入跨模态预训练中。

此外， 还可以考虑对结构化知识集成度更高的图神经网络。