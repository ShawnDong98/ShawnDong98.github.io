---
layout:     post
title:      "【深度学习】VLMO：Unified Vision-Language Pre-Training with Mixture-of-Modality-Experts"
subtitle:   ""
date:       2022-04-11
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - Multi Modal
---


# Abstract

这篇文章提出了一个统一的视觉语言预训练模型(VLMO)，该模型联合学习一个双编码器和一个带有模块化 Transformer  融合编码器。

具体来说，引入了 Mixture-of-Modality-Expert (MOME) Transformer，其中每个块包含一个 modality-specific expert 池和一个共享的自注意力层。

由于MOME建模的灵活性，预训练的VLMO可以作为视觉-语言分类任务的融合编码器，或用于有效的图像-文本检索的双编码器。

此外，这篇文章提出了一种分阶段的预训练策略，该策略有效地利用了除图像-文本对外的大规模纯图像和纯文本数据。

实验结果表明，VLMO在VQA和NLVR2等视觉语言任务上都取得了较好的效果。


# Conclusion

这篇文章提出一个联合视觉语言预训练模型VLMo， 其使用一个共享的 MoME Transformer Backbone 联合学习双向编码器和一个融合编码器。

引入一组 modality experts 对特定的模态信息进行编码，并使用共享的自注意力模块对不同的模态进行对齐。

MoME 的联合预训练是的模型可以作为双编码器用于视觉语言检索， 或者融合编码器用于跨模态交互或者分类任务。

利用大规模的纯图像和纯文本语料库的阶段式预训练大大提高了视觉语言的预训练。

VLMo在各种视觉语言基准测试上的表现优于以前的最先进的模型。

未来将从以下几个方面对VLMo进行改进：

- 缩放用于 VLMo 预训练的模型大小和 图像文本对数量。
- 在统一的端到端预训练框架下，我们正致力于将目标检测作为VLMo的一个新的预训练任务，正如之前的工作(Zhang et al .，2021)已经表明，注入目标信息到 视觉-语言模型可以显著提高下游任务上的模型性能。
- 对VLMo用于视觉语言生成任务的微调感兴趣，如图像字幕，遵循UniLM中提出的方法
- 我们将探索视觉-语言预训练在多大程度上可以相互帮助，特别是当共享 MoME backbone自然地融合到文本和图像表示中。
- 可以扩展所提出的模型来整合更多的模态(例如，语音、视频和结构化知识)，支持通用的多模态预训练