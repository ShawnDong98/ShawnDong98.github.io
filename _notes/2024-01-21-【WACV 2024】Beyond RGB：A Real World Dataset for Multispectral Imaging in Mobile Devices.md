---
layout:     post
title:      "【WACV 2024】Beyond RGB: A Real World Dataset for Multispectral Imaging in Mobile Devices"
subtitle:   ""
date:       2024-01-21
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - WACV 2024
    - 深度学习
---

# Abstract


多光谱（MS）成像系统在计算机视觉和计算摄影任务中有广泛的应用，但由于其高昂的成本而尚未得到广泛的采用。

最近，光子超材料的设计和制造的进步，使得适合整合到消费级移动设备中的MS传感器的发展成为可能。

用更丰富的光谱信息来强化现有的RGB相机和它们的处理算法，有可能在图像处理流程的许多步骤中得到利用，但是不同的现实世界数据集适合进行这样的研究并不免费提供。

我们介绍了Beyond RGB，这是一个包含数千张多光谱和RGB图像的现实世界数据集，在多样化的现实世界和实验室条件下，适用于开发和评估使用多光谱和RGB数据的算法。

我们数据集中的所有场景都包含了色度参考和场景光源光谱的测量。

此外，我们通过引入一种新的光源光谱估计（ISE）算法，展示了我们数据集的实际用途。

我们的算法在已建立的基准测试中超越了目前的最先进技术（SoTA）高达58.6%，并在我们自己的数据集上设定了基线性能。