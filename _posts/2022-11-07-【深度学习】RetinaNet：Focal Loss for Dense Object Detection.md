---
layout:     post
title:      "【深度学习】RetinaNet：Focal Loss for Dense Object Detection"
subtitle:   ""
date:       2022-11-07
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags: 'Detection,ICCV 2017'
    - 深度学习
    - Detection
    - ICCV 2017
---

# Abstract

迄今为止，精度最高的目标检测器基于 R-CNN 推广的两阶段方法，其中分类器应用于一组稀疏的候选目标定位。

相比之下， 密集采样的单阶段探测器有可能更快、更简单，但到目前为止，已经落后于两阶段检测器的准确性。

这篇文章调查了为什么会这样。

作者发现，在训练密集检测器时遇到的前景-背景类不平衡是核心原因。 

作者提出通过重塑标准交叉熵损失，降低分配给分类良好的样本的损失的权重，来解决这种类不平衡。

作者提出的 focal loss 将训练重点放在一组稀疏的困难样本上，并防止大量容易的样本在训练期间压倒检测器。

为了评估损失的有效性，作者设计并训练了一种称为 RetinaNet 的简单密集检测器。

该结果表明，当对 focal loss 进行训练时，RetinaNet能够匹配之前单阶段检测器的速度，同时超过所有现有最先进的两阶段检测器的准确性。




# Conclusion

