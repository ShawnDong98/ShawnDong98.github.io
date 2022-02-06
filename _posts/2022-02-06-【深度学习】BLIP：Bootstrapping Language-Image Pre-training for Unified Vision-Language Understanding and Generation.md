---
layout:     post
title:      "【深度学习】BLIP: Bootstrapping Language-Image Pre-training for Unified Vision-Language Understanding and Generation"
subtitle:   ""
date:       2022-02-06
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - 
---

# Abstract

视觉语言预训练在很多视觉语言任务上有很好的表现。

然而， 大多数现有的预训练模型只是基于理解的任务或者基于生成的任务。

这篇文章提出一种可以在视觉语言理解和生成任务上灵活转换的新的VLP框架 BLIP。

BLIP 通过 bootstrap captions 利用有噪声的网络数据， 其包括一个 captioner 生成 captions 和一个 filter 删除噪声 captions。