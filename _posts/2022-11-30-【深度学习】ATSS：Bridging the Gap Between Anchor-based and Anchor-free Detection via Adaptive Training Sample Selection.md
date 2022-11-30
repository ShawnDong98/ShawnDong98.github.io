---
layout:     post
title:      "【深度学习】ATSS：Bridging the Gap Between Anchor-based and Anchor-free Detection via Adaptive Training Sample Selection"
subtitle:   ""
date:       2022-11-30
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     true
tags:
    - 深度学习
    - Detection
    - CVPR 2020
---
# Abstract

几年来，基于先验框的检测器一直主导目标检测。

最近，由于 FPN 和 Focal Loss 的提出，无先验框的检测器变得流行起来。

在这篇文章中，作者首先指出，基于先验框的检测和无先验框检测之间的差异实际上是如何定义正负训练样本，这导致它们之间的性能差距。

如果它们在训练期间对正负样本采用相同的定义，那么无论从边界框还是从点回归，最终表现都不会有任何明显的差异。

# Conclusion
