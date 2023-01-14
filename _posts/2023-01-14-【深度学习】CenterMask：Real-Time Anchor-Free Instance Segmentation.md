---
layout:     post
title:      "【深度学习】CenterMask : Real-Time Anchor-Free Instance Segmentation"
subtitle:   ""
date:       2023-01-14
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - Detection
    - CVPR 2020
---

# Abstract

这篇文章提出了一种简单而高效的无先验框实例分割，称为CenterMask，它添加了一个新的空间注意力引导掩码（SAG-Mask）分支，以与Mask R-CNN[9]可以相比的无先验框单阶段物体探测器（FCOS [33]）。

# Method

![表格](./attachments/1673669603638.table.html)