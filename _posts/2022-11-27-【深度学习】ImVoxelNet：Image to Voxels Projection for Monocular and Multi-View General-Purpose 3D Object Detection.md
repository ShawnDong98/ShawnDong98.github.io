---
layout:     post
title:      "【深度学习】ImVoxelNet: Image to Voxels Projection for Monocular and Multi-View General-Purpose 3D Object Detection"
subtitle:   ""
date:       2022-11-27
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     true
tags:
    - 深度学习
    - Detection
---

# Abstract

这篇文章介绍了基于多视图 RGB 的3D目标检测作为端到端优化问题的任务。

为了解决这个问题，作者提出了ImVoxelNet，这是一种基于  posed monocular 或多视图 RGB 图像的3D目标检测的新型全卷积方法。

在训练和推理过程中，每个多视图输入中的单目图像数量可能会发生变化；事实上，每个多视图输入的弹幕图像数量可能都不一样。

ImVoxelNet成功处理室内和室外场景，使其成为通用的。

具体来说，在所有接受 RGB 图像的方法中，它在 KITTI（单目）和 nuScenes（多视图）基准测试上实现了最先进的汽车检测结果。

此外，它超过了 SUN RGB-D 数据集上现有的基于 RGB 的 3D 目标检测方法。

在ScanNet上，ImVoxelNet为多视图3D目标检测设定了新的基准。


# Conclusion

这篇文章将基于多视图RGB的3D目标检测作为端到端优化问题。

为了解决这个问题，这篇文章提出了ImVoxelNet，这是一种针对给定单目或多视图RGB输入的3D目标检测的新的全卷积方法。

在训练和推理期间，ImVoxelNet接受具有任意数量视图的多视图输入。

此外，该方法可以接受单目输入（被视为多视图输入的特殊情况）。

该方法在单目KITTI基准和多视图nuScenes基准测试的户外汽车检测方面取得了最先进的结果。

此外，它在室内的 SUN RGB-D 数据集上超过了现有的3D目标检测方法。