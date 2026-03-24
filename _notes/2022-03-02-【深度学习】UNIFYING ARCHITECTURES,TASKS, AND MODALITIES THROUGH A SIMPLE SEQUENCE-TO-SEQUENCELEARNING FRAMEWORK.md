---
layout:     post
title: 【深度学习】UNIFYING ARCHITECTURES,TASKS, AND MODALITIES THROUGH A SIMPLE
  SEQUENCE-TO-SEQUENCELEARNING FRAMEWORK
subtitle:   ""
date:       2022-03-02
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - 
---


# Abstract

这篇文章追求一种多模态预训练的联合范式， 其打破复杂任务/特定模态定制化的桎梏。

提出了OFA，一种统一的多模态预训练模型，它将联合模态(如跨模态、视觉、语言)和任务(如图像生成、视觉背景、图像定位、图像分类、文本生成等)统一到基于编码器-解码器架构的简单序列-序列学习框架中。

OFA使用任务指令执行预训练和微调，并没有引入额外的特定于任务的层来进行微调。

通过大量的分析，证明了OFA在单模态任务(包括NLU、NLG和图像分类)中与单模态预训练模型(如BERT、MAE、MoCo v3、SimCLR v2等)相比具有相当的性能，并且它能有效地转移到没有见过的任务和域。


# Conclusion

这篇文章提出一种任务无关和模态无关的框架以支持综合性任务， 叫做 OFA。

OFA实现了架构、任务和模态的统一，因此能够多模态和单模态理解和生成，而不需要额外的层或特定于任务。

实验表明 OFA 在 image captioning, test-to-image generation, VQA, SNLI-VE 和 referring expression conprehension 上创建了新SOTA。

OFA 在 GLUE， abstractive summarization, 和 image classifacation 上都能够取得与单模态预训练模型有竞争力的表现。

最后提供了 zero-shot learning 进而 domain & task transfer 的分析， 以进一步验证预训练任务的有效性。