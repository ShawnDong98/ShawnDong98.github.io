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

