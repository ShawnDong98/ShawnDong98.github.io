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



# 


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