---
layout:     post
title:      "【深度学习】VISUALBERT: A SIMPLE AND PERFORMANT BASELINE FOR VISION AND LANGUAGE "
subtitle:   ""
date:       2022-03-03
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - 
---

# Abstract
VisualBERT 由一组 tran是former 层堆叠而成， 其通过自注意力机制隐式对齐输入文本和输入图像的区域。

进一步在 image caption 数据上对预训练 VisualBert  提出了两个 visual-ground 语言模型目标。

在四个视觉语言任务上的实验表明， VisualBert 显著超过了之前的SOTA。

进一步的分析表明，Vi-sualBERT可以在没有任何明确监督的情况下，将语言元素与图像区域相结合
# Conclusion

这篇文章提出了一种用于视觉语言联合表征的预训练模型， 叫做 VisualBERT。

尽管VisualBERT很简单， 它在四个任务上都有很强的表现。

进一步的分析表明，该模型使用注意机制以一种可解释的方式捕获信息。

未来考虑将 VisualBERT 拓展到仅视觉的任务上，比如场景图解析和场景识别。

在更大的数据集上预训练VisualBERT 也是一个方向。