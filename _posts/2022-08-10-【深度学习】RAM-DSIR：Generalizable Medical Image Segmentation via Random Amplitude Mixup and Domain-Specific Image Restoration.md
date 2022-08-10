---
layout:     post
title:      "【深度学习】RAM-DSIR：Generalizable Medical Image Segmentation via Random Amplitude Mixup and Domain-Specific Image Restoration"
subtitle:   ""
date:       2022-08-10
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - ECCV 2022
---

# Abstract

在医学图像分析中，由于不同的数据获取策略之间存在差异，以一个或多个域为训练对象的分割模型缺乏对不可见域的泛化能力。

作者认为分割性能的退化主要归因于对源域的过拟合和域漂移。

为此，作者提出了一种新的可泛化的医学图像分割方法。

具体地说，作者通过将分割模型与自监督领域特定图像恢复(DSIR)模块相结合来实现模型正则化，将该方法设计为多任务范式。

作者还设计了一个(random amplitude mixup)(RAM)模块，它融合了不同域图像的低频信息来合成新的图像。

为了使模型能够抵抗域漂移， 引入了语义一致性损失。


# Conclusion

