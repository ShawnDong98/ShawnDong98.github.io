---
layout:     post
title:      "【深度学习】PANet：Path Aggregation Network for Instance Segmentation"
subtitle:   ""
date:       2022-09-18
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - Detection
    - CVPR 2018
---

# Abstract

信息在神经网络中的传播方式非常重要。

这篇文章作者提出了 Path Ag- gregation Network (PANet)，旨在促进基于 proposal-based 的实例分割框架中的信息流。

具体来说，作者通过自下而上的路径增强，通过下层的准确定位信号来增强整个特征层次结构，从而缩短了下层和最顶层之间的信息路径。

作者提出了自适应特征池化，它将 feature grid 和所有 feature level 联系起来，使每个特征级别的有用信息直接传播到后面的提议子网络。

创建一个互补的分支，为每个 proposal 捕获不同的 views，以进一步改进 mask 预测。


# Framework

框架如图1所示。

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1663508892662.png)


Path agmentation 和 aggregation 以改善性能。 自下而上的路径得到了增强，使低层信息更容易传播。作者设计了自适应特征池化，允许每个提议访问来自各个级别的信息进行预测。将互补路径添加到 mask 预测分支中。这种新结构带来了很好的表现。与FPN类似，改进与CNN结构无关。

## Bottom-up Path Augmentation

**Motivation** 有见地的观点[63]，高层神经元对整个物体反应强烈，而其他神经元更有可能被局部纹理和模式激活，这表明有必要增强自上而下的路径，以传播语义上强大的特征，并增强 FPN 中具有分类能力的所有特征。

作者的框架进一步增强了整个特征层次结构的定位能力，通过传播低层模式的强响应，因为边缘或实例部分的高响应是准确定位实例的强指标。为此，作者建立了一条从低层到顶层的横向连接的路径。因此，在由不到10层组成的级别上有一个“shortcut”（图1中的虚线绿线）。FPN中的 CNN trunk 给出了一条长路径（图1中的虚线红线），穿过从低层到最顶层的100多层。

**Augmented Bottom-up Structure** 该框架首先实现了 bottom-up path augmentation。 作者遵循FPN来定义生成具有相同空间大小的特征图的层处于相同的网络 stage。 每个feature level 对应一个 stage。作者用 ResNet 作为基本的结构 并且 使用 $\{P_2, P_3, P_4, P_5\}$ 表示由 FPN 生成的 feature level。 增强的路径从最底层 $P_2$ 逐渐接近 $P_5$， 如图 1(b) 所示。 从 $P_2$ 到 $P_5$ 空间大小的降采样率为 2。 作者用 $\{N_2, N_3, N_4, N_5 \}$ 表示对应于 $\{P_2, P_3, P_4, P_5\}$ 的新生成的特征图。注意 $N_2$ 就是 $P_2$ ， 没有做任何处理。

如图 2 所示， 每个 building block 采用更高分辨率特征图 $N_i$ 和一个更粗粒度的特征图 $P_{i+1}$ 通过水平连接， 然后生成新的特征图 $N_{i+1}$。 每个特征图 $N_i$ 首先通过一个 $3 \times 3$ 卷积层， 步长为2来减小空间大小。然后特征图 $P_{i+1}$ 的每个元素和降采样的特征图通过水平连接相加。然后，融合的 feature map 由另一个3×3卷积层处理，以生成$N_{i+1}$，用于后续子网络。这是一个迭代过程，在接近 $P_5$ 后终止。在这些构建块中，作者始终使用特征图的256通道。所有卷积层后面都有一个ReLU。然后从新的特征图中汇集每个提议的 feature grid $\{N_2, N_3, N_4, N_5\}$。

##  Adaptive Feature Pooling

**Motivation** 在FPN[35]中，提案根据提议的大小被分配到不同的特征级别。它向低特征级别分配小提议，向高特征级别提交大提议。尽管简单而有效，但它会可以产生非最佳结果。例如，两个有1 0像素差异的提议可以分配给不同的 level 。事实上，这两个提议非常相似。

此外，特征的重要性可能与它们所属的 level 无关。使用大感受野生成高等级功能，并捕获更丰富的上下文信息。允许小提议访问这些特征可以更好地利用有用的上下文信息进行预测。同样，低等级特征具有许多细节和高定位精度。让大提议访问它们显然是有益的。基于这些想法，作者提出为每个提议汇集来自所有层次的特征，并将它们融合起来进行后续预测。作者称这个过程为自适应特征池化。





**Adaptive Feature Pooling Structure** 

## Fully-connected Fusion




# Conclusion

作者展示了用于 实例分割 的PAnet。

作者设计了几个简单而有效的组件，以加强 representative  pipelines 中的信息传播。

作者汇集了所有 feature level 的特征，并缩短了最低端和最上面的特征 levels 之间的距离，以获得可靠的信息传递。

被增强互补的路径为每个提议区域丰富特征。

产生了令人印象深刻的结果。

