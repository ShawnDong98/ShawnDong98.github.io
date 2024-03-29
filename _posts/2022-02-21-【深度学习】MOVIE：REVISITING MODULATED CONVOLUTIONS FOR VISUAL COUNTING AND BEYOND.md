---
layout:     post
title:      "【深度学习】MOVIE：REVISITING MODULATED CONVOLUTIONS FOR VISUAL COUNTING AND BEYOND"
subtitle:   ""
date:       2022-02-21
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - 
---

# Abstract 

这篇文论重点关注视觉计数， 其目标是给定一个 query 和一幅自然图像， 预测其出现的次数。

与之前显式的、符号化的模型不同， 这篇文章通过 revisiting modulated convolution 提出一种简单有效的替代方法， 其局部融合 query 和 image。

加入 residual bottleneck 设计之后，将此方法叫做 Modulated conVlutional bottlenecks(MoVie)。

MoVie 在计数方面表现出强大的性能： 1) 计数特定的 VQA 任务取得SOTA， 并且更有效率。 2) 在常见目标计数如 COCO 的 benchmark 超出之前的工作 3) 帮助取得了 2020 VQA 挑战的第一名。

# Conclusion

这篇文章通过 revisting modulated convlutions 局部融合 queries 和 images 提出一种叫做 MoVie 的简单有效的用于视觉计数的方法。

与之前显式的、符号化的推理不同， MoVie 的计数是显式地并且在推理阶段仅需一次前向过程。

MoVie  在HowMany-QA, Tally-QA 和 COCO 三个 benchmarks 上显著提高了视觉计数的 SOTA, 并且其可以很容易插入如MCAN 中的通用 VQA 模型。

最终， MoVie 直接加强了如 CLEVER 和 GQA 等数据集上表现， 表明 mudulated convolutions 可以作为一种通用的机制用于计数之外的推理任务。
