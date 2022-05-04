---
layout:     post
title:      "【深度学习】LoFTR: Detector-Free Local Feature Matching with Transformers "
subtitle:   ""
date:       2022-05-04
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - 
---

# Abstract
这篇文章提出了一种新的图像局部特征匹配方法。

这篇文章建议先在粗级别上建立像素级密集匹配，然后在细级别上细化好的匹配，而不是依次进行图像特征检测、描述和匹配。

与使用 cost volume 来搜索对应关系的密集方法相比，我们使用transformer中的自注意力和交叉注意力层来获得以两幅图像为条件的特征描述符。

Transformer提供的全局感受野使该方法能够在低纹理区域产生密集匹配，在那里特征检测器通常很难产生重复的兴趣点。

在室内和室外数据集上的实验表明，LoFTR在很大程度上超越了最先进的方法。

在已发布的方法中，LoFTR在可视化本地化的两个公共基准测试中也排名第一。

# Conclusion
