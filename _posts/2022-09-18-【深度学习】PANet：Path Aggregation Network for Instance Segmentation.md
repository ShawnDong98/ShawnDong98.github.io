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

# Conclusion

作者展示了用于 实例分割 的PAnet。

作者设计了几个简单而有效的组件，以加强 representative  pipelines 中的信息传播。

作者汇集了所有 feature level 的特征，并缩短了最低端和最上面的特征 levels 之间的距离，以获得可靠的信息传递。

被增强互补的路径为每个提议区域丰富特征。

产生了令人印象深刻的结果。

