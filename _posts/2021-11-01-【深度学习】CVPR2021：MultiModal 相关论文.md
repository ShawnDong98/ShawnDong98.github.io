---
layout:     post
title:      "【深度学习】CVPR2021：MultiModal 相关论文"
subtitle:   ""
date:     2021-11-01
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - 
---


# Human-like Controllable Image Captioning with Verb-specific Semantic Roles

Controllable Image Captioning (CIC) —— 根据指定的控制信号生成图像描述 —— 在过去的几年里受到了前所未有的关注。 为了模仿人类控制描述生成的能力，目前的CIC研究只关注与客观属性有关的控制信号，如 contents of interest 或 descriptive patterns。然而，几乎所有现有的客观控制信号都忽略了理想控制信号的两个不可缺少的特性： 1）Event-compatible: 在一句话中提到的所有视觉内容都应该与所描述的活动相兼容。2）Sample-suitable: 控制信号应该适合于特定的图像样本。为此，这篇文章为CIC提出了一种新的控制信号: Verb-specific Seman-tic Roles (VSR)。VSR由一个动词和一些语义角色组成，表示目标活动和该活动中涉及的实体角色。给定一个设计好的的VSR,，首先训练一个  grounded semantic role labeling (GSRL)模型来 identify 和 ground 每个角色的所有实体。然后，提出了一个 semantic structure planner (SSP) 来学习像人类一样的 descriptive semantic structures。最后，使用 role-shift captioning 模型来生成描述。


这篇文章认为所有现有的CIC客观控制信号都忽略了两个不可缺少的特性: event-compatibl和sample-suitable。