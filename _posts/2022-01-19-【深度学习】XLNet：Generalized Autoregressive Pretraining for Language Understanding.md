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

