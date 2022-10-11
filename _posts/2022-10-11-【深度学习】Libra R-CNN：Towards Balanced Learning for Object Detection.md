---
layout:     post
title:      "【深度学习】Libra R-CNN：Towards Balanced Learning for Object Detection"
subtitle:   ""
date:       2022-10-11
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - Detection
    - CVPR 2019
---

# Abstract

与模型结构相比，训练过程对检测器的成功也至关重要，但在物体检测中受到的关注相对较少。

在这项工作中，作者仔细重新审视了检测器的标准训练实践，发现检测性能往往受到训练过程中不平衡的限制，不平衡通常由三个级别组成——样本级别、特征级别和目标级别。

为了减轻由此造成的不利影响，作者提出了Libra R-CNN，这是一个简单但有效的框架，旨在平衡学习目标检测。

它集成了三个新组件：IoU-balanced sampling, balanced feature pyramid 和 balanced L1 loss，分别用于减少样本、特征和目标的不平衡。

Libra R-CNN 受益于整体平衡的设计，显著提高了检测性能。


# Methodology

##  IoU-balanced Sampling

## Balanced Feature Pyramid

## Balanced L1 Loss

自Fast R-CNN 以来，分类和定位问题在多任务损失的指导下同时得到解决，该损失被定义为

$$
L_{p, u, t^u, v} = L_{cls}(p, u) + \lambda[u \geq 1] L_{loc}(t^u, v)
$$

$L_{cls}$ 和 $L_{loc}$ 分别是对应识别和定位的目标函数。 $L_{cls}$ 中的预测和标签表示为 $p$ 和 $u$。 $t^u$ 是类别 $u$ 对应的回归结果。 $v$ 是回归标签。 $\lambda$ 用于调整多任务学习中的权重。 我们称损失大于或等于 1.0 的样本为异常值。


平衡相关任务的一个自然解决方案是调整它们的损失权重。然而，由于无界回归目标，直接提高定位损失的权重将使模型对异常值更敏感。这些异常值可以被视为hard samples，将产生过大的梯度，对训练过程有害。与异常值相比，inliers 可以视为简单样本，对整体梯度的贡献很小。更具体地说，与异常值相比，inliers 每个样本的仅贡献 30% 的梯度。考虑到这些问题， 作者提出 balanced L1 loss，即Lb。




# Conclusion

这篇文章系统地重新审视了检测器的训练过程，发现由于训练过程中存在的不平衡问题，模型结构的潜力没有得到充分利用。

基于这一观察，作者提出 Libra R-CNN 通过整体平衡设计来平衡不平衡。

在简单但有效的组件的帮助下，如 IoU-balanced sampling, balanced feature pyramid 和 balanced L1 loss， Libra R-CNN 在 MS COCO 数据集带来了性能上很大的提升。

广泛的实验表明，Libra R-CNN很好地推广到两阶段检测器和单阶段检测器的各种主干。