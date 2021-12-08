---
layout:     post
title:      "【深度学习】Scene graph For Image Captioning"
subtitle:   ""
date:       2021-12-08
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - 
---


# On the Role of Scene Graphs in Image Captioning

## Abstract

Scene graphs 表示图像中的语义信息， 他可以帮助 image cationing 系统产生更多描述性的输出， 而不仅仅使用图像作为上下文。最近的 captioning 方法依赖于 ad-hoc 方法获取图像的 graph。然而，这些 graph 引入了噪声， parser 的错误对 captioning 准确性的影响尚不清楚。 在这项工作中， 调研了 Scene Graph 在多大程度上可以帮助 image captioning。 结果表明， 最先进的 scene graph parser 几乎可以像 ground-true graph 一样帮助captioning提高性能， 这表明目前的瓶颈更多地存在于 captioning 模型， 而不是 scene graph parser 的性能上。

## Conclusion

这篇文章提出了一种新的 image captioning 框架， 该框架融合了SOTA scene graph parser Factorizable-Net 的 scene graph 特征。 特别地， 研究了将图卷积编码的 relation-aware 的 scene graph 特征 与 区域级的特征集成的问题， 以提高 image captioning 性能。

# Auto-Parsing Network for Image Captioning and Visual Question Answering

## Abstract

这篇文章提出一种 Auto-Parsing Network (APN) 来发现和挖掘输入图像的 hidden tree structures 以提高 Transformer-based vision-language 系统的有效性。具体地说， 在每个 self-attention 层上增加一个由 attention operations 参数化的 Probabilis-tic Graphical Model (PGM) 以加入稀疏性假设。使用这个 PGM 将输入序列分成几个 clusters。 每个cluster 可以被视为内部 entities 的 parent。  通过将这些受PGM约束的 self-attention 层叠加，低层的 cluster 组成一个新的序列， 而上层的PGM将进一步分割该序列。通过迭代方法可以隐式解析出一个 sparse tree， 这个树的层次化知识可以融合进 transformed embeddings， 它可以用来解决 vision-language 任务。具体来说，我们展示了我们的APN可以在两个主要的视觉语言任务中增强基于Transformer的网络: Captioning 和 VQA。 此外， 这篇文章还提出了一种基于概率的 PGM 解析算法， 通过它我们可以在推理时发现输入的隐含结构。


