---
layout:     post
title:      "【深度学习】X-LXMERT: Paint, Caption and Answer Questions with Multi-Modal Transformers"
subtitle:   ""
date:       2022-03-04
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - 
---

# Abstract
与掩码语言模型的成功相呼应，VILBERT、LXMERT和UNITER等视觉和语言模型在多种多模态判别任务(如视觉回答和视觉背景)上都取得了最先进的性能。

最近的工作也将这些模型用于 image captioning 的生成任务。

这引出了另外一个问题， 这些模型能否从文本中生成图像？

我们对LXMERT模型家族中一个受欢迎的代表进行了分析，发现它无法用当前的训练设置生成丰富的、语义上有意义的图像。

X-LXMERT拓展了 LXMERT,  改善了训练过程： 离散化视觉表征， 在大范围的 mask 比例使用统一 masking， 并且将预训练数据集与目标对齐， 这使得它能够 paint。

X-LXMERT的图像生成能力可与最先进的生成模型相媲美，而其问答和字幕功能仍可与LXMERT相媲美。

最后，我们通过在UNITER中添加图像生成功能来产生 X-UNITER，来演示这些训练改进的通用性。
# Conclusion

这篇文章发展了一种 probing 机制， 并且发现视觉语言 Transformer 模型LXMERT不能以文本为条件生成有意义的图像。

这篇文章引入了X-LXMERT，其可以用于图像生成、captioning、QA和 visual reasoning 的统一模型，并表明此扩展可以很容易地应用于其他视觉和语言 Transformer 模型。