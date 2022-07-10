---
layout:     post
title:      "【深度学习】MobileNets: Efficient Convolutional Neural Networks for Mobile Vision Applications"
subtitle:   ""
date:       2022-07-09
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - HSI
---

# Abstract

这篇提出了一类高效的模型，称为mobilenet，用于移动和嵌入式视觉应用程序。

mobilenet基于流水线型架构，使用深度可分离卷积来构建轻量级的深度神经网络。

这篇文章引入了两个简单的全局超参数，可以有效地权衡延迟和准确性。

这些超参数允许模型构建者根据问题的约束选择合适大小的模型。

在资源和准确性权衡方面进行了大量的实验，与其它的ImageNet分类模型相比，展示出强大的性能。

然后，在广泛的应用和用例中展示了mobilenet的有效性，包括目标检测、细粒度分类、人脸识别和大规模地理定位。


# Depthwise Separable Convolution 

MobileNet模型基于 depthwise separable 卷积, 这是一种 factorized 卷积的形式, 它将一个标准卷积分解成一个 depth-wse 卷积和一个1x1卷积称为 point-wise 卷积。Depthwise 卷积将单个 filter 应用于每个输入通道。Pointwise 卷积应用一个1x1卷积将 Depthwise 卷积的输出结合起来。一个标准的卷积同时 filter 和组合输入 得到一组新的输出。深度可分离卷积将其分为两层，一层用于 filter ，另一层用于组合。这种 factorization 具有极大地减少计算量和模型大小的效果。

标准卷积层输入是一个 $D_F \times D_F \times M$ 的特征图 $F$， 产生一个 $D_F \times D_F \times N$ 的特征图 $G$。

标准卷积层可参数化为 $D_k \times D_K \times M \times N$ , $K$ 为卷积核的大小。

假设 stide 和 padding 为 1， 标准卷积的输出特征图可被计算为：

$$
G_{k, l, n} = \sum_{i, j, m} K_{i, j, m, n} · F_{k + i - 1, l + j - 1, m}
$$
标准卷积的计算成本为：

$$
D_K · D_K · M · N · D_F · D_F
$$
标准卷积运算的作用是在基于卷积核对特征进行滤波，并组合特征来产生一种新的表示。滤波和组合过程可以通过分解卷积拆为两个步骤来减小计算成本。

Depthwise separable 卷积由两层卷积组成: Depthwise 卷积和Pointwise 卷积。depthwise 卷积对每个输入通道使用单个 filter。Pointwise 卷积是一个简单的 1x1 卷积， 被用来创建 depthwise 层的输出的线性组合。mobilenet 对两层都使用batchnorm 和ReLU 。

depthwise 卷积可被写成如下：

$$
\hat G_{k, l, m} = \sum_{i. j} \hat K_{i, j, m} · F_{k + i - 1, l + j - 1, m}
$$

Depthwise 卷积的计算成本为：

$$
D_K · D_K · M · D_F · D_F
$$

depthwise 卷积仅能滤波输入通道， 不能组合新特征。所以需要一个额外的 1x1 卷积层通过的线性组合 depthwise 卷积的输出 来生成这些新特征。


# Conclusion

这篇文章提出了一种新的基于深度可分离卷积的模型体系结构——mobilenets。

这篇文章调研了一些重要的设计决策，从而得到一个有效的模型。

然后，展示了如何使用 width multiplier 和 resolution multiplier 构建更小、更快的mobilenet，通过权衡适当的精度来减少大小和延迟。

然后将不同的mobilenet与表现卓越的流行模型在大小、速度和准确性上进行了比较。

最后，展示了MobileNet应用于各种任务时的有效性。