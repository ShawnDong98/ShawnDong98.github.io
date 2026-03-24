---
layout:     post
title:      "【深度学习】UniT: Multimodal Multitask Learning with a Unified Transformer"
subtitle:   ""
date:       2022-04-23
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - MMML
---

# Abstract

这篇文章提出UniT，一个统一的 Transformer 模型，可以同时学习不同领域的最突出的任务，从目标检测到自然语言理解和多模态推理。

基于 Transformer 编码器-解码器架构，UniT模型使用编码器对每个输入模态进行编码，并通过编码后的输入表示，使用共享解码器对每个任务进行预测，然后是特定任务的输出头。

整个模型是端到端联合训练的，每个任务都有损失。

与之前使用 Transformer 进行多任务学习的成果相比，在所有任务中共享相同的模型参数，而不是单独地对特定于任务的模型进行微调，并处理不同领域中各种各样的任务。

实验在8个数据集上共同学习了7个任务，在参数显著减少的情况下实现了每个任务的强大性能。
# Conclusion

这项工作展示了 Transformer 框架可以应用于多个领域，在一个统一的编码器-解码器模型中联合处理多个任务。

UniT模型同时处理8个数据集的7个任务，在一个单一的训练步骤中学习它们，并通过一个紧凑的共享参数集在每个任务上实现强大的性能。

通过一个与领域无关的 Transformer 架构，模型朝着构建能够处理不同领域广泛应用的通用智能体迈出了一步，包括视觉感知、自然语言理解和对多种模态进行推理。