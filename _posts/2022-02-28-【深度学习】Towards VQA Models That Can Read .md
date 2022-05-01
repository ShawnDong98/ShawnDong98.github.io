---
layout:     post
title:      "【深度学习】Towards VQA Models That Can Read "
subtitle:   ""
date:       2022-02-28
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - 
---

# Abstract
研究表明， 视障人士问的最主要的问题是图像中所包含的文字。

这篇文章引入一种 TextVQA 数据集来促进这个问题的发展。

VQA数据集中关于文本的问题太少， 而VizWiz数据集太小。

TextVQA 包含 45336 个对 28408 图像的问题。

其次， 这篇文章提出了一种新的结构， 其能够阅读图像中的文本， 根据问题和图像中的上下文进行推理， 并且预测答案。

因此， 将该方法叫做 LoRRA(Look, Read, Reason 和 Answer)， LoRRA 在 TextVQA 数据集上比现有 SOTA VQA 模型表现更好。

# Related work

**Copy Mechanism.** 我们提出的模型的一个核心组件是它能够决定问题的答案是应该是图像中检测到的OCR标记，还是OCR标记只应该通知问题的答案。前者的实现叫做 "copy mechanism"。 我们的 copy mechanism 是基于指针生成器网络[11,39,32,12,34]上的一系列工作。一种 copy mechanism 为网络提供了生成词汇外单词的能力，方法是在上下文中指向一个单词，然后复制它作为答案。这种方法被用于各种NLP任务， 如 summarization, question answering, langage modelling, neural machine translation 和 dialog。

# Conclusion

这篇文章探索了回答和推理图像中的文本问题， 以帮助视障人士。

引入了 TextVQA 数据集， 其包含仅可以通过图像中的文本进行推理进行回答的问题。

引入了 LoRRA(Look, Read, Reason & Answer) 模型结构基于图像中的文本回答问题。

LoRRA 读取图像中的文本， 基于所提供的的问题进行推理， 并且根据固定的此表或者图像中发现的文本预测答案。

LoRRA 与底层的 OCR 和 VQA 模块无关。

LoRRA 在 TextVQA 数据集上比 SOTA VQA 模型表现更好。