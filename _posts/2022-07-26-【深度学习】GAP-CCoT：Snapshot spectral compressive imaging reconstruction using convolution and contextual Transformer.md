---
layout:     post
title:      "【深度学习】GAP-CCoT：Snapshot spectral compressive imaging reconstruction using convolution and contextual Transformer"
subtitle:   ""
date:       2022-07-26
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - HSI
    - Optica 2022
---


# Abstract

光谱压缩成像(Spectral compression imaging, SCI)是将高维的高光谱图像编码为二维的快照 measurement，然后利用算法重建空间-光谱数据立方。

这篇文章提出了一种混合网络模块，即convolution 和 contextual Transformer(CCoT)，它可以同时获得卷积的 inductive bias 能力和 Transformer 强大的建模能力，有利于提高重构质量，恢复细节。

作者将提出的 CCoT 块集成到一个基于 generalized alternating projection(GAP)算法的物理驱动的深度展开框架中，并进一步提出GAP-CCoT网络。

最后，作者将GAP-CCoT算法应用于SCI重建。通过对大量的生成数据和真实数据进行实验，所提出的模型比现有的SOTA算法实现了更高的重构质量(在模拟基准数据集上 >2dB 峰值信噪比)和更短的运行时间。

# Conclusion And Discussion

这篇文章利用卷积的 inductive bias 能力和 Transformer 强大的建模能力，提出了一个并行模块，名为CCoT，可以获得更有效的光谱特征。作者将该模块与物理驱动的深度展开思想和GAP算法相结合，可以很好地应用于SCI重构。

此外，作者还开发了类似的 video CS模型[14,27,73]，该模型取得了很好的效果，总结在表7和图8中。该方法可以获得更高的重建质量和更多的细节。如表8所示，作者进一步分析了GAP-CCoT的计算复杂度，并与之前的SOTA重构算法进行了比较。由于加入了CA机制和Transformer模块，我们的算法比以往一些基于深度学习的算法(U-net、MetaSCI、GAP-net)具有更多的参数和运行时间，但这些模块在重构质量上带来了显著的改善，提出的方法保持了较高的实时性(0.064 s)。此外，该算法的实时性优于其他高精度重建算法，如BIRNAT (0.165 s)和RevSCI(0.190 s)。通过对提出的网络进行微调，应该能够在视频CS[79,80]和其他重建任务[32,81 92]中实现SOTA结果。

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1658826675176.png)

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1658826710336.png)