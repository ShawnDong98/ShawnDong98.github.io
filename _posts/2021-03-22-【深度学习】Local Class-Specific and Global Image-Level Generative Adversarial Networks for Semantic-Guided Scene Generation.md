---
layout:     post
title:      "【深度学习】Local Class-Specific and Global Image-Level Generative Adversarial Networks for Semantic-Guided Scene Generation"
subtitle:   ""
date:       2021-03-22
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - GAN
---


# Abstract

在本文中，我们讨论了语义引导场景生成的任务。在全局图像级生成方法中，一个广泛存在的挑战是难以生成小目标和详细的局部纹理。为了解决这一问题，本文考虑在局部上下文中学习场景生成，并相应地设计了一个以语义映射为指导的局部类特定生成网络，它分别构造和学习集中于不同类生成的子生成器，能够提供更多的场景细节。为了在局部生成过程中学习更多判别 特定类的特征表示，本文还提出了一种新的分类模块。结合全局图像级和局部类特定生成的优点，设计了一个注意融合模块和双判别器结构的联合生成网络。在两个场景图像生成任务上的大量实验表明，该模型具有良好的生成性能。在这两项任务和具有挑战性的公共基准上，相比最先进的成果取得了很大优势。 源代码和训练好的模型可以在 [https://github.com/Ha0Tang/LGGAN](https://github.com/Ha0Tang/LGGAN)获取。