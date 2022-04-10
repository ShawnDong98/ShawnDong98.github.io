---
layout:     post
title:      "【深度学习】Unified Contrastive Learning in Image-Text-Label Spac"
subtitle:   ""
date:       2022-04-10
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - 
---

# Abstract

近年来，视觉识别是通过对人类标注的图像标签数据进行监督学习，或通过对图像-文本对语言-图像对比学习来学习的。


虽然有监督学习可以得到更判别性的特征， language-image 预训练表现出前所未有的 zero-shot 的能力。

这项工作引入一种新的公式， 通过结合两种数据源到一个公共 image-text-label 空间。

在这个空间中，提出了一种新的学习范式，称为Unified Contrastive Learning (UniCL)，通过单个学习目标，无缝地促进两种数据类型的协同作用。

大量的实验表明，UniCL是一种有效的学习语义丰富而有区别的表示的方法，普遍适用于zerp-shot、linear probe、fine tuning 和迁移学习场景下的图像识别。

特别是，它在 zero-shot 识别基准上的平均增益分别比语言-图像对比学习和监督学习方法提高了9.2%和14.5%。

在 Linear probe 设置中 ，它也分别带来 7.3% 和 3.4% 的性能提升。

研究还表明，UniCL在纯图像标签数据上是一个很好的学习者，可以与在三个图像分类数据集和两种视觉骨干(ResNet和Swin Transformer)的监督学习方法相媲美。

# Conclusion

