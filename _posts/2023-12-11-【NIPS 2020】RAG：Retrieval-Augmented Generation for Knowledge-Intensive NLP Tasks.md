---
layout:     post
title:      "【NIPS 2020】RAG：Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks"
subtitle:   ""
date:       2023-12-11
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - NIPS 2020
    - 
---

# Abstract

大型预训练语言模型已经被证明能够在其参数中存储事实知识，并在针对下游自然语言处理（NLP）任务进行微调时达到最先进的结果。

然而，它们访问和精确操控知识的能力仍然有限，因此在知识密集型任务上的表现落后于特定任务的架构。

此外，为它们的决策提供出处以及更新它们的世界知识仍然是公开的研究问题。

具有显式非参数记忆存取机制的预训练模型可以克服这一问题，但迄今为止，这类模型仅被用于探索性的下游任务。

我们探索了一种用于检索增强生成（RAG）的通用微调方法——这类模型结合了预训练的参数记忆和非参数记忆以生成语言。我们引入了其中参数记忆是预训练的 seq2seq 模型，非参数记忆是以预训练神经检索器访问的 Wikipedia 的密集向量索引的 RAG 模型。

我们在多种知识密集型 NLP 任务上进行了微调和评估，并在三项开放域问答任务上设定了最先进的水平，超过了参数 seq2seq 模型和特定任务的检索-提取架构。

对于语言生成任务，我们发现 RAG 模型生成的语言比最先进的仅参数 seq2seq 基线模型更具体、多样化且事实性强。

# 2 Methods
我们探索了RAG模型，该模型使用输入序列 $x$ 检索文本文档 $z$ ，并在生成目标序列 $y$ 时将其用作附加上下文。如图 1 所示，我们的模型利用两种组件： (i) 一个以参数 $\eta$ 参数化的 retiever $p_\eta(z \mid x)$， 其基于 query $x$ 返回文本消息的分布 (top-K 截断)。


## 2.1 Models


## 2.2 Retriever: DPR


## 2.3 Generator: BART

## 2.4 Training

## 2.5 Decoding


