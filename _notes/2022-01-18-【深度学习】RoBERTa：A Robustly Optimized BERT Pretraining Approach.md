---
layout:     post
title:      "【深度学习】RoBERTa: A Robustly Optimized BERT Pretraining Approach"
subtitle:   ""
date:       2022-01-18
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - 
---

# Abstract

这篇文章仔细研究了 BERT 预训练中多个关键超参数和训练数据大小的影响。

这篇文章发现经过良好训练的BERT模型，可以达到甚至超过每个在它之后发布的模型。

# Conclusion 

我们发现模型训练地更久； 用更大的batch；移除下一句预测目标； 用更长的序列训练; 并且在训练数据上动态改变mask 模式可以提升模型性能。