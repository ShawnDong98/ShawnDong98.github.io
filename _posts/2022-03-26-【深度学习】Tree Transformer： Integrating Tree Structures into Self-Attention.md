---
layout:     post
title:      "【深度学习】Tree Transformer: Integrating Tree Structures into Self-Attention"
subtitle:   ""
date:       2022-03-26
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - 
---

# Abstract
基于大规模原始文本的预训练Transformer和对期望任务的微调，已经在各种NLP任务上取得了最先进的结果。

然而，目前还不清楚习得的注意力捕捉到了什么。

由注意力头计算出来的注意力似乎与人类对层次结构的直觉不匹配。

这篇文章提出了Tree Transformer，  其在双向 Transformer 编码器的注意头上增加了一个额外的约束，以鼓励注意头遵循树形结构。

其提出的 Constituent Attention 模块可以从原始文本中自动诱导出树形结构，该模块通过两个相邻单词之间的自注意力来实现。

在与BERT相同的训练过程中，实验证明Tree transformer在诱导树形结构、更好的语言建模和进一步学习更可解释的注意力分数。

# Conclusion

这篇文章提出 Tree Transformer， 首次尝试通过给将 Tree 结构集成到 Transformer 中。

其提出的“Constituent Attention”模块可以自动地从原始文本中诱导出树状结构，该模块通过自注意力将成分相互连接起来。

在无监督解析方面的性能证明了模型在诱导与人类专家注释一致的树结构方面的有效性。

将树结构整合到Transformer中是一个重要且值得探索的方向，因为它允许Transformer学习更多可解释的注意力，并实现更好的语言建模。

可解释性注意可以更好地解释模型如何处理自然语言，并指导未来的改进。