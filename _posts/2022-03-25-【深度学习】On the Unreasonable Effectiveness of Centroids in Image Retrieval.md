---
layout:     post
title:      "【深度学习】On the Unreasonable Effectiveness of Centroids in Image Retrieval"
subtitle:   ""
date:       2022-03-25
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - 
---

# Abstract
图像检索任务包括从一组图库(数据库)图像中查找与查询图像相似的图像。

这些系统可用于各种应用，例如人员再识别(ReID)或视觉产品搜索。

尽管检索模型得到了积极的发展，但由于视角、光照、背景杂波或遮挡的变化引起的类内方差较大，而类间方差可能相对较低，因此仍是一项具有挑战性的任务。

目前的大部分研究集中在创建更健壮的特征和修改目标函数，通常基于TripletLoss。

一些工作尝试在 Tiplet Loss 上使用 centroid/proxy 一个类别表征以缓解计算速度和hard sample mining的问题。

然而，这些方法只用于训练，在检索阶段被抛弃。

这篇文章提出在训练和检索过程中使用mean centroid 表征。

这样的聚合表征对异常值更健壮，并确保更稳定的特征。

由于每个类都由单个嵌入(class centroid)表示，因此检索时间和存储需求都大大减少。

聚合多个嵌入后，由于候选目标向量的数量减少，搜索空间显著减小，因此该方法特别适用于生产部署。

在两个ReID和Fashion检索数据集上进行的综合实验证明了该方法的有效性，其性能优于目前的先进水平。

这篇文章提出的 centroid training 和检索作为一种可行的方法，无论是时尚检索和ReID应用。

# Conclusion

这篇文章引入了 Centroid Triplet Loss —— 一种用于实例检索任务的新的损失函数。

