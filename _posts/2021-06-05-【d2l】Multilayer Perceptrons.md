---
layout:     post
title:      "【d2l】Multilayer Perceptrons"
subtitle:   ""
date:       2021-06-05
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - d2l
---


# Multilayer Perceptrons

在第3节中，我们介绍了softmax回归(第3.4节)，从头实现算法(第3.6节)和使用高级api(第3.7节)，并训练分类器从低分辨率图像中识别10类服装。在此过程中，我们学习了如何处理数据，迫使我们的输出进入一个有效的概率分布，应用一个适当的损失函数，并使其相对于我们的模型参数最小。既然我们已经掌握了简单线性模型中的这些机制，我们就可以开始对深度神经网络的探索，这是本书主要关注的相对丰富的一类模型。

## Hidden Layers

我们在3.1.1.1节中描述了仿射变换，它是一个加了偏差的线性变换。