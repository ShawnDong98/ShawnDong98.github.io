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

# Conclusion