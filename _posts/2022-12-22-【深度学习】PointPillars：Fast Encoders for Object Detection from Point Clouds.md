---
layout:     post
title:      "【深度学习】PointPillars: Fast Encoders for Object Detection from Point Clouds"
subtitle:   ""
date:       2022-12-22
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     true
tags:
    - 深度学习
    - Detection
    - CVPR 2019
---

# Abstract

点云中的目标检测是自动驾驶等许多机器人应用的一个重要方面。

这篇文章考虑了将点云编码为适合下游检测流程的格式的问题。

最近的文献表明，有两种类型的编码器；固定编码器往往速度快，但牺牲了准确性，而从数据中学习的编码器更准确，但速度更慢。

在这项工作中，作者提出了PointPillars，这是一种新的编码器，它利用 PointNets 来学习以 vertical columns (pillars) 组织的点云的表示。