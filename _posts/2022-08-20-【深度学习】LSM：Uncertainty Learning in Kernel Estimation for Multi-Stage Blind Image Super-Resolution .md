---
layout:     post
title:      "【深度学习】LSM：Uncertainty Learning in Kernel Estimation for Multi-Stage Blind Image Super-Resolution "
subtitle:   ""
date:       2022-08-20
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - ECCV 2022
---

# Abstract

传统的盲超分辨算法首先从低分辨率图像中估计未知的退化信息，然后利用退化信息进行图像重建。

这种顺序的方法有两个根本的弱点——即缺乏鲁棒性(当估计的退化不准确时，性能会下降)和缺乏透明度(网络架构是启发式的，没有结合领域知识)。

为了解决这些问题，作者提出了一种联合最大后验概率(MAP)方法来同时估计 unknown kernel 和高分辨率图像。

该方法首先在 blue kernel 估计中引入不确定性学习，以提高对估计误差的鲁棒性。

然后作者提出了一种新的SR网络，通过展开具有学习拉普拉斯尺度混合先验(LSM)和 estimated kernel 的联合MAP estimator。

作者还开发了一种通过深度卷积神经网络(DCNN)估计LSM模型的尺度先验系数和局部均值的新方法。

MAP估计算法的所有参数和DCNN参数通过端到端训练联合优化。

在合成图像和真实图像上的广泛实验表明，该方法达到了最先进的性能，为盲图像SR的任务。

# Conclusion