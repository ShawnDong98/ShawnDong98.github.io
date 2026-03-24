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

由 non-visual 或者 task-specific 上下文 驱动的注意力机制叫做 "top-down"。

单纯通过 visual feed-forward 注意力机制叫做 "bottom-up"。

ImageCaption 和 VAQ 中大多数的 visual 注意力机制 是 top-down 变体。 将部分 caption 输出 或者 一个图像的问题 的表征视为上下文， 这些模型通常训练有选择性地提取卷积神经网络(CNN)一层或多层的输出。这样会导致输入的区域等价于网络感受野大小的均匀的网格， 而不管图像的内容。

通过 Faster-R-CNN 实现 bottom-up 注意力， 将网络表征视作 bottom-up attention 机制。top-down 机制使用 task-specific 上下文 来预测图像区域的注意力分布。


# Approach

Faster R-CNN 是一种两阶段的目标检测网络。 第一个阶段叫做  Region Proposal Network (RPN)， 提议出可能存在目标的区域。 在每个空间位置网络预测一个 class-agnostic 目标分数 和 多个尺度和比例的 anchor 框的 bbox refinement。 使用非极大值抑制(NMS)通过交并比(IoU)阈值过滤， 将结果作为第二阶段的输入。在第二阶段， RoI pooling 为每个提议框提取一个小的特征(比如 $14 \times 14$)。 这些特征图拼接起来后作为CNN最后一层的输入。 模型最后的输出为每个提议框的 类别标签的 softmax 分布 和 class-specific 的 bbox refinement。

在这篇文章中， 使用 ResNet-101 CNN 作为主干的 Faster R-CNN。 为了得到用于 Image Captioning 和 VQA 的图像特征 $V$， 将每个类别通过非极大值抑制使用 IoU 阈值过滤， 然后选择所有超过置信度阈值的区域。 对于每个选择出来的区域 $i$， $v_i$ 定义为该区域经过平均池化得到的卷积特征， 其图像特征的维度为 2048。 使用这种方式， Faster R-CNN 可以视作一种有效的 “硬” 注意力机制。

使用在ImageNet上预训练过的 ResNet-101 初始化 Faster R-CNN， 然后在 Visual Genome 数据集上训练。 为了学习到好的表征， 额外增加了一个训练输出，将图像特征和一个 ground-truth object class 的学习到的 embedding 拼接，  用于预测 attribute。 

原始的 Faster R-CNN multi-task loss 包括四个组成成分， 分别是 RPN 和 提议区域 的 分类损失 和 回归损失。我们增加一个额外的 multi-class loss 重新训练网络。 

# bottom-up-attention.pytorch




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
2. [bottom-up-attention.pytorch](https://github.com/MILVLG/bottom-up-attention.pytorch)