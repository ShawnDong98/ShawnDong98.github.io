---
layout:     post
title:      "【深度学习】VinVL：Revisiting Visual Representations in Vision-Language Models"
subtitle:   ""
date:       2022-02-05
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - 
---

# Abstract

这篇文章改进目标检测模型来为图像提供以目标为中心的表征。

与bottom-up and top-down 模型相比， 新的模型更大， 在更大的数据集上进行了预训练。因此，它能生成具有更丰富视觉目标的概念的表征。

以往的VL研究主要专注于提升 VL 融合模型， 而没有提升目标检测模型，这篇文章展示了在VL模型中的视觉特征也十分重要。

这篇文章将新的目标检测模型生成的视觉特征输入基于 Transformer 的融合模型 OSCAR 中， 使用提升的 OSCAR+ 预训练 VL 模型， 并且在大量下游 VL 任务上微调它。