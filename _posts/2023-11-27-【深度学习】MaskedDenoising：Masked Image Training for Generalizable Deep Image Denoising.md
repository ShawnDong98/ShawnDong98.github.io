---
layout:     post
title:      "【深度学习】MaskedDenoising：Masked Image Training for Generalizable Deep Image Denoising"
subtitle:   ""
date:       2023-11-27
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - CVPR 2023
---

# Abstract

在捕获和存储图像时，设备不可避免地会引入噪声。减少这种噪声是一项名为图像降噪的关键任务。

深度学习已成为图像去噪的事实方法，特别是随着基于 Transformer 的模型的出现，这些模型在各种图像任务上取得了显著最先进的结果。

然而，基于深度学习的方法往往缺乏泛化能力。例如，在其他噪声分布上测试时，受过高斯噪声训练的深度模型可能会表现不佳。

为了解决这个问题，我们提出了一种新的方法来提高去噪网络的泛化性能，称为 masked 训练。

我们的方法包括 mask 输入图像的随机像素，并在训练期间重建缺失的信息。

我们还 mask 了自注意力层的特征，以避免训练测试不一致的影响。