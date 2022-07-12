---
layout:     post
title:      "【深度学习】HerosNet: Hyperspectral Explicable Reconstruction and Optimal Sampling Deep Network for Snapshot Compressive Imaging "
subtitle:   ""
date:       2022-07-12
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - HSI
    - CVPR 2022
---

# Abstract

高光谱成像是一种重要的成像方式的广泛应用，特别是在遥感，农业和医学。

现有的高光谱相机速度慢、价格贵、体积大，受此启发，从低预算的快照测量中重建高光谱图像(HSIs)引起了广泛关注。

将截断的数值优化算法映射到具有固定相位数的网络中，近年来用于光谱快照压缩感知(SCI)的深度展开网络(DUNs)取得了显著的成功。

然而，由于缺乏跨相位特征交互和参数自适应调整，DUNs还远远没有达到工业应用的范围。

这篇文章提出了一个新的高光谱可解释重建和最优采样深度网络，称为HerosNet，它在 ISTA-unfolding 框架下包括几个阶段。

在梯度下降步骤中，每个相位可以灵活地模拟感知矩阵，根据上下文调整步长; 在近端映射步骤中，可以分层融合和交互前一阶段的隐藏状态，有效地恢复当前的HSI帧。

同时，学习到一个硬件友好的最优二值掩码，以进一步提高重构性能。

最后，经过验证，HerosNet在模拟和真实数据集上的性能都大大超过了最先进的方法。

# Conclusion

这篇文章提出了一种新的用于光谱快照压缩成像的HerosNet。

在ISTA的启发下，HerosNet展现了优化迭代过程，能够联合优化二值掩码，准确重建 HSI。

为了提高网络的泛化能力和灵活性，提出了一种动态梯度下降模块，实现自适应和内容感知的参数调整。

为了更好地利用交叉相位相关性，设计了分层特征交互模块，将不同相位之间的有用信息进行融合和交互。

最后，实验表明，网络在模拟和真实数据集上都优于最先进的方法。