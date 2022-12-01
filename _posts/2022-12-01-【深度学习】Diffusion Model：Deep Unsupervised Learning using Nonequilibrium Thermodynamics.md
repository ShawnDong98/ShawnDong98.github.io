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

这种方法能够快速学习、采样和评估具有数千层或时间步骤的深度生成模型中的概率，并在学习好的模型下计算条件概率和后验概率。

# Conclusion

作者引入了一种建模概率分布的新算法，可以对概率进行精确采样和评估，并证明其在各种玩具和真实数据集上的有效性，包括具有挑战性的自然图像数据集。

对于这些测试中的每一项，都使用了类似的基本算法，表明该方法可以准确地建模各种分布。