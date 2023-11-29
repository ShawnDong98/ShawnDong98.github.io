---
layout:     post
title: 【ACL 2023】AAR：Augmentation-Adapted Retriever Improves Generalization of Language Models as Generic Plug-In
subtitle:   ""
date:      2023-11-26 
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - ACL 2023
---

# Abstract

检索增强可以通过向语言模型（LM）提供外部信息来帮助它们进行知识密集型任务。

先前的检索增强工作通常共同微调检索器和LM，使它们紧密相连。

在本文中，我们探索了通用检索插件的方案：检索器旨在帮助事先不知道或无法一起微调的LM。

为使未见过的LM检索有用文档，我们提出了增强适应检索器（AAR），它学习从已知来源LM获得的LM的偏好。

MMLU和PopQA数据集的实验表明，我们训练有 small source LM 的 AAR 能够显著改善从250M Flan-T5到175B InstructGPT的大型 LM 的 zero-shot 的泛化性。

进一步的分析表明，不同LM的偏好重叠，使使用单一 source LM 训练的 AAR 能够作为各种 LM 的通用插件。
