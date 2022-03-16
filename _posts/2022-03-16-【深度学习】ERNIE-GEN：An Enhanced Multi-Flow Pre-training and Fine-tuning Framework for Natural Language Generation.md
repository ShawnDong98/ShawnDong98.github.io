---
layout:     post
title:      "【深度学习】ERNIE-GEN: An Enhanced Multi-Flow Pre-training and Fine-tuning Framework for Natural Language Generation"
subtitle:   ""
date:       2022-03-16
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - 
---

# Abstract
当前自然语言生成的预训练工作对下游任务的暴露偏差问题关注较少。

为了解决这一问题，我们提出了一种增强的多流序列预训练和微调框架ERNIE-GEN，该框架通过 infilling 生成机制和噪声感知生成方法来弥补训练和推理之间的差异。

为了使生成更接近于人类的书写模式，该框架引入了一个跨层生成流，该流训练模型不断地预测  semantically-complete span，而不是逐字预测。

与现有的预训练方法不同，ERNIE-GEN融合了多粒度的目标采样来构造预训练数据，增强了编码器和解码器之间的相关性。

实验结果表明，在一系列语言生成任务中，ERNIE-GEN以更少的预训练数据和参数获得了最先进的结果。
# Conclusion

这篇文章提出了一种增强的多流seq2seq预训练和微调框架ernie - gen用于语言生成，该框架结合了 infilling 生成机制和噪声感知生成方法来缓解暴露偏差。

此外，ernie - genin集成了一个新的 span-by-span 生成任务，训练模型生成类似于人类写作的文本，进一步提高了下游任务的性能。

