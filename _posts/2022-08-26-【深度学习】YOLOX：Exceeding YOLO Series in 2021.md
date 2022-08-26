---
layout:     post
title:      "【深度学习】YOLOX: Exceeding YOLO Series in 2021"
subtitle:   ""
date:       2022-08-26
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - CV
    - Arxiv 2021
---

# Abstract

在这份报告中，作者介绍了YOLO系列的一些实验改进，形成了一种新的高性能探测器YOLOX。

作者将YOLO检测器转换为 Anchor-free 的方式，并实现了其它先进的检测技术。

此外，作者使用单一的YOLOX-L模型赢得了 Streaming Perception 挑战(CVPR 2021年自动驾驶研讨会)的第一名。

# Conclusion

在这份报告中，作者介绍了YOLO系列的一些更新，它形成了一个高性能的 Anchor-free 检测器，称为YOLOX。

装备了一些最新的先进探测技术，例如YOLOX采用 decoupled head、anchor-free 和先进的标签分配策略，在所有模型尺寸上比其他同行实现了更好的速度和准确性之间的权衡。

值得注意的是，作者将YOLOv3的架构提升到了47.3% AP，比当前的最佳实践高出3.0% AP。YOLOv3由于其广泛的兼容性，仍然是工业上使用最广泛的探测器之一。
