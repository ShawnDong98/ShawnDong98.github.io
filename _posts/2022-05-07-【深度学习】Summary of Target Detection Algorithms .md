---
layout:     post
title:      "【深度学习】Summary of Target Detection Algorithms "
subtitle:   ""
date:      2022-05-07 
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - HSI
---

# Abstract

近年来，CNN的飞速发展促进了计算机视觉算法的成熟。

本文将简要介绍一些有代表性的目标检测算法，并根据其优缺点，系统分析算法存在的问题、改进方法和未来的发展方向。

针对目标检测过程中是否需要提取候选区域进行后续任务的问题，一般分为单阶段检测模型和双阶段检测模型。

在双阶段检测模型中，算法具有尺度特征，根据是否能与网络结构适当结合，将算法分为单尺度检测和多尺度检测，提高了网络模型对小目标的精度。

同时，在以 Anchor 为基础的单阶段检测模型中，还可以将 Anchor 分为基于 Anchor 和无 Anchor 两种。