---
layout:     post
title:      "【深度学习】You Only Look Once(YOLO V1): Unified, Real-Time Object Detection"
subtitle:   ""
date:       2022-09-02
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - CVPR 2016
    - Detection
---

# Abstract

作者提出了一种新的目标检测方法YOLO。先前的目标检测工作将分类器重用于检测。这篇文章将目标检测定义为空间分离的bbox和相关的类概率的回归问题。在一次评估中，单个神经网络直接从完整图像预测 bbox 和类概率。由于整个检测 pipeline 是一个单一的网络，因此可以在检测性能上直接进行端到端优化。

base YOLO模型以每秒45帧的速度实时处理图像。网络的一个小版本，Fast YOLO，处理速度惊人的155帧每秒，同时仍然实现了两倍于其他实时探测器的mAP。与最先进的检测系统相比，YOLO产生更多的定位错误，但更不可能预测背景误报。 最后，YOLO学习目标的一般表示。


# Unified Detection 

作者将目标检测的独立组件统一为一个单一的神经网络。该网络使用来自整个图像的特征来预测每个边界框。它还可以同时预测一个图像的所有类的所有边界框。这意味着该网络对整个图像和图像中的所有目标进行全局分析。YOLO设计可以实现端到端训练和实时速度，同时保持较高的平均精度。

YOLO 将输入图像划分为一个 $S \times S$ 网格。如果一个目标的中心落在一个 grid cell 中，该 grid cell 负责检测该目标。

每个 grid cell 预测 $B$ 个 bbox 和这些框的置信度得分。这些置信度得分反映了模型对 box 包含一个目标的置信度，以及它认为它所预测的 box 有多准确。作者将置信度定义为 $\text{Pr(Object)} * \text{IOU}_{pred}^{truth}$。如果该 cell 中不存在目标，置信度得分应该为零。否则，作者希望置信度得分等于预测框与真实值之间的交集(IOU)。

每个边界框包含5个预测: $x、y、w、h$ 和 confidence 。$(x, y)$ 表示 box center 相对于 grid cell 边界的坐标。预测的宽度和高度相对于整个图像。最后置信度预测表示预测框与真值框之间的IOU。

每个 grid cell 还预测 $C$ 个类条件概率， $\text{Pr}(\text{Class}_i \mid \text{Object})$。这些概率取基于包含目标的 grid cell。YOLO 每个 grid cell 仅预测一组类概率，无论 bbox 的数量 $B$ 是多少。

在测试时，作者将类条件概率和单个框置信度相乘。

$$
\text{Pr}(\text{Class}_i \mid \text{Object}) * \text{Pr}(\text{Object})  * \text{IOU}_{pred}^{truth} = \text{Pr}(\text{Class}_i) * \text{IOU}_{pred}^{truth} \tag{1}
$$

这些分数编码该类出现在 box 中的概率以及预测的 box 与目标的匹配程度。

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1662087943121.png)

对于在 PASCAL VOC 上评估 YOLO， 作者使用 $S = 7, B = 2$。 PASCAL VOC 有 20 哥标签类，因此 $C = 20$。 最终预测是一个 $7 \times 7 \times 30$ 的张量。



# Conclusion

这篇文章引入了目标检测的统一模型YOLO。该模型简单易于构建并且可以直接在整张图像上训练。与基于分类器的方法不同，YOLO是在一个直接对应检测性能的损失函数上训练的，整个模型是联合训练的。

Fast YOLO是文献中最快的通用目标检测器，YOLO推动了实时目标检测的最先进技术。YOLO还可以很好地泛化到新的领域，使其成为依赖于快速、健壮的目标检测的应用的理想选择。
