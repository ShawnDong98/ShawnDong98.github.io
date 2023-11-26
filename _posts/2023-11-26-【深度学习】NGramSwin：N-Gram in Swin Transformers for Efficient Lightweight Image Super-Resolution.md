---
layout:     post
title:      "【深度学习】NGramSwin：N-Gram in Swin Transformers for Efficient Lightweight Image Super-Resolution"
subtitle:   ""
date:       2023-11-26
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - CVPR 2023
---

# Abstract

虽然一些研究已经证明，具有窗口自注意力（WSA）的 Swin Transformer（Swin）适用于图像超分辨率（SR），但由于感受野有限，普通WSA在重建高分辨率图像时忽略了广阔的区域。

此外，许多深度学习SR方法受到密集计算的影响。

为了解决这些问题，我们首次将N-Gram上下文引入 Transformer 的低级视觉中。

我们将 N-Gram 定义为 Swin 中相邻的局部窗口，这与将 N-Gram 视为连续字符或单词的文本分析不同。

N-Grams 通过滑动 WSA 交互，扩展看到的区域以恢复退化的像素。

使用 N-Gram 上下文，我们提出 NGswin，这是一个高效的SR网络，具有SCDP bottleneck，采用层次型编码器的多尺度输出。

实验结果表明，与以前的领先方法相比，NGswin在保持高效结构的同时实现了有竞争力的性能。

此外，我们还改进了具有 N-Gram 上下文的其他基于 Swin 的SR方法，从而构建了一个增强的模型：SwinIR-NG。

我们改进的SwinIR-NG执行了目前最好的轻量级SR方法，并建立了最先进的结果。