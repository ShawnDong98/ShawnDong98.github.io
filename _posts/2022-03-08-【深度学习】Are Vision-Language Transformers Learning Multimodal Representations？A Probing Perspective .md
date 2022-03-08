---
layout:     post
title:      "【深度学习】Are Vision-Language Transformers Learning Multimodal Representations？A Probing Perspective "
subtitle:   ""
date:       2022-03-08
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - 
---

# Abstract
近年来， 由于视觉语言模型的发展， 联合文本-图像嵌入有了显著的提升。

尽管有这些进步，我们仍然需要更好地理解这些模型产生的表示。

这篇文章在视觉、语言和多模态层级上比较了预训练和微调表征。

为此，我们使用了一组 probing 任务来评估最先进的视觉语言模型的性能，并引入了专门用于多模态 probing 的新数据集。

这些数据集经过精心设计，以处理一系列多模态能力，同时最大限度地减少模型依赖偏差的可能性。

虽然结果证实了视觉语言模型在多模态水平上理解颜色的能力，但对于物体的位置和大小模型似乎更倾向于依赖文本数据的偏差。

在语义对抗的例子中，我们发现这些模型能够精确地查明细粒度的多模态差异。

最后，这篇文章指出，在多模态任务上对视觉-语言模型进行微调并不一定能提高其多模态能力。
# Conclusion

