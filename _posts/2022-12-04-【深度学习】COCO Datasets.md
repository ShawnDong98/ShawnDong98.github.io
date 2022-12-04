---
layout:     post
title:      "【深度学习】COCO Datasets"
subtitle:   ""
date:       2022-12-04
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     true
tags:
    - 深度学习
    - CV
---



# Overview

应该下载哪些 dataset splits? 每年的图像都与不同的任务相关联。具体地说:

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1670140458552.png)

如果你要提交2017年、2018年、2019年或2020年的任务，你只需要下载2017年的图片。你可以忽略之前的 split 。注: split 年份是指 image splits 发布的年份，而不是标注发布的年份。

**2020 Update：** 所有挑战的所有数据保持不变。

**2019 Update:**  所有挑战的所有数据保持不变。

**2018 Update:** 检测和关键点数据不变。2018年新推出，2017年所有图片的完整 stuff 和 panoptic 标注都可以使用。 注： 如果你下载了 06/17/2018 之前的 stuff 标注， 请重新下载。

**2017 Update:** 2017年的主要变化是，根据社区反馈，train/val的 split 现在不是83K/41K train/val split，而是118K/5K。使用相同的图像，没有提供新的检测/关键点标注。2017年新增的是 40K 训练图片(2017年118K 训练图片的子集) 和 5K val 图片上的 stuff 标注。此外，对于测试，在2017年，测试集只有两个 split(dev/challenge），而不是前几年使用的四个split（dev/standard/reserve/challenge）。最后，在2017年，将发布来自COCO的120K未标记图像，这些图像遵循与标记图像相同的类分布; 这对于COCO上的半监督学习可能是有用的。

# COCO API

COCO API有助于在COCO中加载、解析和可视化标注。