---
layout:     post
title:      "【深度学习】PP-LiteSeg：A Superior Real-Time Semantic Segmentation Model"
subtitle:   ""
date:       2022-08-31
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - Segmentation
    - Arxiv 2022
---

# Abstract

实际应用对语义分割方法有很高的要求。

虽然语义分割随着深度学习取得了显著的飞跃，但实时方法的性能并不令人满意。

这篇文章提出了一种用于实时语义分割任务的轻量级模型PP-LiteSeg。

具体地说，作者提出了一种灵活的轻量级解码器(FLD)，以减少以前解码器的计算开销。

为了加强特征表示，作者提出了一种统一注意融合模块(UAFM)，该模块利用空间注意力和通道注意力产生一个权值，然后将输入的特征与权值融合。

此外，作者提出了一种简单金字塔池化模块(SPPM)，以较低的计算成本聚合全局上下文。

广泛的评估表明，与其他方法相比，PP-LiteSeg实现了精度和速度之间的优越权衡。

# Method

## Flexible and Lightweight Decoder

编码器-解码器结构已被证明是有效的语义分割。一般来说，编码器利用一系列的层分组成几个阶段来提取层次特征。从低层到高层特征，通道数量逐渐增加，特征空间大小逐渐减小。该设计平衡了各级的计算成本，保证了编码器的效率。解码器也有几个阶段，负责融合和上采样特征。尽管特征的空间大小从高阶到低阶不断增加，但在最近的轻量级模型中，解码器在所有级别中保持特征通道相同。因此，浅层阶段的计算成本远远大于深层阶段，导致了浅层阶段的计算冗余。为了提高解码器的效率，作者提出了一种 Flexible and Lightweight Decoder (FLD)。如图3所示， FLD 从 hight level 到 low level 逐渐减少特征的通道数。FLD可以很容易地调整计算成本，以实现编码器和解码器之间更好的平衡。虽然FLD中的特征通道减少了，但实验表明，PP-LiteSeg方法取得了与其他方法相媲美的精度。

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1661921495646.png)

## Unified Attention Fusion Module

如前所述，融合多层次特征是实现高分割精度的关键。除了 element-wise addition 和 concatenation 方法，研究者还提出了几种方法，如SFNet[15]、FaPN[11]和AttaNet[25]。在这项工作中，作者提出了一种Unified Attention Fusion Module(UAFM)，应用通道和空间注意力来丰富融合的特征表示。

**UAFM Framework.**  如图4 (a)所示，UAFM利用注意力模块产生权重 $\alpha$，并将输入特征与 $\alpha$ 通过 Mul 和 Add 操作融合。细节上， 输入特征表示为 $F_{high}$ 和 $F_{low}$。$F_{high}$ 是更深模块的输出， $F_{low}$ 是编码器的 counterpart。注意，它们具有相同的通道。UAFM首先利用双线性插值运算将上采样 $F_{high}$ 上采样到和 $F_{low}$ 相同大小，上采样特征记为 $F_{up}$。 然后，注意力模块以 $F_{up}$ 和 $F_{low}$ 为输入，产生权重 $\alpha$。 注意，注意力模块可以是插件，比如空间注意力模块、通道注意力模块等。然后，作者分别对 $F_{up}$ 和 $F_{low}$ 应用 element-wise Mul 运算来获得注意力加权特征。最后，UAFM对注意力加权特征进行元素加法并输出融合后的特征。 


**Spatial Attention Module.** 空间注意力模块的动机是利用空间间关系产生一个权重，它代表输入特征中每个像素的重要性。如 图4(b) 所示， 给定输入特征，例如 $F_{up} \in R^{C \times H \times W}$ 和 $F_{low} \in R^{C \times H \times W}$， 首先在通道上计算均值和方差生成四个特征， 其维度为 $R^{1 \times H \times W}$。 

# Conclusion

在本文中，作者重点设计了一种新的实时语义分割网络。

首先，作者提出了灵活轻量级解码器(FLD)，以提高现有解码器的效率。

然后，作者提出了一种统一的注意力融合模块(UAFM)，该模块能够有效地增强特征表示。

在此基础上，作者提出了一种简单金字塔池化模块(SPPM)，用于全局上下文的聚合，计算成本低。

在此基础上，作者提出了一种实时语义分割网络PP-LiteSeg。