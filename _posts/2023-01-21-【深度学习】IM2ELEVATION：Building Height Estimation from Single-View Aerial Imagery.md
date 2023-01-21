---
layout:     post
title:      "【深度学习】IM2ELEVATION: Building Height Estimation from Single-View Aerial Imagery"
subtitle:   ""
date:       2023-01-21
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - 
---

# Abstract

从单视图航空图像估计数字表面模型（DSM）和建筑高度是一个具有挑战性的病态的问题，作者在本文中通过使用机器学习来解决。

作者提出了一种端到端可训练的卷积-反卷积深度神经网络架构，该架构可以学习从单个航空图像到DSM的映射，以分析城市场景。我们执行航空光学和航空光检测和测距（激光雷达）数据的多传感器融合，为我们的流程准备训练数据。数据集质量是估算的关键。

通常，由于地理参考/投影误差、传感器校准不准确以及采集之间的场景变化，存在大量 misregistration artifacts。

为了克服这些问题，我们提出了一个 registration 程序，以改善依赖互助信息的激光雷达和光学数据对齐，然后是基于Hough转换的验证步骤来调整 misregistered 的图像块。

作者在爱尔兰都柏林市中心捕获的高分辨率数据集上验证了建筑高度估计模型：2015年的激光雷达点云和2017年的光学航空图像。

这些数据使我们能够验证所提出的 registration 程序，并从单视图航空图像进行3D模型重建。我们还报告了我们所提出架构在几个流行的DSM估计数据集上的最新性能。