---
layout:     post
title: "【深度学习】BEVFormer：Learning Bird’s-Eye-View Representation from Multi-Camera Images via Spatiotemporal Transformers"
subtitle:   ""
date:       2022-10-29
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习 
    - Detection
    - ECCV 2022
---

# Abstract

3D视觉感知任务，包括基于多相机图像的3D检测和地图分割，对于自动驾驶系统至关重要。

在这项工作中，作者提出了一个称为 BEVFormer 的新框架，该框架使用时空变压器学习统一的BEV表示，以支持多个自动驾驶感知任务。

简而言之，BEVFormer 发掘空间与时间信息通过预定义的网格形状 BEV queries 与空间和时间空间交互。

为了聚合空间信息，作者设计了空间交叉注意力，每个 BEV query 从跨相机视图感兴趣的区域中提取空间特征。

对于时间信息，作者提出时间上的自注意力，以反复融合历史BEV信息。

所提出的方法在 nuScenes 测试集的NDS指标方面实现了新的最先进的56.9%，比之前的最好方法高9.0点，与基于激光雷达的基线的性能相当。

我们进一步表明，BEVFormer 显著提高了低能见度条件下物体的速度估计和召回的准确性。

# Conclusion

在这项工作中，作者提出了BEVFormer从多相机输入生成鸟瞰特征。

BEVFormer可以有效地聚合空间和时间信息，并生成强大的BEV特征，同时支持3D检测和地图分割任务。

**Limitations.** 目前，基于相机的方法在效果和效率上与基于激光雷达的方法仍然存在一定差距。