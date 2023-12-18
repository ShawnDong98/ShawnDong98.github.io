---
layout:     post
title:      "【ICML 2022】RETRO：Improving language models by retrieving from trillions of tokens"
subtitle:   ""
date:       2023-12-18
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - ICML 2022
    - 深度学习
---

# Abstract

我们通过对从大型语料库中检索的文档块进行条件化处理，来增强自回归语言模型，这一处理基于与 preceding tokens 的局部相似性。

拥有2万亿 token 数据库的我们的 Retrieval-Enhanced Transformer  Transformer（RETRO）在 Pile 上获得了与 GPT-3 和 Jurassic-1 相当的表现，尽管使用的参数数量少了25倍。

经过微调后，RETRO 的表现转化为下游知识密集型任务，如问答。

RETRO 结合了一个固定的 Bert 检索器、一个可微分编码器和一个分块的交叉注意力机制，以预测基于比通常训练时消耗的数据量大一个数量级的 token。

我们通常从零开始训练 RETRO，但也可以通过添加检索功能快速改造预训练的 Transformer，并仍然获得良好的表现。

我们的工作为通过在前所未有的规模上使用显式记忆来改进语言模型开辟了新途径。