---
layout:     post
title:      "【深度学习】LEMON：Scaling Up Vision-Language Pre-training for Image Captioning"
subtitle:   ""
date:       2022-04-04
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - 
---

# Abstract
近年来我们见证了视觉语言预训练模型对 image captioning 任务的提升。

规模被认为是这一进步的一个重要因素。

然而，现有的大多数工作只侧重于在大约400万张图像上进行中等尺寸(如12层或24层)的预训练 Transformer。

这篇文章提出了一种 LargE-scale iMage captiONer LEMON，并首次对 image captioning 的VLP scaling 行为进行了实证研究。

这篇文章使用最先进的VinVL模型作为参考模型，该模型由一个图像特征提取器和一个 Transformer 模型组成，并对 Transformer 进行上下缩放，模型尺寸从13亿到6.75亿参数。

从web上自动收集的多达2亿个图像-文本对(简称ALT200M)进行实验。

广泛的分析有助于刻画随着模型大小和预训练数据大小增加的性能趋势。

这篇文章还比较了不同的训练方法，特别是针对大规模噪声数据的训练。

因此，LEMON在几个主要的 image captioning 基准上达到了新的 SOTA，包括COCO caption、nocaps和 Conceptual Captions。

最后还展示了当以 zero-shot 方式使用时，LEMON可以生成带有长尾视觉概念的标题。
# Conclusion
这篇文章研究了用于 image captioning 的VLP模型的 scaling 行为，并构建了自己的大型数据集ALT200M。

实验表明，扩大预训练可以显著提高下游 captioning 任务。

LEMON 已经在多个基准上实现了新的 SOTA，包括COCO caption，nocaps，和 Conceptual Caption。

LEMON还具有可以识别各种各样的长尾视觉对象的令人印象深刻的能力，甚至以 zero-shot 的方式。

此外，对大型 Transformer 模型的研究表明，当可获得的训练数据大于数量级时，模型容量往往是瓶颈。

利用互联网上大量的图文数据来训练一个大模型是非常有前景的方向。
