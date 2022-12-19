---
layout:     post
title:      "【深度学习】Are we ready for Autonomous Driving? The KITTI Vision Benchmark Suite"
subtitle:   ""
date:       2022-12-18
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     true
tags:
    - 深度学习
    - Detection
    - CVPR 2012
---

# Abstract

今天，视觉识别系统在机器人应用中仍然很少使用。

也许其中一个主要原因是缺乏模仿此类场景的基准。

这篇文章利用自动驾驶平台，为stereo、光流、visual odometry /SLAM和3D目标检测等任务开发了具有挑战性的新基准。

记录平台配备了四台高分辨率摄像机、一台 Velodyne 激光扫描仪和最先进的定位系统。

我们的基准包括389个 stereo 和光流图像对，39.2公里长的 visual odometry 序列，以及在杂乱场景中捕获的200多万个3D目标注释（每张图像最多可见15辆车和30名行人）。

最先进的算法结果表明，在Middlebury等既定数据集中排名靠前的方法在转移到现实世界之外时表现低于平均水平。

作者的目标是通过为计算机视觉社区提供具有新的具有挑战性的基准来减少这种偏差。

# Conclusion

作者对现有方法有了新的了解，作者希望提出的基准将补充其他基准，帮助减少对几乎没有训练样本或测试样本的数据集的过拟合，并有助于开发在实践中运行良好的算法。