---
layout:     post
title:      "【深度学习】DR2：Diffusion-based Robust Degradation Remover for Blind Face Restoration"
subtitle:   ""
date:       2023-04-10
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - Diffusion
    - CVPR 2023
---

# Abstract

盲脸恢复通常使用退化的低质量数据与预定义的退化模型进行合成，而更复杂的情况可能会发生在现实世界中。

假设和实际退化之间的差距损害了恢复性能， 在输出中经常观察到 artifacts 。

然而，将每种类型的退化都包含在训练数据中以涵盖现实世界的案例是昂贵且不可行的。

为了解决这个鲁棒性问题，我们提出 Diffusion-based Robust Degradation Remover (DR2) 首先将退化的图像转换为粗糙但退化不变的预测，然后使用增强模块将粗糙的预测恢复为高质量图像。

通过利用性能良好的去噪扩散概率模型，我们的 DR2 将输入图像扩散到噪声状态，其中各种类型的退化让位于高斯噪声，然后通过迭代去噪步骤捕获语义信息。  

因此，DR2可以抵御常见的退化（例如模糊、重新调整大小、噪声和压缩），并与增强模块的不同设计兼容。