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

**Anchor-free**： YOLOv4 和YOLOv5 都遵循YOLOv3的原始的先验框流程。然而，先验框机制有许多已知的问题。首先，为了实现最佳检测性能，需要在训练前进行聚类分析以确定一组最佳先验框。这些先验框特定于某个数据集，鲜有泛化性。其次，先验框机制增加了检测头的复杂性，以及每张图像的预测数量。在一些边缘人工智能系统上，在设备之间移动如此大量的预测（例如，从NPU到CPU）可能会成为整体延迟的潜在瓶颈。

在过去的两年里，无先验框的检测器发展迅速。这些工作表明，无先验框的检测器的性能可以与基于先验框的检测器相当。无先验框机制大大减少了需要启发式调优的设计参数数量和所涉及的许多技巧（例如，An-chor Clustering，Grid Sensitive）， 使检测器，特别是其训练和解码阶段，要简单得多。

将YOLO切换到无先验框的方式非常简单。将每个位置的预测从3减少到1，并让他们直接预测四个值，即网格左上角以及预测框的高度和宽度的两个偏移量。作者将每个物体的中心位置指定为正样本，并预先定义一个比例范围， 为每个目标指定FPN级别。这种修改减少了检测器的参数和GFLOPs，并使其更快，但获得了更好的性能——如表2所示，AP为42.9%。

**Multi positives** 为了与YOLOv3的分配规则保持一致，上述无先验框版本仅为每个目标平均值选择一个正样本（中心位置），而忽略了其他高质量预测。然而，优化这些高质量的预测也可能带来有益的梯度，这可能会缓解训练期间正/负采样的极端不平衡。作者只是将中心 3×3 区域分配为正数，在FCOS中也称为“中心采样”。与表2所示，检测器的性能提高到45.0%的AP，已经超过了目前 ultralytics-YOLOv3（44.3%AP）的最佳实践。

**SimOTA：** 更先进的标签分配是近年来目标检测的另一个重要进展。基于作者自己的研究OTA， 作者总结了先进的标签分配的四个关键见解：1）损失/质量感知；2） 中心先验；3）每个标签的正先验框的动态数量；4）全局视图。OTA符合上述所有四条规则，因此我们选择它作为候选标签分配策略。

具体而言，OTA 从全局角度分析标签分配，并将分配流程制定为最佳传输（OT）问题，在当前分配策略中产生SOTA性能。然而，在实践中，作者发现通过Sinkhorn-Knopp算法解决OT问题会带来25%的额外训练时间，这对训练 300 epoch 来说相当昂贵。因此，作者将其简化为名为 SimOTA 的动态top-k 策略，以获得近似解决方案。


**End-to-end YOLO** 作者按照[39]添加两个额外的conv层，一对一的标签分配，以及停止梯度。这些使检测器能够执行端到端的方式，但会略微降低表2中列出的性能和推理速度。因此，作者将它作为一个可选模块，不涉及最终模型。





 

# Conclusion

在这份报告中，作者介绍了YOLO系列的一些更新，它形成了一个高性能的 Anchor-free 检测器，称为YOLOX。

装备了一些最新的先进探测技术，例如YOLOX采用 decoupled head、anchor-free 和先进的标签分配策略，在所有模型尺寸上比其他同行实现了更好的速度和准确性之间的权衡。

值得注意的是，作者将YOLOv3的架构提升到了47.3% AP，比当前的最佳实践高出3.0% AP。YOLOv3由于其广泛的兼容性，仍然是工业上使用最广泛的探测器之一。
