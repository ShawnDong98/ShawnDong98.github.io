---
layout:     post
title:      "【深度学习】UNSUPERVISED VISION-LANGUAGE GRAMMAR INDUCTION WITH SHARED STRUCTURE MODELING "
subtitle:   ""
date:       2022-04-07
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - 
---

# Abstract

这篇文章提出一个新任务， 无监督视觉语言语法归纳。

给定一个 image-caption 对，目标是同时提取图像和语言的共享层次结构。

这种基于两种模态的结构化输出，是朝着对多模态信息的高层次理解迈出的明确一步。

除了传统的可视化语法归纳任务中存在的挑战外，VL语法归纳还需要一个模型来捕获上下文语义并执行细粒度对齐。

为了解决这些问题，这篇文章提出了一种新的方法CLIORA，该方法为树的不同层次的所有成分构建了一个共享的视觉-语言区域树结构，该结构具有上下文相关的语义。

它通过对比学习训练计算每个组成部分和图像区域之间的匹配分数。

它集成了两个层级的融合，即score-level 和 feature-level，从而允许细粒度的对齐。

最后引入了一个新的评估指标: Critical Concept Recall Rate, (CCRR)来显式评估VL语法归纳，在Flickr30k实体上显示出了2.6%的改进。

通过两个派生任务来评估模型，即语言语法归纳和 phrase grounding，并在这两个方面都进行了改进。
# Conclusion