---
layout:     post
title: 【深度学习】PnP-HSI：Deep plug-and-play priors for spectral snapshot compressive imaging
subtitle:   ""
date:       2022-08-20
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - HSI
    - Photonics Research 2021
---

# Abstract

这篇文章提出了一种即插即用(PnP)方法，使用基于深度学习的去噪作为光谱快照压缩成像(SCI)的正则化先验。

该方法在重构质量和速度权衡方面是有效的，并且足够灵活，可以用于不同的压缩编码机制。

作者在两个模拟和五个不同的光谱SCI系统中展示了效率和灵活性，并表明提出的深度PnP先验可以通过一个基于优化框架的简单插件实现最先进的结果。

这为在一个快照中捕获和恢复多光谱或高光谱信息铺平了道路，这可能会激发在遥感、生物医学科学和材料科学中有趣的应用。


# Conclusion

这篇文章开发了一种用于光谱SCI重构的深度PnP算法。作者为 高/多光谱 图像训练了一个深度 denoiser 并将它插入 ADMM 和 TwIST 框架用于不同的光谱 CS 系统。重要的是，单个预训练 denoiser 可以应用于具有不同的设置的系统。因此，作者提出的算法具有很高的灵活性，可以在不同的实际应用中使用。在不同系统获取的仿真和真实数据上的大量结果验证了所提出的算法的性能。

运行时间与 spectral bands 数量呈线性比例关系，因为每个 spectral band 都通过将其相邻的 K 个 bands 作为输入单独去噪。提出的光谱SCI PnP方法存在两个局限性。首先，它存在泛化问题和数据集 bias，这是监督方法常见的问题(例如，当将其应用于具有数百个波段的遥感应用时，对精细光谱分辨率数据集进行微调或重新训练)。其次，有时它需要一个良好的初始化。由于降噪训练在高斯噪声上，它可能很难处理SD-CASSI的 spaital shifts。像GAP-TV这样良好的初始化可以起到挽救作用。对于这种PnP方法，考虑model-induced noise 的去噪是可取的。