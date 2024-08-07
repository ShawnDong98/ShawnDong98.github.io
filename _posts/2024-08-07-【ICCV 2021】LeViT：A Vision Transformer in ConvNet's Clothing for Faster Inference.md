---
layout:     post
title:      "【ICCV 2021】LeViT：A Vision Transformer in ConvNet's Clothing for Faster Inference"
subtitle:   ""
date:      2024-08-07
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - ICCV 2021
    - 
---

# Abstract

我们设计了一系列图像分类架构，以在高速环境中优化准确性和效率之间的权衡。我们的工作利用了基于注意力的架构中的最新发现，这些架构在高度并行处理硬件上具有竞争力。我们重新审视了卷积神经网络广泛文献中的原则，并将其应用于 Transformer 模型，特别是具有递减分辨率的激活图。我们还引入了注意力偏置，一种在视觉变压器中整合位置信息的新方法。

因此，我们提出了LeViT：一种用于快速推理图像分类的混合神经网络。我们在不同的硬件平台上考虑了不同的效率测量，以最佳反映各种应用场景。我们的大量实验实验证实了我们的技术选择，并显示它们适用于大多数架构。总体而言，LeViT在速度/准确性权衡方面显著优于现有的卷积神经网络和视觉变压器。例如，在80%的ImageNet top-1准确率下，LeViT在CPU上的速度是EfficientNet的5倍。