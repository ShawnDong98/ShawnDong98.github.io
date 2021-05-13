---
layout:     post
title:      "【深度学习】Improving Language Understanding by Generative Pre-Training"
subtitle:   ""
date:       2021-05-12
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - NLP
---

# Abstract

自然语言理解包括一系列不同的任务，如文本蕴涵(textual entailment, 指两个文本片段有指向关系)、问题回答、语义相似性评估和文档分类。尽管大量的未标记文本语料库非常丰富，但是用于学习这些特定任务的标记数据却非常稀少，这使得区分性地训练模型很难充分执行。我们展示了可以通过在不同的未标记文本语料库上生成语言模型的预训练来实现在这些任务上取得巨大收益，然后对每个特定任务进行区分性微调。与以前的方法相比，我们在微调过程中使用了 task-aware 的输入转换，以实现有效的迁移，同时只需对模型体系结构进行最小的更改。我们在广泛的自然语言理解基准测试中证明了我们的方法的有效性。我们的通用的  task-agnostic 模型优于使用专门为每个任务设计的体系的经过严格训练的模型，在研究的12个任务中有9个显着改善了现有技术水平。例如，我们在常识推理（Stories Cloze测验）上实现了8.9％的绝对改进，在回答问题（RACE）上实现了5.7％的绝对改进，在文本蕴含度（MultiNLI）上实现了1.5％的绝对改进。

#  Introduction
从原始文本有效学习的能力对于减轻自然语言处理（NLP）中对监督学习的依赖至关重要。大多数深度学习方法需要大量的手动标注数据，这限制了它们在许多缺乏标记资源的领域中的适用性。在这些情况下，可以利用来自未标记数据的语言信息的模型为收集更多标注提供了宝贵的替代方法，这可能既耗时又昂贵。


# Related Work

# Framework

## Unsupervised pre-training

##  Supervised fine-tuning

##  Task-specific input transformations


