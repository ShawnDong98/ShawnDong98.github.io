---
layout:     post
title:      "【深度学习】In Defense of Scene Graphs for Image Captioning"
subtitle:   ""
date:     2022-01-12  
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - Scene Graph
---

# Abstract

几个研究指出简单将Scene Gragh 当做黑盒使用会损害 image captioning 的性能， 基于scene graph 的 captioning 模型会过于挖掘图像特征导致难以生成得体的句子。

提出一个框架SG2Caps仅仅使用scene graph 标签生成有竞争力的 image captioning 性能。

基本的思想是拉进两个scene graph 的语义鸿沟， 一个来自图像一个来自句子。

为了达到这个目标， 我们利用了目标的空间位置以及 Human-Object-Interaction(HOI) 标签作为额外的 HOI graph。

直接利用 scene graph 标签避免了在高维CNN特征上卷积的代价， 减少了49%的可训练参数。


# Conclusion

发掘目标、属性和关系的编码对 image captioning 来说是有用的信息。 然而， 盲目地使用 visual scene graph 生成 句子难以生成合理的句子描述。 

所提出的 SG2Caps pipeline 使得预训练网络用于：

- SGDet 在其它 scene graph 数据集上 
- 大幅减小 HOI 数据集 和 COCO caption 数据集的 语义角色 的鸿沟——表明强大的 captioning 模型可以仅通过低维的目标和关系标签空间得到。