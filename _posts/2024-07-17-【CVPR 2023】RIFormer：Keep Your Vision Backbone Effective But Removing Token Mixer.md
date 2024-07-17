---
layout:     post
title:      "【CVPR 2023】RIFormer：Keep Your Vision Backbone Effective But Removing Token Mixer"
subtitle:   ""
date:      2024-07-17
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - CVPR 2023
    - 
---

# Abstract

这篇论文研究了如何在去除视觉骨干网络中基本构建模块中的令牌混合器的情况下，保持视觉骨干网络的有效性。

令牌混合器，作为视觉变换器（ViTs）的自注意力机制，旨在实现不同空间令牌之间的信息传递，但其计算成本和延迟相当高。

然而，直接去除这些混合器会导致模型结构先验不完整，从而导致显著的准确率下降。

为此，我们首先基于重参数化的思路开发了一个RepIdentityFormer，以研究不使用令牌混合器的模型架构。

然后，我们探索了改进的学习范式，以突破简单的无令牌混合器骨干网络的限制，并将经验实践总结为5条指南。

借助提出的优化策略，我们能够构建一个极其简单但性能优良的视觉骨干网络，同时在推理时享受高效率。

大量实验和消融分析也证明了网络架构的归纳偏置可以通过适当的优化策略融入到简单的网络结构中。我们希望这项工作能成为优化驱动的高效网络设计探索的起点。

