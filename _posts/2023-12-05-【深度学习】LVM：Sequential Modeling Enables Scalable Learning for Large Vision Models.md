---
layout:     post
title:      "【深度学习】LVM：Sequential Modeling Enables Scalable Learning for Large Vision Models"
subtitle:   ""
date:       2023-12-05
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - Arxiv 2023
    - 
---

# Abstract

我们提出了一种新的序列建模方法，该方法能够在不使用任何语言数据的情况下学习大视觉模型（LVM）。

为此，我们定义了一种通用格式 “visual sentences”，我们可以用它来表示原始图像和视频以及带标注的数据来源，如语义分割和深度重建，而无需超出像素之外的任何元知识。

将这些广泛的视觉数据（包含4200亿个tokens）表示为序列后，模型可以通过最小化下一个 token 预测的交叉熵损失进行训练。

通过在不同规模的模型架构和数据多样性上进行训练，我们提供了实证证据，证明我们的模型可以有效地扩展。

通过在测试时设计合适的视觉 prompt，许多不同的视觉任务可以被解决。