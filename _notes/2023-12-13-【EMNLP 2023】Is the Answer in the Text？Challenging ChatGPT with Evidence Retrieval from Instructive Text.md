---
layout:     post
title:      "【EMNLP 2023】Is the Answer in the Text? Challenging ChatGPT with Evidence Retrieval from Instructive Text"
subtitle:   ""
date:       2023-12-13
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - EMNLP 2023
    - 深度学习
---

# Abstract

最近，生成性语言模型在根据给定文本上下文生成答案方面取得了显著成功。然而，这些答案可能会产生幻觉，错误引用证据，并传播误导性信息。在这项工作中，我们通过使用ChatGPT——一种最先进的生成模型作为机器阅读系统，来解决这个问题。我们要求它从可信的指导性文本中检索出对于词汇多样和开放式问题的答案。

我们介绍了WHERE（WikiHow Evidence REtrieval），一个新的高质量评估基准，它是一组WikiHow文章的集合，这些文章详细注释了问题的证据句子。所有问题都与文章的主题相关，但并非所有问题都可以使用所提供的上下文来回答。我们有趣地发现，当使用常规的问答提示时，ChatGPT忽略了无法回答的情况。当提供一些示例后，它学会了更好地判断文本是否提供了答案证据。除了这个重要的发现之外，我们的数据集为问答中的证据检索定义了一个新的基准，我们认为这是使大型语言模型更值得信赖的必要下一步。
