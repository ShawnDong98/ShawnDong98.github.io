---
layout:     post
title:      "【深度学习】GATED GRAPH SEQUENCE NEURAL NETWORKS "
subtitle:   ""
date:       2022-01-31
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - 
---
# Abstract

这篇文章研究了对于图结构输入的特征学习技术。

出发点是图神经网络， 我们使用门控循环单元和现代化优化技术修改它， 然后拓展到输出序列。

结果是它是一种非常灵活地并且有广泛用途的神经网络模型， 当问题数图结构时，其相比于单纯的基于序列的模型(如LSTM)有非常好归纳偏置。

我们在一些简单的 AI 和 图算法学习任务上展示了其能力。

我们展示了它能够在抽象数据结构需要被描述为子图的问题上能够达到SOTA性能。

# Conclusion

