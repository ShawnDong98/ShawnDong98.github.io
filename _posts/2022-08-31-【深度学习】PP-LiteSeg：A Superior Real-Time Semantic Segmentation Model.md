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
# Conclusion

