---
layout:     post
title:      "【深度学习】YOLO9000(YOLO V2): Better, Faster, Stronger"
subtitle:   ""
date:       2022-09-02
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - Detection
    - CVPR 2017
---

# Abstract

这篇文章提出的YOLO9000是一款最先进的实时物体检测系统，可以检测9000多种物体类别。

首先，作者对YOLO检测方法提出了各种改进，既有新提出的也有借鉴了之前的工作。

改进后的模型YOLOv2在PASCAL VOC和COCO等标准检测任务上是最先进的。

作者采用了一种新的多尺度训练方法，同样的YOLOv2模型可以在不同的尺寸下运行，在速度和精度之间提供了一种简单的权衡。

在67帧/秒的情况下，YOLOv2在VOC 2007上获得了76.8的mAP。

在40帧/秒的情况下，YOLOv2获得了78.6的mAP，比使用ResNet的Faster R-CNN和SSD等最先进的方法表现得更好，同时仍然运行得更快。

最后提出了一种目标检测与分类的联合训练方法。

利用该方法，作者在COCO检测数据集和ImageNet分类数据集上同时训练YOLO9000。

作者的联合训练允许YOLO9000预测没有标记物体类别的检测数据的检测。

作者在ImageNet检测任务上验证了该方法。

YOLO9000在ImageNet检测验证集上获得19.7 的mAP，尽管只有检测数据200个类中的44个类。

不在COCO的156个类别中，YOLO9000获得了16.0 mAP。

YOLO可以检测到的类别不止200个; 它预测了9000多种不同物体类别的检测结果。

# Conclusion