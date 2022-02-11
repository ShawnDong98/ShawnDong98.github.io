---
layout:     post
title:      "【深度学习】Scene Graph Generation from Objects, Phrases and Region Captions"
subtitle:   ""
date:       2022-02-11
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - Scene Graph
---

# Abstract
目标检测， 场景图生成和区域描述是场景理解任务不同的语义层次： 

- 场景图的生成基于图像中检测处的目标以及他们预测的成对的关系 
- 区域描述是给出目标，他们的属性，关系以及其他上下文的描述。

这篇文章利用跨语义层次的相互联系， 提出一种新的端到端网络(Multi-level Scene Description Network, MSDN)，  同时解决三个视觉任务。

object， phrase 和 caption 首先基于它们的空间位置和语义联系使用动态图对齐。然后使用一个 feature refine 结构通过 graph 在三个语义层次传递信息。



# Conclusion