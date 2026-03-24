---
layout:     post
title:      "【ICCV 2023】SRFormer: Permuted Self-Attention for Single Image Super-Resolution"
subtitle:   ""
date:       2023-12-02
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - ICCV 2023
    - 
---

# Abstract

先前的研究表明，增大基于 Transformer 的图像超分辨率模型（例如SwinIR）的窗口大小可以显著提高模型性能，但是计算开销也相当可观。

在本文中，我们提出了一种简单但新的方法SRFormer，该方法可以享受大窗口自注意力的好处，同时引入的计算负担甚至更少。

我们SRFormer的核心是 permuted self-attention（PSA），它在通道和空间信息之间的自注意力中取得了适当的平衡。

我们的PSA非常简单，并且可以轻松应用于现有基于窗口自注意力的超分辨率网络。

我们展示了，无需任何额外装饰，我们的SRFormer在Urban100数据集上实现了33.86dB的PSNR得分，比SwinIR高出0.46dB，但使用了更少的参数和计算量。

我们希望我们简单有效的方法能够成为未来超分辨率模型设计研究的有用工具。
