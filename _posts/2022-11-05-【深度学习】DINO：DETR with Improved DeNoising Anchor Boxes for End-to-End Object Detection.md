---
layout:     post
title:      "【深度学习】DINO：DETR with Improved DeNoising Anchor Boxes for End-to-End Object Detection"
subtitle:   ""
date:       2022-11-05
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习 
    - Detection
    - Arxiv 2022
---

# Abstract

这篇文章提出 DINO（DETR with Improved deNoising anchOr boxes），一种最先进的端到端目标检测器。

与之前类似DETR的模型相比，DINO通过使用对比方法进行去噪训练、用于先验框初始化的 mixed query selection 方法以及用于边界框预测的 look forward twice scheme，在性能和效率方面有所提高。

# Conclution