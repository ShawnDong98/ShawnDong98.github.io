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

#  LoRRA: Look, Read, Reason & Answer 

##  Implementation Details 

Pythia v0.3 修改了一些超参数 （如 question vocabulary 的大小， hidden dimension）， 并且在 VQA 和 VizWiz 数据集上取得了单模型的 VQA accraucy SOTA。

Pythia 受启发于基于目标检测检测框预测 bottom-up top-down 注意力机制网络(VQA winner 2017) 的方式， 其有和依赖于 grid-base 特征的 VQA 2016 winner 相似的多模态注意力机制 。

在Pythia中，对于空间特征fI(v)，同时依赖于来自图像的基于网格和基于区域特征。基于网格的特征是通过从预训练的ResNet-152[14]的res-5c块平均池化2048D特征得到的。基于区域的特征从改进的Faster-RCNN模型[8]的fc6层提取，该模型训练于Visual Genome[28]对象和[1]中提供的属性。在训练期间，我们微调fc7权重。

我们为question embedding 使用预训练的 GloVe 嵌入与自定义词汇表(在VQA 2.0 中的 top 77k question words)。f_Q模块将GloVe嵌入传递给LSTM[15]和自注意[49]，生成问题的句子嵌入。对于OCR，我们运行Rosetta OCR系统[6]来提供字符串s1, ... , sN。OCR标记首先使用预训练的FastText嵌入 f_O，它甚至可以为OOV tokens 生成单词嵌入。

在f_A中，f_Q(q) 被用来获得对 f_O(s) OCR tokens features 和 f_I(v) image features 的自顶向下的、任务特定的注意力。然后根据注意力权重对特征进行平均，以获得OCR token 和图像特征的最终特征表示。最终的网格级特征和基于区域的特征被 concatenated 在图像特征中。对于 OCR tokens, 注意力权重被 concatenated 到最终的 attended features。 f_comb(x, y) 两个特征嵌入被使用暗元素的 probduct 融合。来自 f_OCR(s, q) 的融合特征 和 拼接的特征 f_VQA(v, q) 被传一个 MLP 产生 logits， 最后产生answer。

# Conclusion

这篇文章探索了回答和推理图像中的文本问题， 以帮助视障人士。

引入了 TextVQA 数据集， 其包含仅可以通过图像中的文本进行推理进行回答的问题。

引入了 LoRRA(Look, Read, Reason & Answer) 模型结构基于图像中的文本回答问题。

LoRRA 读取图像中的文本， 基于所提供的的问题进行推理， 并且根据固定的此表或者图像中发现的文本预测答案。

LoRRA 与底层的 OCR 和 VQA 模块无关。

LoRRA 在 TextVQA 数据集上比 SOTA VQA 模型表现更好。