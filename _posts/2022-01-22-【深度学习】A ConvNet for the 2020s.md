---
layout:     post
title:      "【深度学习】A ConvNet for the 2020s"
subtitle:   ""
date:       2022-01-22
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - 
---

# Abstract

普通的ViT 在目标检测和语义分割等通用计算机视觉任务上存在使用上的困难。

分层的 Transformer (Swin Transformer) 引入 ConvNet 的先验， 使得 Transformer 可以作为通用视觉任务的主干， 并且表现出强大的性能。

我们将标准的ResNet逐步现代化， 使其向 vision Transformer 的设计看齐， 并且发现了几个关键的组件导致性能上的差异。

# Conclusion