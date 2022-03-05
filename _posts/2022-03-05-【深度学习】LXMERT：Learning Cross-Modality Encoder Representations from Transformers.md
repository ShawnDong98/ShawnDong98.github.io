---
layout:     post
title:      "【深度学习】LXMERT: Learning Cross-Modality Encoder Representations from Transformers"
subtitle:   ""
date:       2022-03-05
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - 
---

# Abstract
视觉和语言推理需要理解视觉概念、语言语义，以及最重要的，这两种模态之间的对齐和关系。

这篇文章提出了LXMERT(Learning Cross-Modality Ebcoder Representations from Transformers)框架来学习这些视觉和语言的联系。

LXMERT构建了一个大规模的Transformer模型，该模型由三个编码器组成:对象关系编码器、语言编码器和跨模态编码器。

为了赋予模型连接视觉和语言语义的能力，使用大量的图像和句子对对模型进行预训练，通过五个不同的具有代表性的预训练任务:掩码语言建模、掩码对象预测(特征回归和标签分类)、跨模态匹配和图像问题回答。
# Conclusio