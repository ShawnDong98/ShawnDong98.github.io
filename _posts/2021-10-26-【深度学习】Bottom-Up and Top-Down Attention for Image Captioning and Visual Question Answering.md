---
layout:     post
title:      "【深度学习】Bottom-Up and Top-Down Attention for Image Captioning and Visual Question Answering"
subtitle:   ""
date:       2021-10-26
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - 
---



# Abstract

这篇文章提出一种结合了 bottom-up 和 top-down 注意力机制的方法， 使得可以在目标级别和图像显著性区域计算注意力。其基于 Faster R-CNN 提议出的图像区域结合 bottom-up 机制， 将每个区域表示为一个特征向量， 使用 top-down 机制决定特征权重。

# Introduction

在人类的视觉系统中，注意力 由 有意识(volitionally)被当前任务通过 top-down 信号 和 自动地无意识的新的或显著的刺激 决定。

由非视觉 或者 task-specific 上下文 的注意力机制

# bottom-up-attention-vqa

| Model | Validation Accuracy | Training Time |
|:-:|:-:|:-:|
| Reported Model | 63.15 | 12 - 18 hours (Tesla K40) |
| Implemented Model | 63.58 | 40 - 50 minutes (Titan Xp)|

## Implementation Details

我们的实现遵循了论文的总体结构，但进行了以下简化：

- 不使用 Visual Genome 中的额外数据
- 只在每张图像中使用固定数量的对象(K=36)
- 使用一个简单的，单流分类器，没有预训练
- 使用ReLU激活 而不是 tanh

# Reference

1. [bottom-up-attention-vqa](https://github.com/hengyuan-hu/bottom-up-attention-vqa)