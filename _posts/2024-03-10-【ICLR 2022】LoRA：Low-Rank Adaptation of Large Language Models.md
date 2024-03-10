---
layout:     post
title:      "【ICLR 2022】LoRA：Low-Rank Adaptation of Large Language Models"
subtitle:   ""
date:      2024-03-10
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - ICLR 2022
    - 
---

# Abstract

自然语言处理的一个重要范式包括在通用领域数据上进行大规模预训练，然后适应特定任务或领域。

随着我们对更大型号进行预训练，全模型参数的完全微调变得不太可行。

以GPT-3 175B为例，部署独立的经过微调的模型实例，每个模型具有175B个参数，成本过高。

我们提出了低秩适应（Low-Rank Adaptation，LoRA）的方法，它冻结了预训练模型的权重，并将可训练的秩分解矩阵注入到Transformer架构的每一层中，大大减少了用于下游任务的可训练参数的数量。

与使用Adam对GPT-3 175B进行微调相比，LoRA可以将可训练参数的数量减少10,000倍，并将GPU内存需求减少3倍。

在RoBERTa、DeBERTa、GPT-2和GPT-3的模型质量上，LoRA在可训练参数更少、训练吞吐量更高、且不像适配器那样增加额外推断延迟的情况下表现相当或更好。

我们还对语言模型适应中的 rank-deficiency 进行了实证研究，这为LoRA的有效性提供了一些见解。