---
layout:     post
title:      "【深度学习】Spatial As Deep: Spatial CNN for Traffic Scene Understanding"
subtitle:   ""
date:       2021-10-22
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - 
---

# Abstract

卷积神经网络通常是通过逐层叠加卷积运算来构建的。尽管CNN显示出了从原始像素中提取语义的强大能力，但它在图像的行和列之间捕捉像素空间关系的能力还没有得到充分的探索。这些关系对于学习具有强形状先验但外观一致性较弱的语义对象非常重要，例如交通车道，如图1 (a)所示，这些车道经常被遮挡，甚至没有被喷绘在路面上。在本文中，我们提出了空间CNN (Spatial CNN, SCNN)，它将传统的逐层深度卷积推广到feature map中的逐片卷积，从而实现像素在一层中的行和列之间的传递。这种SCNN特别适用于长而连续的形状结构或大物体，具有很强的空间关系，但较少的外观线索，如交通车道、电线杆、墙壁等。我们将SCNN应用于一个新发布的非常具有挑战性的交通车道检测数据集和 Cityscapse 数据集。结果表明，SCNN能够学习结构输出的空间关系，显著提高了性能。结果表明，在车道检测数据集上，SCNN比基于循环神经网络(RNN)的ReNet和MRF+CNN (MRFNet)分别高出8.7%和4.6%。此外，我们的SCNN赢得了TuSimple基准车道检测挑战赛的第一名，准确率为96.53%。


# Conclusion

在本文中，我们提出了 Spatial CNN，一个类似CNN的方案，以实现有效的信息在空间级传播。SCNN可以很容易地整合到深度神经网络中，并进行端到端训练。在交通场景理解的两个任务中:车道检测和语义分割。结果表明，SCNN能有效地保持长细结构的连续性，而在语义分割中，它的扩散效应也有利于大对象。具体来说，通过在LargeFOV模型中引入SCNN，我们的20层网络在车道检测方面优于ReNet、MRF和非常深的ResNet-101。最后，我们认为，我们提出的具有挑战性的大车道检测数据集将推动自动驾驶的研究。