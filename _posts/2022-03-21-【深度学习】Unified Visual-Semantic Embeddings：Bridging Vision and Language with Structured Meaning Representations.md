---
layout:     post
title:      "【深度学习】Unified Visual-Semantic Embeddings: Bridging Vision and Language with Structured Meaning Representations"
subtitle:   ""
date:       2022-03-21
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - 
---

# Abstract

这篇文章提出一种联合 视觉-语义嵌入(VSE) 以学习视觉表征和文本语义的联合空间。

模型统一不同层级的概念的嵌入： 目标、属性、关系和全场景。

将文本语义视为不同语义成分， 比如目标和关系的组合； 使用不同图像区域对齐它们的嵌入。

其提出一种对比学习方法用于从图像-描述对中有效地学习细粒度的对齐。

证明了统一VSE在跨模态检索任务上优于基线;语义覆盖的加强提高了模型抵御文本域对抗攻击的鲁棒性。

此外，模型增强了视觉线索的使用，以准确地解决新句子中的词依赖关系。
# Conclusion

这篇文章提出一种联合 视觉-语义嵌入 方法以一种因子分解的方式学习一个视觉和语言的联合表征空间： 不同文本语义成分的层级包括对齐到图像区域的目标和关系。