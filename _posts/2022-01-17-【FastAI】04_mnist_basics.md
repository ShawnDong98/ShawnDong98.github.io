---
layout:     post
title:      "【FastAI】04_mnist_basics"
subtitle:   ""
date:       2022-01-17
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - FastAI
---

# Under the Hood: Training a Digit Classifier 

确切地说，我们将讨论 array 和 tensor 以及广播机制，这是一种表达使用它们的强大技术。我们将解释随机梯度下降（SGD），这是通过自动更新权重来学习的机制。我们将讨论我们基本分类任务的损失函数的选择，以及小批量处理的作用。我们还将描述一个基本神经网络实际正在做的数学。最后，我们将把所有这些碎片放在一起。

在未来章节中，我们还将深入探讨其他应用程序，并了解这些概念和工具是如何概括的。但这一章是关于奠基的。坦率地说，这也使这一章成为最困难的章节之一，因为这些概念都是相互依赖的。像拱门一样，所有的石头都需要到位，才能让结构保持向上。同样像拱门一样，一旦发生这种情况，它就是一个强大的结构，可以支持其他事情。但组装起来需要一些耐心。

我们开始吧。第一步是考虑图像如何在计算机中表示。

# Pixels: The Foundations of Computer Vision

为了了解计算机视觉模型中发生的事情，我们首先必须了解计算机如何处理图像。我们将使用计算机视觉中最著名的数据集之一MNIST进行实验。MNIST包含由国家标准和技术研究所收集并由Yann Lecun及其同事整理成机器学习数据集的手写数字图像。Lecun于1998年在Lenet-5中使用了MNIST，这是第一个演示手写数字序列实用识别的计算机系统。这是人工智能史上最重要的突破之一。

# Sidebar: Tenacity and Deep Learning