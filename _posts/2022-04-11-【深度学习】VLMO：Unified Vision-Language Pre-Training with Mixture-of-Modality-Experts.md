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

