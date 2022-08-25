---
layout:     post
title:      "【深度学习】PP-YOLO: An Effective and Efficient Implementation of Object Detector"
subtitle:   ""
date:       2022-08-25
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - CV
    - Arxiv 2020
---

# Abstract

目标检测是计算机视觉的一个重要领域，在各种实际场景中发挥着关键作用。

在实际应用中，由于硬件的限制，常常需要牺牲精度来保证检测器的推理速度。

因此，必须考虑目标检测器的有效性和效率之间的平衡。

这篇文章的目标不是提出一种新的检测模型，而是实现一种有效性和效率相对均衡的、可以直接应用于实际应用场景的目标检测器。

考虑到YOLOv3在实际应用中的广泛应用，作者开发了一种新的基于YOLOv3的目标检测器。

作者主要尝试结合现有的各种几乎不增加模型参数和FLOPs数量的技巧，在保证速度基本不变的情况下，尽可能提高检测器的精度。

由于这篇文章所有的实验都是基于PaddlePaddle进行的，所以称之为PP-YOLO。

PP-YOLO通过多种技巧的结合，可以在准确率(45.2% mAP)和速度(72.9 FPS)之间取得更好的平衡，超过了现有的最先进的检测器effentdet和YOLOv4。

# Method

one-stage anchor-based 检测器通常由 backbone、detection neck(典型的特征金字塔网络，FPN)和用于目标分类和定位的detection head 组成。它们也是大多数基于 anchor-point 的 one-stage anchor-free 检测器中常见的组件。这篇文章首先对YOLOv3的详细结构进行了修改，其将 backbone 替换为 ResNet50-vd-dcn， 将其作为这篇文章的 baseline。然后作者引入了一堆可以几乎不损失效率的技巧来提高YOLOv3的性能。

## Architecture 

**Backbone** YOLOv3的整体架构如图2所示。作者将 backbone DrakNet-53 替换为 ResNet50-vd。将DarkNet-53 替换为 ResNet50-vd 会损害 YOLOv3 检测器的性能。 作者将ResNet50-vd中的部分卷积层替换为可形变卷积层。 可形变卷积网络(Deformable convolutional Networks, DCN)的有效性已经在许多检测模型中得到了验证。DCN 本身不会显著增加模型的参数量和 FLOPs， 但是实际上太多的 DCN 层将会大大增加推理时间。 因此，为了平衡效率和有效性，我们只在最后的 stage 用DCNs替换 $3 \times 3$ 卷积层。作者将这种修改后的 backbone 叫做 ResNet50-vd-dc, stage 3,4,5 的输出表示为 $C_3, C_4, C_5$。 




![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1661430351282.png)

**Detection Neck**  然后使用FPN[21]构建特征映射之间横向连接的特征金字塔。特征图 $C_3, C_4, C_5$ 输入 FPN 模块。作者将金字塔层次 $l$ 的输出特征映射记为 $P_l$，在作者的实验中，$l = 3,4,5$。 对于尺寸为 $W \times H$ 的输入图像，$P_l$ 的分辨率为 $\frac{W}{2^l} \times \frac{H}{2^l}$。FPN的详细结构如图2所示。 

**Detection Head** YOLOv3的检测头非常简单。它由两个卷积层组成。采用一个 $3 \times 3$ 卷积层和 $1 \times 1$ 卷积层得到最终的预测结果。每个最终预测的输出通道为 $3(K + 5)$，其中 $K$ 为类的数量。每个最终 prediction map 上的每个位置都与三个不同的 anchors 相关联。对于每个 anchor，前 $K$ 个通道是 $K$ 类的概率预测。后面4个通道是 bbox 定位的预测。最后一个通道是 objectness score 的预测。分类和定位时，分别采用交叉熵损失和L1损失。jectness loss[32]用于监督objectness score，用于判断是否存在目标。

# Conclusion

这篇文章介绍了一种基于PaddlePaddle的目标检测器的新实现——PP-YOLO。

PP-YOLO比其他先进的检测器(如effentdet和YOLOv4)更快(FPS)和更准确(COCO mAP)。

这篇文章探索了许多技巧，并展示了如何在YOLOv3检测器上组合这些技巧，并演示了它们的有效性。