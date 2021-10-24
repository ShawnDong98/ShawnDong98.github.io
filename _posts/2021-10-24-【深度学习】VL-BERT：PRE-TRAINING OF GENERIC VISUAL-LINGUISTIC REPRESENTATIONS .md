---
layout:     post
title:      "【深度学习】VL-BERT：PRE-TRAINING OF GENERIC VISUAL-LINGUISTIC REPRESENTATIONS "
subtitle:   ""
date:       2021-10-24
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - 
---


# ABSTRACT

我们引入一种新的用于视觉-语言任务的预训练表征方法， 叫做Visual-Linguistic BERT(VL-BERT)。 VL-BERT采用了简单但功能强大的Transformer模型作为主干，并对其进行了扩展，以视觉和语言嵌入特性作为输入。其中，输入的每个元素要么是来自输入句子的一个单词，要么是来自输入图像的感兴趣区域(RoI)。它被设计用于大多数视觉-语言下游任务。为了更好地利用通用表征，我们在大规模 Conceptual Captions 数据集和纯文本语料库上对VL-BERT进行预训练。广泛的实证分析表明，预训练过程能够更好地整合视觉-语言线索，并有利于后续任务，如visual commonsense reasoning、 visual question answering和referring expres-sion comprehension。