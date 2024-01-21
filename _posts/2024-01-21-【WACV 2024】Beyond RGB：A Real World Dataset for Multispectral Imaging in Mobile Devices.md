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

多光谱（MS）成像系统在计算机视觉和计算摄影任务中有着广泛的应用，但由于其昂贵的成本，尚未被广泛采用。

最近，光子超材料的设计和制造方面的进展使得可以开发适用于嵌入消费级移动设备的多光谱传感器。

通过在现有的RGB相机和其处理算法中增加更丰富的光谱信息，有潜力在图像处理流程的许多步骤中得到应用，但用于进行这种研究的多样化真实世界数据集并不免费提供。

我们介绍了Beyond RGB，这是一个包含成千上万张多光谱和RGB图像的真实世界数据集，涵盖了多种真实世界和实验室条件，适用于利用多光谱和RGB数据的算法的开发和评估。

我们数据集中的所有场景都包括色度参考和场景光源光谱的测量。

此外，我们通过引入一种新的光源光谱估计（ISE）算法展示了我们数据集的实际用途。

我们的算法在已建立的基准测试上超过了当前的最新技术（SoTA），在我们自己的数据集上设定了一个基准性能，最高提升了58.6%。