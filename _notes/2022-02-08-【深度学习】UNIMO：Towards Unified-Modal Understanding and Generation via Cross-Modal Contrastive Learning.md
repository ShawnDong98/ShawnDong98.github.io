---
layout:     post
title:      "【深度学习】UNIMO: Towards Unified-Modal Understanding and Generation via Cross-Modal Contrastive Learning"
subtitle:   ""
date:       2022-02-08
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - 
---

# Abstract
现有的预训练方法要么专注于单模态任务要么专注于多模态任务。

这篇文章提出一种叫做 UNIMO 的预训练结构， 其能有效地适应单模态和多模态理解与生成任务。

使用大规模的文本语料库和图像库提升视觉和文本理解的能力， 跨模态对比学习用于对齐文本和视觉信息到一个联合语义空间。

通过丰富的非成对的单模态数据， 模型能够学习更泛化性的表征， 使文本知识和视觉知识在统一语义空间中相互增强。
# Conclusion

这篇文章提出一个叫做 UNIMO 的联合多模态预训练结构， 利用大规模非成对文本和图像用以跨模态学习。

UNIMO提供一种文本知识和视觉知识在统一语义空间中相互增强的方法。

通过这种方法， UNIMO 同时在单模态和多模态下游任务上超出之前的方法。