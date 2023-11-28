---
layout:     post
title:      "【深度学习】What Makes for Good Tokenizers in Vision Transformer?"
subtitle:   ""
date:       2023-11-28
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - TPAMI 2023
    - 深度学习
---

# Abstract
Transformer 架构最近在视觉任务中迎来了迅猛的应用，与普遍的卷积范式形成了对立。

依靠将输入分割成多个 token 的 tokenization 过程， Transformer 能够利用自注意力机制提取他们之间的成对关系。

虽然它是 Transformer 的基础构造块，但在计算机视觉中，一个好的 Tokenizer 到底是什么还没有被充分理解。

在这项工作中，我们从信息权衡的角度研究了这一未知问题。

除了统一和理解现有的结构性修改之外，我们的推导促成了更好的视觉 Tokenizer 设计策略。