---
layout:     post
title:      "【深度学习】TreeLSTM：Improved Semantic Representations From Tree-Structured Long Short-Term Memory Networks"
subtitle:   ""
date:       2022-04-02
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - 
---

# Abstract
长短期记忆(Long - Short-Term Memory, LSTM)网络是一种具有更复杂计算单元的循环神经网络，由于其具有长期保存序列信息的卓越能力，在各种序列建模任务中取得了良好的效果。

自然语言表现出将词自然地组合成短语的句法策略特性。

这篇文章引入Tree-LSTM，将lstm推广到树状结构的网络拓扑中。在预测两个句子的语义相关性(SemEval 2014, Task 1)和情感分类(Stanford emotion Treebank)这两个任务上，Tree-LSTM优于所有现有的系统和强大的LSTM基线。

# Conclusion

