---
layout:     post
title:      "【深度学习】SPICE: Semantic Propositional Image Caption Evaluation"
subtitle:   ""
date:       2021-07-26
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 
    - 
---


# Abstract


现存的自动评估标准主要对n-gram overlap敏感， 这对于模拟人类评估既没有效率也不必要。

我们假设 semantic propositional content 是人类caption评估重要组成部分， 基于scene graph提出一种新的自动描述评价标准。

# Introduction

使用BLEU、ROUGE、CIDEr或者METEOR等评价指标测试captions的问题之一是这些metrics主要是对 n-gram overlap敏感的。

比如：

(a) A young girl standing on top of a tennis court. 

(b) A giraffe standing on top of a green  field. 

两个描述完全不同， 但是得分是相似的。

假设 semantic propositional content 是 人类caption评估的重要组成成分之一。

通过同时将 candidate 和 reference  转换为scene graph的基于图的语义表征 来 评估caption的质量。

为了将image caption分解为scene graph， 我们需要一种两阶段的方式。

在第一阶段， 使用在大数据集上预训练的 dependency parser 建立 caption 词之间的语法依存关系。