---
layout:     post
title:      "【深度学习】LXMERT: Learning Cross-Modality Encoder Representations from Transformers"
subtitle:   ""
date:       2022-03-05
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - 
---

# Abstract
视觉和语言推理需要理解视觉概念、语言语义，以及最重要的，这两种模态之间的对齐和关系。

这篇文章提出了LXMERT(Learning Cross-Modality Ebcoder Representations from Transformers)框架来学习这些视觉和语言的联系。

LXMERT构建了一个大规模的Transformer模型，该模型由三个编码器组成:对象关系编码器、语言编码器和跨模态编码器。

为了赋予模型连接视觉和语言语义的能力，使用大量的图像和句子对对模型进行预训练，通过五个不同的具有代表性的预训练任务:掩码语言建模、掩码对象预测(特征回归和标签分类)、跨模态匹配和图像问题回答。这些任务有助于学习内模态和跨模态关系。

经过对预训练参数的调整，模型在两个视觉问答数据集(即VQA和GQA)上获得了最先进的结果。

这篇文章还通过将预训练的跨模态模型用于具有挑战性的视觉推理任务NLVR 2来展示其可泛化性，并将先前的最佳结果提高了22%(54%至76%)。

最后，展示了详细的消融研究，以证明模型组件和预训练策略都对结果有显著的贡献;也为不同的编码器展示了几种注意力可视化。
# Conclusion

这篇文章提出一种叫做 LXMERT 的跨模态框架以学习视觉和语言间的联系。

建立了基于Transfermer编码器和新的跨模态编码器的模型。然后，在大规模的图像和句子对数据集上，通过不同的预训练任务对模型进行预训练。

实验展示了在两个视觉问答数据集(即VQA和GQA)上的最先进的结果，并显示了在具有挑战性的视觉推理数据集NLVR 2上，模型的泛化能力提高了22%。

最后通过详细的分析和消融研究显示了几种模型组件和训练方法的有效性。


# Bug

## error: identifier “AT_CHECK” is undefined

`detectron2/layers/csrc/deformable/deform_conv.h(135): error: identifier "AT_CHECK" is undefine` 頭文件中缺少定義，我們使用編輯器去修改頭文件即可：


修改此文件 `detectron2/detectron2/layers/csrc/deformable/deform_conv.h`


```
#ifndef AT_CHECK
#define AT_CHECK TORCH_CHECK
#endif
```


# Reference
1. [Detection2安裝BUG記錄](https://blog.csdn.net/qq_40246742/article/details/121061318)