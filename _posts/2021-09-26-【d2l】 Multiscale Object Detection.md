---
layout:     post
title:      "【d2l】 Multiscale Object Detection"
subtitle:   ""
date:       2021-09-26
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - d2l
---


在第13.4节中，我们生成了多个以输入图像的每个像素为中心的 Anchor 框。本质上，这些 Anchor框 代表了图像不同区域的样本。然而，如果每个像素都生成 Anchor框，我们可能会遇到计算 太多Anchor框 的问题。考虑一个 $561 \times 728$ 的输入图像。  如果以每个像素为中心生成五个不同形状的 Anchor框， 在图像上超过两百万个 Anchor框 ($561 \times 728 \times 5$) 需要被标注和预测。

