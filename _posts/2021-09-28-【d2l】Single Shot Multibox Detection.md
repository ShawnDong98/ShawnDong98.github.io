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

图 13.7.1 展示了 single-shot multibox detection 的总体设计。这个模型主要由 base network 后面跟着几个多尺度特征图块组成。base network 从输入图片中提取特征， 因此他可以使用一个深度CNN。 例如， 原始 single-shot multibox detection 论文采用在分类层前截断的 VGG 网络， 而现在通常使用 ResNet。 通过我们的设计我们可以使 base network 输出更大的特征图， 以此产生更多用于检测更小物体的 anchor框。 随后， 每个多尺度特征图块相比之前的块减小特征图的高和宽， 使特征图而对每个像素增加它在输入图像上的感受野。

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1632817235242.png)