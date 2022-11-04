---
layout:     post
title:      "【深度学习】FuncNet：Functional Neural Networks for Parametric Image Restoration Problems "
subtitle:   ""
date:       2022-07-22
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - NIPS 2021
---

# Abstract
几乎每一个图像恢复问题都有一个密切相关的参数，如超分辨率的尺度因子、图像去噪的噪声水平和JPEG deblocking的质量因子。

虽然由于深度神经网络的发展，近年来关于图像恢复问题的研究取得了很大的成功，但它们对所涉及的参数的处理方式并不复杂。

以往的研究大多将具有不同参数层的问题视为独立的任务，并针对每个参数层训练特定的模型;或者直接忽略参数，并针对所有参数级别训练单个模型。

这两种流行的方法都有各自的缺点。

前者在计算上效率低下，后者在性能上效率低下。

在这项工作中，作者提出了一个新的系统称为功能神经网络(FuncNet)，以解决参数化图像恢复问题的单一模型。

与普通的神经网络不同，FuncNet的最小概念元素不再是一个浮点变量，而是问题参数的函数。

这一特点使其对参数问题的求解既高效又有效。

实验结果表明，FuncNet在所有三个参数图像恢复任务上都优于现有的方法。

# Conclusion

这篇文章提出了一种新的神经网络称为FuncNet，以解决单模型参数化图像恢复问题的。


为了将 plain 神经网络转化为FuncNet，将 plain 网络中所有可训练的变量替换为问题的参数的函数。

实验结果表明，FuncNet 具有较高的存储效率和计算效率，在三种常用参数图像恢复任务上具有较先进的优势。
