---
layout:     post
title:      "【深度学习】Diffusion Model：Deep Unsupervised Learning using Nonequilibrium Thermodynamics"
subtitle:   ""
date:       2022-12-01
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     true
tags:
    - 深度学习
    - Diffusion
    - ICML 2015
---

# Abstract

机器学习的一个核心问题涉及使用高度灵活的概率分布对复杂的数据集进行建模，其中学习、采样、推理和评估在分析或计算上仍然可以处理。

在这里，作者开发了一种同时实现灵活性和可操作性的方法。

受非平衡统计物理学的启发，本质思想是通过迭代正向扩散过程系统地缓慢地破坏数据分布中的结构。

然后，作者学习了一个反向扩散过程，该过程恢复了数据中的结构，产生了一个高度灵活和易于处理的数据生成模型。

# Conclusion