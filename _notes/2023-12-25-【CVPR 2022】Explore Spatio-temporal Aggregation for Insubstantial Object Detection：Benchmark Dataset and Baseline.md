---
layout:     post
title:      "【CVPR 2022】Explore Spatio-temporal Aggregation for Insubstantial Object Detection: Benchmark Dataset and Baseline"
subtitle:   ""
date:       2023-12-25
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - CVPR 2022
---

# Abstract

我们致力于一个较少探索的任务，名为“非实体对象检测”（IOD），其目标是定位具有以下特征的对象：（1）形状不规则，边界不明显；（2）与周围环境相似；（3）无颜色。

因此，区分单一静态帧中的非实体对象远比普通任务更具挑战性，空间与时间信息的协同表达至关重要。

因此，我们构建了一个包含600个视频（141,017帧）的IOD-视频数据集，涵盖了不同的距离、大小、可见度和场景，这些视频是由不同的光谱范围捕获的。

此外，我们为IOD开发了一个时空聚合框架，在该框架中部署了不同的基础网络，并精心设计了时空聚合损失（STAloss），以利用时间轴上的一致性。

在IOD-视频数据集上进行的实验表明，时空聚合可以显著提高IOD的性能。我们希望我们的工作能吸引更多研究者关注这一有价值但富有挑战性的任务。