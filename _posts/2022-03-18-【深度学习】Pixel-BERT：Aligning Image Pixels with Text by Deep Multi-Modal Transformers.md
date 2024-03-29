---
layout:     post
title:      "【深度学习】Pixel-BERT: Aligning Image Pixels with Text by Deep Multi-Modal Transformers"
subtitle:   ""
date:      2022-03-18 
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - 
---

# Abstract
这篇文章提出了Pixel - BERT算法，通过深度多模态 Transformer 将图像像素与文本进行对齐，该算法将视觉和语言联合学习嵌入到统一的端到端框架。

其目标是直接从图像和句子对中建立图像像素与语言语义之间更准确、更全面的联系，而不是将基于区域的图像特征。

Pixel - BERT 算法将语义连接对齐到像素级和文本级，解决了视觉和语言任务特定视觉表示的局限性。

该方法降低了边界框标注的成本，克服了视觉任务中语义标签与语言语义之间的不平衡。

为了更好地表达下游任务，利用Visual Genome数据集和MS-COCO数据集的图像和句子对，预训练一个通用的端到端模型。

这篇提出使用随机像素采样机制来增强视觉表示的鲁棒性，并将 mask 语言模型和图像-文本匹配作为预训练任务。

通过对下游任务的大量实验表明，该方法在下游任务中取得了最先进的结果，包括视觉问答(VQA)、图像-文本检索、自然语言的真实视觉推理(NLVR 2)。
# Conclusion

预训练机制在视觉和语言活动中都表现出了其有效性。

这篇文章讨论了现有作品中常用的视觉嵌入方法，旨在解决基于区域的视觉表示的局限性。

其提出了基于cnn的视觉编码器，并将其与多模态 Transformer 相结合，以端到端的方式构建 Pixel - BERT，在像素级和文本级构建视觉和语言内容之间更准确、更彻底的嵌入。

对图像输入使用随机像素采样机制来学习鲁棒性的视觉表征。

在visual Genome数据集和MS-COCO数据集上建立了基于Pixel-BERT的预训练模型，学习通用的视觉和语言嵌入。

Masked language model 和 image-text matching 是预训练的两个任务。

使用预训练的模型进行下游的视觉和语言任务，并在VQA、NLVR 2、图像到文本检索和文本到图像检索等任务中取得了最佳性能。


没有标注边界框的限制，预训练模型Pixel- BERT可以使用更大的图像-句子对数据集提供更强的图像和句子的表示。

作者将考虑在 Conceptual Caption 数据集上对模型进行预训练，进一步优化视觉和语言嵌入。
