---
layout:     post
title:      "【深度学习】Uformer：A General U-Shaped Transformer for Image Restoration"
subtitle:   ""
date:       2021-11-10
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - 
---

# Abstract

在本文中，我们提出了Uformer，一种有效和高效的基于Transformer的架构，其中我们使用Transformer块构建一个层级编解码器网络来进行图像复原。Uformer有两个核心设计使它适合这个任务。第一个关键元素是 local-enhanced window Transformer 块，我们使用 non-overlapping window-based self-attention 来减少计算需求，并在前馈网络中使用深度卷积来进一步提高其捕获局部上下文的潜力。第二个关键因素是，我们探索了三种  skip-connection 方案，以有效地将信息从编码器传递到解码器。在这两种设计的支持下，Uformer具有很强的用于捕获对图像恢复有用依赖关系的能力。大量的图像恢复实验证明了Uformer在图像去噪、去噪、去模糊和去噪等方面的优越性。


# Conclusions

这篇文章我们通过引入 Transformer 块提出一种用于图像复原的可替换结构。 与现有的基于CNN的结构相比， 我们的 Uformer 主要建立在 LeWin Transformer block 上， 它不仅能够处理局部信息而且可以有效地捕获长程信息。