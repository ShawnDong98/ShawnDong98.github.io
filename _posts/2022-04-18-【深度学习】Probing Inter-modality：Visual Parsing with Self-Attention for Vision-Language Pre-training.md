---
layout:     post
title:      "【深度学习】Probing Inter-modality: Visual Parsing with Self-Attention for Vision-Language Pre-training"
subtitle:   ""
date:       2022-04-18
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - 
---


# Abstract
视觉语言预训练（VLP）旨在从图像-文本对中学习多模态表示，并以微调的方式用于下游视觉语言任务。

主流的的VLP模型采用CNN-Transformer架构，该架构使用CNN embed 图像，然后将图像和文本使用 Transformer 对齐。 

视觉内容之间的视觉关系在图像理解中起着重要作用，对VLP中的 inter-modal 对齐学习至关重要。

然而，由于局部感受野在建模远程依赖性方面存在弱点，CNN在视觉关系学习方面存在局限性。

因此，学习视觉关系和 inter-modal 对齐这两个目标被封装在同一 Transformer 网络中。

这种设计可能会忽视每个目标的特殊性，从而限制 Transformer 中的 inter-modal 对齐学习。

为了应对这一挑战，我们为VLP提出了一个完整的 Transformer 视觉嵌入，以更好地学习视觉关系，并进一步促进 inter-modal 对齐。

具体来说， 这篇文章提出了一个名为 Inter-Modality Flow（IMF）的指标来衡量视觉和语言（即 inter-modality） 之间的相互作用。

这篇文章还在 Transformer 中设计了一种名为 Masked Feature Regression（MFR）的新型 masking 优化机制，以进一步促进 inter-modality 学习。

这可能是首次探索 Transformer 在VLP中进行视觉特征学习的好处。

在广泛的视觉语言任务上验证了该方法，包括图像文本检索、视觉问题解答（VQA）、视觉内容和视觉推理。

结果表明，该方法不仅优于最先进的VLP模型，而且在 IMF 指标上也表现出优势。

# Conclusion

这篇文章探讨了自注意力在视觉语言预训练（VLP）中对视觉特征学习的好处。

通过在 VLP 中引入完整地 Transformer 来探索 CNN 在视觉模式学习方面的局限性。

还在 Transformer 中设计了一种名为 Masked Feature Regression（MFR）的新型 masking 优化机制，以进一步促进 inter-modality 学习。

为了验证MFR并探索 inter-modality 对齐的机制，提出 Inter-Modality Flow（IMF）来度量视觉和语言模式之间的相互作用。

将来，将进一步探索各种模态的不同属性，并设计一个统一的 inter-modality 交互框架。

另一个潜在方向是在模态间学习中涉及两种以上的模态，以实现更强大的理解和交互，例如图像标签。