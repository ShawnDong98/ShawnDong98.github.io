---
layout:     post
title:      "【深度学习】YSLAO： You Should Look at All Objects"
subtitle:   ""
date:       2022-09-21
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - Detection
    - ECCV 2022
---

# Abstract

特征金字塔网络（FPN）是目标检测器的关键组件之一。

然而，对于研究人员来说，有一个长期存在的谜题，即在引入FPN后，大目标的检测性能被普遍抑制。

为此，这篇首先在检测框架中重新审视 FPN，并从优化的角度揭示了 FPN 成功的性质。

然后，作者指出，大目标检测性能下降是由于集成 FPN 后出现不合适的反向传播路径。

它使骨干网络的每个级别只能查看特定尺度范围内的目标。

基于这些分析，提出了两种可行的策略，使主干的每个级别都能查看基于FPN的检测框架中的所有目标。

具体来说，一个是引入辅助目标函数，使每个骨干级别在训练期间直接接收各种尺度的目标的反向传播信号。

另一个是以更合理的方式构建特征金字塔，以避免不合理的反向传播路径。



# Conclusion