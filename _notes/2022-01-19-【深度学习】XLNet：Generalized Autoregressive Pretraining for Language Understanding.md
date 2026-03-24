---
layout:     post
title:      "【深度学习】XLNet：Generalized Autoregressive Pretraining for Language Understanding"
subtitle:   ""
date:       2022-01-19
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - NLP
---

# Abstract

由于有双向建模上下文的能力， 基于预训练的去噪自编码比基于自回归语言建模的预训练方法取得了更好的性能。 

然而， 依赖于使用mask破坏输入， BERT 忽略了mask 位置和预训练-微调差异 的依赖关系。

鉴于这些利弊，我们提出了XLNet，一种具有泛化性的自回归预训练方法， 该方法：

- 通过最大化所有 permutations of the factorization order 的期望似然来实现双向上下文的学习
- 由于其自回归的的特性，克服了BERT的局限性

进一步， XLNet 将 Transformer-XL 的思想引入预训练。


# Conclusion

XLNet 是一种具有泛化性的自回归预训练方法， 它使用全排列语言建模目标来结合自回归和自编码方法的优势。

XLNet 的网络架构与自回归目标无缝结合， 包括集成了 Transformer-XL 和双向注意力机制。