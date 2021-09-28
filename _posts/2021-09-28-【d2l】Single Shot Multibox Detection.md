---
layout:     post
title:      "【d2l】Single Shot Multibox Detection"
subtitle:   ""
date:       2021-09-28
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - d2l
    - 
---


# Model

图 13.7.1 展示了 single-shot multibox detection 的总体设计。这个模型主要由 base network 后面跟着几个多尺度特征图块组成。base network 从输入图片中提取特征， 因此他可以使用一个深度CNN。 例如， 原始 single-shot multibox detection 论文采用在分类层前截断的 VGG 网络， 而现在通常使用 ResNet。 

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1632817235242.png)