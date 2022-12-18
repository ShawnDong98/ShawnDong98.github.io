---
layout:     post
title:      "【深度学习】VoxelNet：End-to-End Learning for Point Cloud Based 3D Object Detection"
subtitle:   ""
date:       2022-12-18
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     true
tags:
    - 深度学习
    - Detection
    - CVPR 2018
---

# Abstract

准确检测3D点云中的物体是许多应用的核心问题，例如自主导航、家政机器人和增强/虚拟现实。

为了将高度稀疏的激光雷达点云与区域提议网络（RPN）连接起来，大多数现有工作都集中在手工制作的特征表示上，例如，鸟瞰投影。

在这项工作中，作者消除了3D点云手动特征工程的需要，并提出了VoxelNet，这是一个通用的3D检测网络，将特征提取和边界框预测统一到单阶段的端到端可训练深层网络中。

具体而言，VoxelNet将点云划分为间隔相同的3D体素，并通过新引入的体素特征编码（VFE）层将每个体素中的一组点转换为统一的特征表示。

通过这种方式，点云被编码为 descriptive volumetric 表征，然后连接到RPN以生成检测。

KITTI汽车检测基准的实验表明，VoxelNet的表现远远优于最先进的基于激光雷达的3D检测方法。

此外，该网络学习了对具有各种几何形状的物体的有效判别性表示，从而在仅基于激光雷达对行人和非机动车的人进行3D检测方面产生令人激动的结果。

# Methods

# Conclusion