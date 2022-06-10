---
layout:     post
title:      "【深度学习】Language Models Can See: Plugging Visual Controls in Text Generation "
subtitle:   ""
date:       2022-06-10
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - MMML
---

# Abstract

如 GPT2/3 的生成语言模型可以依靠提示生成高质量的文本。


虽然它们是为文本提示生成而设计的，但生成过程如何由文本和图像之外的形态来指导仍然是一个悬而未决的问题。

这项工作提出了一个名为MAGIC(iMage-Guided text GeneratIon with CLIP)的无需训练的框架，用于在生成过程中插入视觉控制，并使 lm 能够以zero-shot 的方式执行多模态任务(例如，图像字幕)。

MAGIC是一个简单而高效的即插即用框架，它直接结合了现成的LM(即GPT-2)和图像-文本匹配模型(即CLIP)，用于基于图像的文本生成。

在解码过程中，MAGIC通过引入一个clip诱导的分数(称为MAGIC score)来影响LM的生成，该分数将生成的结果规范化，使其在语义上与给定的图像相关，同时与之前生成的上下文保持一致。

值得注意的是，该解码方案不涉及任何梯度更新操作，因此具有计算效率。

在 zero-shot 图像字幕的挑战任务上，MAGIC以近27倍的解码速度显著优于最先进的方法。

MAGIC是一个灵活的框架，理论上兼容任何加入了 image grounding 的文本生成任务。

实验展示了在图像和文本提示下，它也能够执行基于视觉的故事生成。