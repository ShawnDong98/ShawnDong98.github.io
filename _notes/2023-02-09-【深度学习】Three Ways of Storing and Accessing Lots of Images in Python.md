---
layout:     post
title:      "【深度学习】Three Ways of Storing and Accessing Lots of Images in Python"
subtitle:   ""
date:       2023-02-09
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    -
---
为什么你想知道更多关于Python中存储和访问图像的不同方法？如果您正在使用OpenCV根据颜色分割少量图像或逐个检测人脸，那么您无需关心它。即使您正在使用Python图像库(PIL)绘制几百张照片，也不需要这样做。将图像存储在磁盘上更合适，如.png或.jpg文件。

然而，给定任务所需的图像数量越来越大。像卷积神经网络(也称为卷积网络或cnn)这样的算法可以处理庞大的图像数据集。

ImageNet是一个著名的公共图像数据库，用于分类、检测和分割等任务的训练模型，它由超过1400万张图像组成。想想把它们全部加载到内存中进行批量训练需要多长时间。


# Setup

## A Dataset to Play With

我们将使用 CIFAR-10 数据集，它由 60000 张 32x32 像素的彩色图像组成，属于不同的类别，如狗、猫和飞机。相对而言，CIFAR不是一个非常大的数据集，但如果我们要使用完整的TinyImages数据集，那么您将需要大约400GB的空闲磁盘空间，这可能是一个限制因素。

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1675912809536.png)

## Setup for Storing Images on Disk

## Getting Started With LMDB


## Getting Started With HDF5

