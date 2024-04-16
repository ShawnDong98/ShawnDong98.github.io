---
layout:     post
title:      "【ICCV 2023】HSDT：Hybrid Spectral Denoising Transformer with Guided Attention"
subtitle:   ""
date:      2024-04-16
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - ICCV 2023
    - 
---

# Abstract

在这篇论文中，我们提出了一种用于高光谱图像去噪的混合光谱去噪 Transformer（HSDT）。

采用 Transformer 用于 HSI 的挑战来自于解决基于 CNN 的方法在捕获全局和局部空间-光谱相关性方面的现有限制，同时保持效率和灵活性的能力。

为了解决这些问题，我们引入了一种混合方法，结合了两种模型的优势，包括空间-光谱可分离卷积（S3Conv）、引导光谱自注意力（GSSA）和自调节前馈网络（SM-FFN）。

我们的S3Conv作为3D卷积的轻量级替代品，能够提取更多的空间-光谱相关特征，同时保持处理具有任意波段数量的HSI的灵活性。

然后，这些特征通过GSSA进行自适应处理，GSSA通过一组可学习的查询引导，跨光谱波段执行3D自注意力，编码了光谱特征。

这不仅丰富了我们的模型，使其具有识别全局光谱相关性的强大能力，而且还保持了线性复杂度。

此外，我们的SMFFN提出了自调节机制，增强了更具信息量的区域的激活，进一步增强了聚合特征。

我们在模拟和真实世界的各种数据集上进行了大量实验，结果表明，我们的 HSDT 在保持低计算开销的同时，显著优于现有的最先进方法。
