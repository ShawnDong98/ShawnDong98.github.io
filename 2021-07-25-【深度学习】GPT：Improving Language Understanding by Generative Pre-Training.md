---
layout:     post
title:      "【深度学习】GPT：Improving Language Understanding by Generative Pre-Training"
subtitle:   ""
date:       2021-07-25
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - NLP
---

# 工作的主要贡献

第一点， 生成式预训练语言模型， 然后在每个特定任务上判别性微调 有很大收益。

在微调期间， 在最小改变模型结构的情况下， 利用task-aware的输入实现有效的迁移学习。

# 动机


标注数据是非常费时间的， 因此使用未标注的数据是非常有价值的。

即便有可观的监督数据可用，以一种无监督的方式学习表征可以提供显著的性能提升。一个例子就是预训练词向量对NLP任务的提升。

从未标注的文本中学习不仅仅是词级别的表征主要有两大难点。

- 不清楚学习用于迁移的表征时， 哪种优化目标最有效
- 将这些学习到的表征迁移到目标任务哪种方式最有效没有达成一致