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
# Conclusion

