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