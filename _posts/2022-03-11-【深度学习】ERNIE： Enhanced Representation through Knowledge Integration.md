---
layout:     post
title:      "【深度学习】ERNIE: Enhanced Representation through Knowledge Integration"
subtitle:   ""
date:       2022-03-11
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - 
---

# Abstract
这篇文章提出一种由知识增强的语言表征， 叫做 ERNIE(Enhanced Representation through Knowledge Integration)。

受BERT (Devlin et al.， 2018)  mask 策略的启发，ERNIE被设计通过知识 mask 策略来学习增强的语言表示，包括 entity-level mask 和 phrase-level mask。entity-level mask 了通常由多个单词组成的entity。phrase-level mask 整个短语，它由几个单词组成一个概念单元。

实验表明 ERNIE 比baseline 模型更好， 其取得了中文自然语言处理任务的 SOTA。

最后， ERNIE 在cloze 测试上有强大的知识推理能力。

# Conclusion

这篇文章提出了一种将知识整合到预训练语言模型中的新方法。

在五个中文语言处理任务上的表现都超过了BERT。

这篇文章还证实了 knowledge integration 和对 heterogeneous 数据的预训练都能使模型获得更好的语言表示。

未来将把其他类型的知识整合到语义表示模型中，例如使用句法分析或来自其他任务的弱监督信号。