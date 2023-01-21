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