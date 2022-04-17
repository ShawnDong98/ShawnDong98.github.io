---
layout:     post
title:      "【深度学习】ERNIE-VILG: UNIFIED GENERATIVE PRE-TRAINING FOR BIDIRECTIONAL VISION-LANGUAGE GENERATION "
subtitle:   ""
date:       2022-04-17
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - MMML
---
# Abstarct

传统的图像-文本生成方法主要分别处理双向生成任务，侧重于设计针对任务的框架，以提高生成样本的质量和保真度。

近年来，视觉-语言的预训练模型极大地提高了图像-文本生成任务的性能，但针对文本-图像生成任务的大规模的预训练模型尚不完善。

这篇文章提出了ERNIE-ViLG，一个统一的基于 Transformer 模型的双向图像-文本生成的预训练框架。

基于 image quantization 模型， 将图像生成和文本生成视为一个以图像/文本输入为条件的自回归生成任务。

双向图像-文本生成建模简化了视觉和语言之间的语义对齐。

对于文本到图像的生成过程，我们进一步提出了一种端到端的训练方法，联合学习视觉序列生成器和图像重构器。

为了探索用于双向文本-图像生成的大规模预训练， 在 145 million 中文图像-文本对训练了一个10-billion 参数的 ERNIE_ViLG 模型， 其在 text-to-image 和 image-to-text 任务上取得了 SOTA 性能， 在  COCO-CN 和 AIC-ICC 上的 image captioning 性能达到了最好， 在 MS-COCO 数据集上得到了 7.9 的 FID。
# Conclusion

