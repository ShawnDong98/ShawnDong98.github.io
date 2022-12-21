---
layout:     post
title:      "【深度学习】SECOND: Sparsely Embedded Convolutional Detection"
subtitle:   ""
date:       2022-12-21
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     true
tags:
    - 深度学习
    - Detection
---

# Abstract

基于激光雷达或基于RGB-D的目标检测用于许多应用，从自动驾驶到机器人视觉。

基于Voxel的3D卷积网络已经使用了一段时间，以提高处理点云激光雷达数据时的信息保留率。

然而，问题仍然存在，包括推理速度缓慢和方向估计性能低。

因此，作者研究了一种改进的此类网络稀疏卷积方法，该方法显著提高了训练和推理的速度。

作者还引入了一种新形式的角度损失回归，以提高定向估计性能，以及一种可以提高收敛速度和性能的新数据增强方法。

所提出的网络在 KITTI 3D目标检测基准上产生了最先进的结果，同时保持了快速的推理速度。

# SECOND Detector

在本节中，作者描述了所提出的 SECOND 检测器的架构，并介绍了有关训练和推断的相关细节。


## Network Architecture

如图1所示，所提出的 SECOND 检测器由三个部分组成：（1）体素级别特征提取器；（2）稀疏的卷积中间层；以及（3）RPN。

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1671600167480.png)

### Point Cloud Grouping

在这里，作者遵循[14]中描述的简单程序来获得点云数据的体素表征。我们首先根据对体素数量限制预先分配缓冲区；然后，在点云上迭代，并将点分配给它们关联的体素，然后保存体素坐标和每个体素的点数。在迭代过程中，根据哈希表检查体素的存在。如果与某个点相关的体素尚不存在，我们会在哈希表中设置相应的值；否则，我们会将体素的点数增加一。