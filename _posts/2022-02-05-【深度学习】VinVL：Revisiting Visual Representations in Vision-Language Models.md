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

# Conclusion
相比于 bottom-up and top-down 模型， 新的模型更大， 更好地为 VL 任务设计， 并且在更大的图文数据集上预训练， 因此可以生成具有丰富视觉目标和概念的视觉特征。

将视觉特征输入 VL 融合模型， 在大规模图文数据集上预训练， 在7个VL任务上微调， 以全面验证新模型的表现。

消融研究表明，改进主要是由于在目标类别多样性、视觉属性训练、训练数据规模、模型大小和模型架构方面的设计选择。
s

# Code

## nvcc fatal : Unsupported gpu architecture ‘compute_86‘

```
export TORCH_CUDA_ARCH_LIST="7.5"
```


# Reference
1. [nvcc fatal : Unsupported gpu architecture ‘compute_86‘](https://blog.csdn.net/qq_30614451/article/details/111173703)