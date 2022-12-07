---
layout:     post
title:      "【深度学习】OFA：Unifying  Architectures, Tasks, and Modalities  through a Simple Sequence-to-Sequence Learning Framework"
subtitle:   ""
date:       2022-12-07
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     true
tags:
    - 深度学习
    - MMML
---

# Abstract

在这项工作中，作者追求多模态预训练的统一范式，以打破复杂任务/特定于模态的定制的框架。

作者提出OFA，一种统一的多模态预训练模型，将模态（即跨模式、视觉、语言）和任务（例如图像生成、视觉接地、图像字幕、图像分类、文本生成等）统一到基于编码器解码器架构的简单序列到序列学习框架中。

OFA使用任务指令进行预训练和微调，并且没有引入额外的特定于任务的层进行微调。

实验结果表明，OFA在一系列多模态任务上实现了新的最先进性，包括图像字幕（COCO  test CIDEr：149.6）、文本到图像生成（COCO test FID：10.5）、VQA（test-std acc.：80.02）、SNLI-VE（test acc：90.20）和引用表达式理解（RefCOCOCO/RefCOCO+/RefCOg test acc：92.93/90.10/85.20）。

通过广泛的分析，作者证明OFA在单模态任务（包括NLU、NLG和图像分类）中与单模态预训练模型（例如BERT、MAE、MoCo v3、SimCLR v2等）具有可比性能，并有效地迁移到没有见过的任务和域。

# Introduction

建立一个与人类一样处理任务和模式的全能模型是人工智能社区的一个有吸引力的目标。实现这一目标的核心问题是在一个单一的模型中代表各种各样的模态、任务和训练制度。

Transformer[1]架构的最新发展表明了其成为通用计算引擎的潜力。在监督学习的环境中，预训练-微调范式在许多领域都取得了巨大成功，在少样本/零样本学习的制度中，具有 prompt/instruction tuning 的语言模型证明了强大的零/少样本的学习器。这些进步为全能模型的出现提供了比以往任何时候都更重要的机会。