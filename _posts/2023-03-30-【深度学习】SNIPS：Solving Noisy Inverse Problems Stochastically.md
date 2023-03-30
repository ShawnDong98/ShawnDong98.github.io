---
layout:     post
title:      "【深度学习】SNIPS: Solving Noisy Inverse Problems Stochastically"
subtitle:   ""
date:       2023-03-30
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - NIPS 2021
---

# Abstract

在这项工作中，我们引入了一种名为 SNIPS 的新型随机算法，该算法从任何线性逆问题的后验分布中采样样本，其中假设观察结果被加性白色高斯噪声污染。

我们的解决方案结合了  Langevin dynamics 和 Newton 的想法，并利用了预训练的最小均方误差（MMSE）高斯去噪器。

所提出的方法依赖于后验分数函数的复杂推导，该函数包括退化算子的奇异值分解（SVD），以获得所需采样的 tractable 迭代算法。