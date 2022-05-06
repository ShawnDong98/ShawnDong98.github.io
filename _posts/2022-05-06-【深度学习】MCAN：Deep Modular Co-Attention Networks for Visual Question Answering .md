---
layout:     post
title:      "【深度学习】MCAN：Deep Modular Co-Attention Networks for Visual Question Answering "
subtitle:   ""
date:       2022-05-06
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - MMML
---

# Abstract
视觉问题回答(VQA)要求对图像的视觉内容和问题的文本内容都有细粒度的同时理解。

因此，设计一个有效的 co-attention 模型，将问题中的关键词与图像中的关键对象关联起来，是VQA性能的核心。

到目前为止，大多数成功的 co-attention 学习尝试都是通过使用浅层模型实现的，而深度 co-attention 模型与浅层模型相比几乎没有改善。

这篇文章提出了一种深度 Modular Co-Attention Network(MCAN)，该网络由深度级联的 Modular Co-Attention(MCA) 层组成。

每个MCA层利用两个基本注意单元的模块化组合，对问题的self-attention 和 图像的 self-attention 以及图像的 question-guided-attention 进行建模。

在benchmark VQA-v2数据集上对MCAN进行定量和定性评价，并开展了广泛的消融研究，以探索MCAN有效性背后的原因。

实验结果表明，MCAN的性能明显优于以往的最先进技术。
# Conclusion

