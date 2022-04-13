---
layout:     post
title:      "【深度学习】Compound Probabilistic Context-Free Grammars for Grammar Induction"
subtitle:   ""
date:     2022-04-13  
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - 
---


# Abstract

这篇文章研究语法归纳问题的形式化，该问题将句子建模为由复合概率上下文无关语法生成的句子。

与学习单一随机语法的传统公式不同，这篇文章的语法规则概率是由每个句子的连续潜变量调制的，这导致了超出传统上下文无关假设的边际依赖性。

该语法采用 collapsed variational inference，将amortized 变分后验置于连续变量上，用动态规划 marginalized out 潜在树。

在英语和中文的实验结果表明在使用无监督 parsing 评估时，所提方法相比于 SOTA 有效性。
# Conclusion
这篇文章研究了一种基于神经网络的PCFG语法归纳方法。

首先提出用神经网络参数化潜符号的分布表示，并发现这种神经网络能够通过简单的最大似然学习归纳出具有语言意义的语法。

然后，通过一个句子级的连续潜在向量扩展神经PCFG，在传统的一阶上下文无关假设的基础上引入边缘相关性。

我们表明，这种复合PCFG能够学习更丰富的语法，并在作为无监督解析器进行评估时提高性能。

collapsed amortized 变分推理方法具有通用性，可用于通过部分条件作用进行可处理推理的生成模型。


学习具有这种条件马尔可夫特性的深层生成模型是未来工作的一个有趣的方向。