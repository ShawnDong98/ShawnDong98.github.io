---
layout:     post
title:      "【深度学习】How Much Can CLIP Benefit Vision-and-Language Tasks?"
subtitle:   ""
date:       2022-02-18
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - 
---

# Abstract

大规模的预训练通常可以产生更好的泛化性能，例如，在大量的图像-文本对上进行训练的CLIP (contrast Language-Image pre-training)，在各种视觉任务中表现出了很强的 zero-shot 能力。

为了进一步研究CLIP带来的优势，我们提出在两种典型的场景下的各种V&L模型中使用CLIP作为视觉编码器：

- 将 CLIP 插入特定任务的微调
-  将 CLIP 与 V&L 预训练任务结合并迁移的下游任务。


结果表明 CLIP 比广泛使用的视觉编码器 BottomUp-TopDown 表现更好。

# Conclusion

这篇文章提出利用CLIP作为视觉特征编码器在不同任务上用于不同的 V&L 模型。

用两种方法进行实验： 

1) 直接将 CLIP 插入特定任务的微调
2) 将CLIP 与 VL 预训练结合， 然后在下游任务上微调。

大量的实验表明， CLIP-ViL 和 CLIP-ViL_p 能够取得有竞争力或更好的成绩。


# Bug

## RuntimeError: NCCL Error 1: unhandled cuda error 

使用 pytorch 1.7.1 无此问题


## pytorch/vision 安装失败

pytorch 1.7.1 安装分支 -b v0.8.2。