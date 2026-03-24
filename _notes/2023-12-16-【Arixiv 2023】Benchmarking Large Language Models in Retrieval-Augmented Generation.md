---
layout:     post
title:      "【Arixiv 2023】Benchmarking Large Language Models in Retrieval-Augmented Generation"
subtitle:   ""
date:       2023-12-16
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - Arxiv 2023
    - 
---

# Abstract

检索增强生成（Retrieval-Augmented Generation，简称RAG）是减轻大型语言模型（Large Language Models，简称LLMs）幻觉问题的一个有前景的方法。

然而，现有研究在严格评估检索增强生成对不同大型语言模型的影响方面还不足，这使得确定RAG对不同LLMs能力潜在瓶颈变得具有挑战性。

在本文中，我们系统地研究了检索增强生成对大型语言模型的影响。

我们分析了不同大型语言模型在4项RAG所需的基本能力方面的表现，包括噪声鲁棒性、负面拒绝、信息整合和反事实鲁棒性。

为此，我们建立了检索增强生成基准（Retrieval-Augmented Generation Benchmark，简称RGB），这是一个用于中英文RAG评估的新语料库。

RGB根据上述所需的基本能力将基准内的实例划分为4个独立的测试平台，然后我们在RGB上评估6个代表性的LLMs，以诊断当前LLMs在应用RAG时面临的挑战。

评估显示，尽管LLMs表现出一定程度的噪声鲁棒性，但它们在负面拒绝、信息整合和处理虚假信息方面仍存在显著困难。上述评估结果表明，将RAG有效应用于LLMs仍有相当长的路要走。