---
layout:     post
title:      "【d2l】Region-based CNNs (R-CNNs)"
subtitle:   ""
date:       2021-05-19
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - d2l
---


基于区域的卷积神经网络(Region-based convolutional neural networks, or regions with CNN feature, R-CNNs)是将深度模型应用于目标检测的一种前沿方法\[Girshick et al.， 2014\]。在本节中，我们将讨论R-CNN和对它们的一系列改进:Fast R-CNN \[Girshick, 2015\]， Faster R-CNN \[Ren et al.， 2015\]，和Mask R-CNN \[He et al.， 2017a\]。由于篇幅限制，我们将只讨论这些模型的设计。


# R-CNNs

R-CNN模型首先从图像中选择几个提出的区域(例如，anchor boxes是一种选择方法)，然后标记它们的类别和边界框(例如，offsets)。然后，他们使用CNN进行前向计算，从每个提议的区域提取特征。然后，我们利用每个区域的特征来预测它们的类别和边界框。图13.8.1为一个R-CNN模型。

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1621403060813.png)

图13.8.1, R-CNN model

具体来说，R-CNN由四个主要部分组成：

- 对输入图像进行选择性搜索，选择多个高质量的提出区域\[Uijlings等，2013\]。这些被提议的区域通常在多个尺度上被选择，并且有不同的形状和大小。对每个区域的类别和ground-truth边界框进行标注。
- 将一个预先训练好的CNN以截断的形式放置在输出层之前。它将每个提出的区域转换为网络所需的输入维数，并使用前向计算输出从提出的区域中提取的特征。
- 以每个区域的特征和标注类别为样本，训练多个支持向量机进行目标分类。这里使用每个支持向量机来确定一个样本是否属于某个类别。
- 将每个区域的特征和标记的边界框结合为例，训练线性回归模型用于 ground-truth 边界框预测。


虽然R-CNN模型使用预训练CNN有效地提取图像特征，但主要缺点是速度慢。可以想象，我们可以从一幅图像中选择数千个提议的区域，需要CNN进行数千次的前向计算才能进行目标检测。这种巨大的计算负载意味着 R-CNN 在实际应用中并没有得到广泛应用。


# Fast R-CNN

R-CNN模型的主要性能瓶颈是需要为每个提出的区域独立提取特征。由于这些区域有高度的重叠，独立的特征提取会导致大量的重复计算。Fast R-CNN通过只对图像整体进行CNN前向计算来改进R-CNN。

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1621403589406.png)

图13.8.2 Fast R-CNN model

图13.8.2 展示了一个Fast R-CNN模型。其主要计算步骤如下：

- 相比于R-CNN模型，Fast R-CNN模型使用整个图像作为CNN的输入进行特征提取，而不是每个提出的区域。此外，该网络训练更新模型参数。由于输入是一幅完整的图像，所以CNN输出的形状为 $1 \times c \times h_1 \times w_1$。
- 假设 selective search 生成 n 个提议区域， 它们的不同形状表示CNN输出的不同形状的兴趣区域(RoIs)。必须从这些RoIs区域中提取相同形状的特征(这里我们假设高为 $h_2$， 宽为 $w_2$)。Fast R-CNN引入了RoI池化，它使用CNN输出和RoI作为输入，输出为从每个提议的区域提取的特征(形状为 $n \times c \times h_2 \times w_2$)的拼接。
- 一个全连接层用于将输出转换成 $n \times d$ 的形状， 其中 $d$ 由模型设计决定。
- 在预测类别期间， 全连接层的形状输出再一次被转换成 $n \times q$ 并且使用 softmax regression($q$ 是种类的数量)。 在预测bbox期间，全连接层的输出形状再次被转换成 $n \times 4$。 这意味着我们为每个提议区域预测种类和bbox。

Fast R-CNN中的RoI池化层与我们之前讨论过的池化层有些不同。在一个普通的池化层中，我们设置了池化窗口、填充和步长来控制输出形状。在RoI池化层中，我们可以直接指定每个区域的输出形状，如指定每个区域的高度和宽度为 $h_2$, $w_2$。 假设 RoI窗口的高和宽为 $h$ 和 $w$， 这个窗口被分成 形状为 $h_2 \times w_2$ 的子窗口网格。 每个子窗口的尺寸约为 $(h/h_2) \times (w/w_2)$。 子窗口的高度和宽度必须总是整数，并且最大的元素被用作给定子窗口的输出。这使得RoI池化层能够从不同形状的RoI中提取出相同形状的特征。

在 图13.8.3 中， 我们选择 $3 \times 3$ 区域作为 $4 \times 4$ 输出的RoI。 对于这个 RoI， 我们使用 $2 \times 2$ RoI 池化层获得单个 $2 \times 2$ 的输出。 当我们将区域分成四个子窗口时， 它们分别得到元素 0, 1, 4, 和 5(5是最大的)； 2和6(6是最大的); 8和9(9是最大的); 以及10. 



