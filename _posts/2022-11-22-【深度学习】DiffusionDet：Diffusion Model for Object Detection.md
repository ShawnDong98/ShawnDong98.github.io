---
layout:     post
title:      "【深度学习】DiffusionDet: Diffusion Model for Object Detection"
subtitle:   ""
date:       2022-11-22
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - Detection
    - Arxiv 2022
---

# Abstract

作者提出了DiffusionDet，这是一个新的框架，用于将目标检测模拟为从噪声边界框到目标边界框的去噪扩散过程。

在训练阶段，目标边界框从真实边界框扩散到随机分布，模型学会了扭转这个噪声过程。

