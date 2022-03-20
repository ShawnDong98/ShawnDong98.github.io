---
layout:     post
title:      "【深度学习】ERNIE-M: Enhanced Multilingual Representation by Aligning Cross-lingual Semantics with Monolingual Corpora"
subtitle:   ""
date:       2022-03-20
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - 
---

# Abstract

最近的研究表明，预训练的跨语言模型在下游跨语言任务中取得了令人印象深刻的表现。

这种提升受益于学习大量的多种语言的语料库。

虽然人们普遍认为并行语料库对提高模型性能至关重要，但现有的方法经常受到并行语料库大小的限制，特别是对于少见的语言。


这篇文章提出了一种新的训练方法ERNIE-M，它鼓励模型将多语言表示与单语语料库对齐，以克服并行语料库大小对模型性能的限制。

核心思想是将 back-translation 加入到预训练过程中。 只做了一个 pesudo-label 多种语言的并行句子对语料库， 使得模型可以在不同语言之间学习语义对齐， 以此提升跨语言模型的语义建模。

实验结果表明，ERNIE-M在不同的跨语言下游任务中，性能优于现有的跨语言模型，并提供了新的最先进的结果.


# Conclusion

为了克服平行语料库大小对跨语言模型性能的制约，这篇文章提出了一种新的跨语言模型ERNIE-M，该模型同时使用单语和平行语料库。