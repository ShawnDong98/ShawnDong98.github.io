---
layout:     post
title:      "【深度学习】DAIR-V2X: A Large-Scale Dataset for Vehicle-Infrastructure Cooperative 3D Object Detection"
subtitle:   ""
date:       2022-11-25
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     true
tags:
    - 深度学习
    - Detection
    - CVPR 2022
---

# Abstract

由于缺乏全局视角和远程感知能力受到限制，自动驾驶面临巨大的安全挑战。

人们普遍认为，实现 L5 级自动驾驶需要车辆-基础设施合作。

然而，仍然没有来自真实场景的数据集可供计算机视觉研究人员研究与车辆-基础设施合作相关的问题。

为了加快车辆-基础设施合作自动驾驶（VICAD）的计算机视觉研究和创新，作者发布了 DAIR-V2X 数据集，这是VICAD真实场景中第一个大规模、多模态、多视图的数据集。

DAIR-V2X 由 71254 帧 LiDAR 数据和71254帧相机数据组成，所有帧都从真实场景中3D标注的。

作者介绍了车辆-基础设施合作3D目标检测问题（VIC3D），提出了使用车辆和基础设施的传感器输入协作定位和识别3D目标的问题。

除了解决传统的3D目标检测问题外，VIC3D的解决方案还需要考虑车辆和基础设施传感器之间的时间异步问题以及它们之间的数据传输成本。

此外，作者提出 Time Compensation Late Fusion（TCLF），这是VIC3D任务的后期融合框架，作为基于DAIR-V2X 的基准。


# Conclusion

这篇文章介绍了DAIR-V2X，这是第一个用于车辆基础设施合作自动驾驶的大规模、多模态、多视图数据集，所有帧都从真实场景中3D标注的。

作者还定义了 VIC3D 目标检测，以制定使用车辆和基础设施的传感器输入协作定位和识别3D目标的问题。

除了解决传统的3D目标检测问题外，VIC3D的解决方案还需要解决车辆和基础设施传感器之间的时间异步问题以及它们之间的数据传输成本。

为了便于未来的研究，作者提出的 Time Compensation Late Fusion 框架为检测模型提供了一个VIC3D基准，以及车辆视图和基础设施视图数据集3D检测的基准。