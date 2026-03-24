---
layout:     post
title:      "【NIPS 2022】ScaoedNet：Enhanced Latent Space Blind Model for Real Image Denoising via Alternative Optimization"
subtitle:   ""
date:       2024-01-02
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - NIPS 2022
    - 深度学习
---

# Abstract



受到基于模型的方法的成就和深度网络的进展的启发，我们提出了一种新的增强潜空间盲模型的深度展开网络，即ScaoedNet，用于复杂真实图像去噪

该方法是通过在去噪代价函数中引入潜空间、噪声信息和引导约束而衍生出来的。

我们提出了一种自我修正的交替优化算法，将新的代价函数分解为三个交替子问题，即引导表示（GR）、退化估计（DE）和重建（RE）子问题。

最后，我们通过由GR、DE和RE网络组成的深度展开网络实现优化过程。

为了提高DE网络的性能，我们提出了一种新的无参数噪声特征自适应增强（NFAE）层。

为了在RE网络中同步和动态实现内部-外部特征信息挖掘，我们提出了一种新颖的特征多模调制注意力（FM2A）模块。

因此，我们的方法利用了深度学习的优势，同时也受益于经典模型基公式提供的原则性去噪。

据我们所知，我们的增强潜空间盲模型、优化方案、NFAE和FM2A在之前的文献中尚未报道。

实验结果显示，ScaoedNet在真实图像去噪方面表现出色。