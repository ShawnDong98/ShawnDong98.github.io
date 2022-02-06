---
layout:     post
title:      "【深度学习】BLIP: Bootstrapping Language-Image Pre-training for Unified Vision-Language Understanding and Generation"
subtitle:   ""
date:       2022-02-06
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - 
---

# Abstract

视觉语言预训练在很多视觉语言任务上有很好的表现。

然而， 大多数现有的预训练模型只是基于理解的任务或者基于生成的任务。

这篇文章提出一种可以在视觉语言理解和生成任务上灵活转换的新的VLP框架 BLIP。

BLIP 通过 bootstrap captions 利用有噪声的网络数据， 其包括一个 captioner 生成 captions 和一个 filter 删除噪声 captions。

# Conclusion

这篇文章提出一种叫做 BLIP 的 VLP 框架， 其可广泛用于包括基于理解和基于生成的下游任务。

BLIP 在大规模噪声 图像文本对 数据集上使用 dataset bootstrapped  预训练一个 编码器-解码器 的多模态混合模型， 通过插入多样性的合成 captions 和 去除噪声 captions。

bootstrapped 数据即将发布以加速视觉语言研究。

BLIP 存在几个可能进一步提升性能的方向： 1) 使用多轮 dataset bootstapping  2)  每张图像生成多个合成 captions 以进一步扩大预训练数据集 3) 训练多个不同的 captioners 和 filters 并在 CapFilt 组合它们的 forces 进行模型融合。