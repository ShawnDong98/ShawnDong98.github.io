---
layout:     post
title:      "【CVPR 2023】SRNO：Super-Resolution Neural Operator"
subtitle:   ""
date:       2023-11-27
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习 
    - CVPR 2023
---

# Abstract

我们提出了超分辨率神经算子(SRNO)，这是一个深度算子学习框架，能够从低分辨率(LR)图像中解析出任意比例的高分辨率(HR)图像。将LR-HR图像对视为以不同网格大小近似的连续函数，SRNO学习这些对应函数空间之间的映射。从逼近理论的角度来看，SRNO首先将LR输入嵌入到一个更高维的潜在表示空间，试图捕捉足够的基函数，接着通过内核积分机制迭代逼近隐含的图像函数，然后通过最后一个降维步骤产生目标坐标处的RGB表示。SRNO与先前连续SR工作相区别的关键特征有：1) 每层中的内核积分通过Galerkin型注意力高效实现，该注意力在空间领域具有非局部特性，因此有益于无格网的连续体；及2) 多层注意力架构允许动态潜在基更新，这对于SR问题“幻化”LR图像中的高频信息至关重要。

