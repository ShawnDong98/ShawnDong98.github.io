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

