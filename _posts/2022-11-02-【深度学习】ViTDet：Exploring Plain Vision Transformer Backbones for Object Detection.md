---
layout:     post
title:      "【深度学习】ViTDet：Exploring Plain Vision Transformer Backbones for Object Detection"
subtitle:   ""
date:       2022-11-02
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - Detection
    - ECCV 2022
---

# Abstract

作者探索了朴素的、非层次化的视觉 Transformer（ViT）作为目标检测的骨干网络。

这种设计使原始的ViT架构能够进行微调，以进行目标检测，而无需重新设计用于预训练的层次化骨干。

通过最小的微调调整，所提出的普通骨干检测器可以实现有竞争力的结果。

令人惊讶的是，作者观察到：

（i）从单尺度特征图（没有常见的FPN设计）构建一个简单的特征金字塔就足够了

（ii）在很少的 cross-window propagation 块的帮助下使用窗口注意（不需要 shift）就足够了。

通过预训练为 Masked Autoencoders(MAE) 的普通ViT骨干，该检测器名为ViTDet，可以与之前基于层次化的主干的领先方法竞争，仅使用 ImageNet-1K 预训练在COCO数据集上达到高达 61.3 AP。



# Conclusion

作者的探索表明，朴素骨干检测是一个有前景的研究方向。

这种方法在很大程度上保持了通用主干网络和下游任务特定设计的独立性——基于ConvNet的研究就是这种情况，但基于 Transformer 的研究却不是这样。

作者希望将训练与微调解耦是一种总体上有利于社区的方法。

例如，在自然语言处理（NLP）中，通用预训练（GPT [45]，BERT [13]）极大地推进了该领域，并一直在支持各种下游任务。

在这项研究中，作者的普通骨干探测器受益于MAE提供的现成预训练模型[24]。

作者希望这种方法也将有助于拉近计算机视觉和NLP领域的距离。