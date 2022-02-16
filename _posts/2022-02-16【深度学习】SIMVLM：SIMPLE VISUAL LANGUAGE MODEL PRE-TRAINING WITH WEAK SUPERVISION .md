---
layout:     post
title:      "【深度学习】SIMVLM: SIMPLE VISUAL LANGUAGE MODEL PRE-TRAINING WITH WEAK SUPERVISION "
subtitle:   ""
date:       2022-02-16
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - 
---

# Abstract

清洗图像描述和区域标签等昂贵标注的需要限制了现有的Vision-Language Pretraining(VLP)方法， 特定数据集的目标的引入也使得预训练过程变得复杂。

这项工作提出一个最小预训练框架，叫做 Simple Visual Language Model(SimVLM)。与之前的工作不同， SimVLM 通过使用大规模弱监督减小了训练的复杂度， 并且使用单个前缀语言模型目标可以完成端到端的训练。

不需要在特定任务上的额外数据进行训练， 模型的结果比之前的SOTA更好。

SimVLM 还具有强泛化性以及迁移能力， 可以实现zero-shot behavior。
# Conclusion
