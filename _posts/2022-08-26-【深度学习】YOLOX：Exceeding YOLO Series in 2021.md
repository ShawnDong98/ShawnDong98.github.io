---
layout:     post
title:      "【深度学习】YOLOX: Exceeding YOLO Series in 2021"
subtitle:   ""
date:       2022-08-26
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - CV
    - Arxiv 2021
---

# Abstract

在这份报告中，作者介绍了YOLO系列的一些实验改进，形成了一种新的高性能探测器YOLOX。

作者将YOLO检测器转换为 Anchor-free 的方式，并实现了其它先进的检测技术。

此外，作者使用单一的YOLOX-L模型赢得了 Streaming Perception 挑战(CVPR 2021年自动驾驶研讨会)的第一名。


# YOLOX

## YOLOX-DarkNet53

**YOLOv3 baseline**： baseline 采用 DarkNet53 加上 SPP 层作为主干的结构。 相比原始的实现加入一些训练细节， 加入EMA权重更新， 余弦学习策略，IoU loss 和 IoU-aware 分支。使用 BCE 训练 cls 和 obj 分支， IoU loss 训练 reg 分支。这些通用的训练技巧与YOLOX的关键提升正交， 因此作者将它们加入baseline。此外作者仅仅执行了 RandomHorizontalFlip， ColorJitter 和 多尺度的数据增强， 并且抛弃了 RandomResizedCrop 策略， 因为作者发现这与 misaic 数据增强冲突。  

**Decoupled head：** 在目标检测中，分类和回归任务之间的冲突是一个众所周知的问题。 因此，用于分类和定位的解耦头被广泛用于大多数单阶段和两阶段检测器中。 然而，由于 YOLO 系列的主干和特征金字塔(FPN, PAN)不断发展， 他们的检测头一直耦合着。

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1667217870551.png)

作者的两个分析实验表明，耦合检测头可能会损害性能。

1）用解耦头取代YOLO的头部可以大大提高收敛速度，如图3所示。

2）解耦头对YOLO的端到端版本至关重要（接下来将描述）。

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1667217953000.png)

从表1中可以看出，端到端训练， 耦合头降低了4.2AP， 而解耦头降低了 0.8 AP。因此作者将YOLO的检测头替换为了如图2所示的一个轻量的解耦头。具体来说，它包含一个1×1的conv层来减少通道尺寸，然后是两个平行的分支，上面有两个3×3的conv层。

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1667218038095.png)
作者在表2中汇报了在 V100 上批量大小为 1 的推理时间， 解耦头增加了1.1ms。


![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1667218204332.png)

**Strong data augmentation** 作者将Mosaic和MixUp添加到数据增强策略中，以提高YOLOX的表现。Mosaic 是 Ultralytics-YOLOv3 提出的一种高效增强策略。 然后，它被广泛用于YOLOv4、YOLOv5和其他检测器。MixUp最初是为图像分类任务设计的，但后来在 BoF 中进行了修改，用于目标检测训练。作者在模型中采用了MixUp和Mosaic实现，并在最后15个 epoch 关闭了它，在表2中实现了42.0%的AP。在使用强大的数据增强后，作者发现ImageNet预训练不再有益，因此我们从头开始训练以下所有模型。
 

# Conclusion

在这份报告中，作者介绍了YOLO系列的一些更新，它形成了一个高性能的 Anchor-free 检测器，称为YOLOX。

装备了一些最新的先进探测技术，例如YOLOX采用 decoupled head、anchor-free 和先进的标签分配策略，在所有模型尺寸上比其他同行实现了更好的速度和准确性之间的权衡。

值得注意的是，作者将YOLOv3的架构提升到了47.3% AP，比当前的最佳实践高出3.0% AP。YOLOv3由于其广泛的兼容性，仍然是工业上使用最广泛的探测器之一。
