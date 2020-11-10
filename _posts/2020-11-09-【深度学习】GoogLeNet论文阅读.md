---
layout:     post
title:      "【深度学习】GoogLeNet论文阅读"
subtitle:   ""
date:       2020-11-09
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 机器学习
    - 
---


# Abstract


提出了一种叫做Inception的深度卷积神经网络结构， 在ILSVRC14中用于分类和检测。


网络结构的特点是提升了网络内部计算资源的利用率。

保持计算预算为常量， 增加网络的深度和宽度。

为了提升质量，使用了两种方法：Hebbian principle和多尺度处理。


# Introduction

GoogLeNet使用比两年前的网络少于12倍的参数量，取得了显著提升的准确率。


目标检测的最大收益不仅来自更大模型或更深模型的使用，还有深度结构和传统计算机视觉的协同， 比如R-CNN。


在测试时，将计算预算设置为150万次乘和加的操作。

这篇文章专注于深度神经网络在计算机视觉中网络结构的效率， 叫做Inception， 它的名字来自Network in Network这篇文章。

deep有两种不同的含义：
- 引入一种Inception模块
- 增加网络深度


这种结构在ILSVRC2014分类和检测挑战上得到验证， 它显著提升了SOTA的表现。


# Ralated Work

受到视觉皮层的神经科学模型的启发， 使用不同大小的滤波器来处理不同的尺度， 与Inception模型相似。

与两层固定的深度模型不同， Inception中所有的滤波器都是学习得到的。

Inception层重复多次， 产生了22层深的GoogLeNet模型。


Network in Network在卷积神经网络中可以看做1x1卷积层后跟着ReLU激活， 这使得它在CNN pipeline中非常容易集成进去。

1x1卷积有两个目的：
- 作为维度减少的模块
- 移除计算瓶颈， 计算瓶颈会限制网络的大小

这使得在没有显著地性能惩罚的情况下， 不仅增加深度， 还可以增加宽度。

现在流行的物体检测方式是R-CNN， 它将整个检测问题分解为两个子问题：
- 首先使用低级线索检测不关注类别的提议位置
- 再使用CNN分类器在这些位置识别物体种类


他们在物体检测上的这两个阶段作了一些增强， 比如在bounding box回归时的multi-box预测


# Motivation and High Level Considerations