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

在本文中，我们讨论了语义引导场景生成的任务。在全局图像级生成方法中，一个广泛存在的挑战是难以生成小目标和详细的局部纹理。为了解决这一问题，本文考虑在局部上下文中学习场景生成，并相应地设计了一个以语义映射为指导的局部类特定生成网络，它分别构造不同类的子生成器并且学习如何集成它们，能够提供更多的场景细节。为了在局部生成过程中学习更多判别 特定类的特征表示，本文还提出了一种新的分类模块。结合全局图像级和局部类特定生成的优点，设计了一个注意融合模块和双判别器结构的联合生成网络。在两个场景图像生成任务上的大量实验表明，该模型具有良好的生成性能。在这两项任务和具有挑战性的公共基准上，相比最先进的成果取得了很大优势。 源代码和训练好的模型可以在 [https://github.com/Ha0Tang/LGGAN](https://github.com/Ha0Tang/LGGAN)获取。


![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1616413246373.png)

Figure 1： 在Cityscapes(top)上的语义图像的生成结果 以及 在Dayton(bottom)跨视角图像翻译结果， 用LGGAN的不同设置。


![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1616413424363.png)

Figure 6： 可视化 学到的三种不同类的特征， 比如， 路、植物以及汽车。