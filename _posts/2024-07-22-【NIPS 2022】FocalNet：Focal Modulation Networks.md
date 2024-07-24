---
layout:     post
title:      "【NIPS 2022】FocalNet：Focal Modulation Networks"
subtitle:   ""
date:      2024-07-22
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - NIPS 2022
    - 
---

# Abstract

我们提出了一种焦点调制网络（简称FocalNets），其中自注意力（SA）完全被用于建模视觉中的标记交互的焦点调制模块所取代。

焦点调制包括三个部分：

（i）焦点情境化，通过一组深度卷积层来实现，用于编码从短程到长程的视觉情境；
（ii）门控聚合，用于选择性地将情境汇聚到每个查询标记的调制器中；
（iii）逐元素仿射变换，将调制器注入查询标记。

大量实验表明，FocalNets具有非凡的可解释性（图1）并且在图像分类、目标检测和分割任务中以相似的计算成本优于最先进的自注意力对手（如Swin和Focal Transformers）。

具体而言，大小为tiny和base的FocalNets可以在ImageNet-1K上分别达到82.3%和83.9%的top-1准确率。

在224 x 224 分辨率的ImageNet-22K上预训练后，分别在224 x 224和384 x 384分辨率下微调时，它们可以达到86.5%和87.3%的top-1准确率。

使用Mask R-CNN进行目标检测时，1×训练的FocalNet base比Swin对手高2.1分，并且已经超过了3×训练的Swin（49.0对48.5）。

在使用UPerNet进行语义分割时，单尺度下的FocalNet base比Swin高2.4，并且在多尺度下超过Swin（50.5对49.7）。

使用large FocalNet和Mask2former，我们在ADE20K语义分割中达到了58.5 mIoU，在COCO全景分割中达到了57.9 PQ。

使用huge FocalNet和DINO，我们在COCO minival和test-dev上分别达到了64.3和64.4 mAP，建立了新的最先进标准，超过了更大的基于注意力的模型，如Swinv2-G和BEIT-3。

这些令人鼓舞的结果表明，焦点调制可能是我们在视觉领域所需要的。

# Introduction

Transformer 最初是为自然语言处理（NLP）提出的，自从Vision Transformer (ViT) 的开创性工作以来，它已成为计算机视觉中的一种普遍架构。其在各种视觉任务中展示了巨大的潜力，包括图像分类、目标检测、分割等 。在Transformer中，自注意力（SA）可以说是其成功的关键，因为它使输入依赖的全局交互成为可能，相比之下，卷积操作将交互限制在具有共享核的局部区域。尽管有这些优势，由于自注意力的复杂度与视觉标记数量成平方关系，特别是对于高分辨率输入，其效率一直是一个问题。为了解决这个问题，许多工作通过 token coarsening 、窗口注意力 、dynamic token selection 或混合方法提出了自注意力的变体。同时，还提出了许多模型，通过（深度）卷积增强自注意力，以在充分了解局部结构的情况下捕捉远程依赖关系。


在这项工作中，我们旨在回答一个基本问题：是否有比自注意力（SA）更好的方法来建模输入依赖的远程交互？我们从分析当前先进的SA设计开始。在图2的左侧，我们展示了 ViTs 和 Swin Transformer 中提出的红色 query token 与其周围橙色 token 之间的常用（窗口内）注意力。为了生成输出，SA涉及到繁重的 query-key交互（红色箭头），然后是同样繁重的 query-key 聚合（黄色箭头），这些交互和聚合发生在 query token 与大量空间分布的 token（情境特征）之间。然而，是否有必要进行如此繁重的交互和聚合？在这项工作中，我们采取了一种替代方法，首先围绕每个 query 聚合情境，然后使用聚合后的情境自适应地调制 query。如图2右侧所示，我们可以简单地应用与 query 无关的焦点聚合（例如深度卷积）来生成不同粒度级别的总结 tokens。之后，这些总结 tokens 被自适应地聚合到一个调制器中，最终注入 query 中。这种改变仍然能够实现输入依赖的 token 交互，但通过将聚合与各个 query 解耦，从而显著简化了过程，使得交互变得轻量化，仅需少量特征即可。我们的方法受到焦点注意力的启发，后者执行多个层次的聚合以捕捉细粒度和粗粒度的视觉情境。然而，我们的方法在每个 query 位置提取调制器，并利用一种更简单的方法进行 query-调制器交互。我们称这种新机制为焦点调制（Focal Modulation），用它来取代SA，构建一个无注意力架构，称为焦点调制网络，简称FocalNet。

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1721631660544.png)
最后，在图像分类、目标检测和分割任务上的大量实验显示，我们的FocalNets在与最先进的SA对手相当的成本下，始终显著优于它们。值得注意的是，我们的FocalNet在使用tiny和base模型大小时分别达到了82.3%和83.9%的top-1准确率，但其吞吐量与Swin和Focal Transformer相当且分别翻倍。当在2242分辨率的ImageNet-22K上预训练后，我们的FocalNets在2242和3842分辨率下分别达到了86.5%和87.3%的准确率，这些结果与Swin在类似成本下的表现相当或更好。这个优势在迁移到密集预测任务时尤为显著。在COCO的目标检测中，我们的tiny和base模型大小的FocalNets在Mask R-CNN 1×上分别达到了46.1和49.0的box mAP，超越了3×计划的Swin（46.0和48.5 box mAP）。在ADE20k的语义分割中，我们的base模型大小的FocalNet在单尺度评估中达到了50.5的mIoU，超越了Swin在多尺度评估中的表现（49.7 mIoU）。使用预训练的大型FocalNet，我们在ADE20K语义分割中达到了58.5 mIoU，在COCO全景分割中基于Mask2former 达到了57.9 PQ。使用巨大的FocalNet和DINO，我们在COCO minival和test-dev上分别达到了64.3和64.4的mAP，建立了COCO上的新最先进标准，超越了更大的基于注意力的模型，如Swinv2-G 和 BEIT-3 。请参见图3中的视觉比较，实验详细信息请参见相关部分。最后，我们将焦点调制应用于与ViTs类似的整体布局，并明确展示了其在不同模型大小下的优越性。

# Focal Modulation Network

## From Self-Attention to Focal Modulation

给定一个视觉特征图 $\mathbf{X} \in \mathbb{R}^{H \times W \times C}$ 作为输入，一个通用的编码过程为每个视觉 token（query）$\mathbf{x}_i \in \mathbb{R}^C$ 生成一个特征表示 $\mathbf{y}_i \in \mathbb{R}^C$，通过与其周围环境 $\mathbf{X}$（例如，邻近 token）和上下文聚合 $\mathcal{M}$ 的交互 $\mathcal{T}$。

**Self-Attention**。自注意力模块使用后期聚合过程，公式如下：


$$
\mathbf{y}_i = \mathcal{M}_1(\mathcal{T}_1(\mathbf{x}_i, \mathbf{X}), \mathbf{X}) \tag{1}
$$

其中在上下文 $\mathbf{X}$ 上的聚合 $\mathcal{M}_1$ 是在通过交互 $\mathcal{T}_1$ 计算查询和目标之间的注意力分数之后进行的。

**Folcal Modulation**。相反，Folcal Modulation 使用早期聚合过程生成细化的表示 $\mathbf{y}_i$，公式如下：

$$
\mathbf{y}_i = \mathcal{T}_2(\mathcal{M}_2(i, \mathbf{X}), \mathbf{x}_i), \tag{2}
$$

其中上下文特征首先在每个位置 $i$ 使用 $\mathcal{M}_2$ 聚合，然后查询根据 $\mathcal{T}_2$ 与聚合特征交互以形成 $\mathbf{y}_i$。

对比公式（1）和公式（2），我们看到：

（i）Folcal Modulation 的上下文聚合 $\mathcal{M}_2$ 通过共享操作（例如，深度卷积）摊销上下文的计算，而自注意力中的 $\mathcal{M}_1$ 更加计算密集，因为它需要在不同查询上求和非共享的注意力分数；
（ii）交互 $\mathcal{T}_2$ 是一个轻量级操作符，用于 token 及其上下文之间，而 $\mathcal{T}_1$ 涉及计算 token 到token 的注意力分数，这具有二次复杂度。

基于等式（2）， 我们实例化 Focal Modulation 为：

$$
y_i = q(x_i) \odot m(i, X) \tag{3}
$$

其中 $q(\cdot)$ 是一个 query projection 函数，$\odot$ 是元素级乘法。$m(\cdot)$ 是一个上下文聚合函数，其输出称为调制器。图4(a)和(b)比较了自注意力和焦点调制。所提出的 Focal Modulation 具有以下有利特性：

- **Translation invariance**。由于 $q(\cdot)$ 和 $m(\cdot)$ 始终以 query token $i$ 为中心，并且未使用位置嵌入，因此调制对输入特征图 $\mathbf{X}$ 的平移是不变的。
- **Explicit input-dependency**。调制器通过 $m(\cdot)$ 通过聚合目标位置 $i$ 周围的局部特征计算，因此我们的 Focal Modulation 显式依赖于输入。
- **Spatial- and channel-specific**。目标位置 $i$ 作为 $m(\cdot)$ 的指针使得spatial-specific modulation。元素级乘法使得 channel-specific modulation。
- **Decoupled feature granularity**。$q(\cdot)$ 保留了单个 token 的最精细信息，而 $m(\cdot)$ 提取较粗的上下文。它们是解耦的，但通过调制结合在一起。

在接下来的内容中，我们将详细描述公式(3)中 $m(\cdot)$ 的实现。


## Context Aggregation via $m(·)$


已证明短期和长期上下文对于视觉建模都很重要 [95, 21, 55]。然而，具有较大感受野的单次聚合不仅在时间和内存上计算成本高，而且破坏了特别适用于密集预测任务的局部细粒度结构。受 [95] 启发，我们提出了一种多尺度层次上下文聚合。如图4(c)所示，聚合过程包括两个步骤：层次化上下文化，用于在不同粒度级别从局部到全局范围提取上下文；和门控聚合，用于将不同粒度级别的所有上下文特征浓缩到调制器中。

### 步骤1：层次化上下文化

给定输入特征图 $\mathbf{X}$，我们首先通过线性层 $\mathbf{Z}^0 = f_z(\mathbf{X}) \in \mathbb{R}^{H \times W \times C}$ 将其投影到新的特征空间。然后，使用 $L$ 层深度卷积获得上下文的层次化表示。在焦点级别 $\ell \in \{1, ..., L\}$，输出 $\mathbf{Z}^\ell$ 由以下公式得出：

$$
\mathbf{Z}^\ell = f_a^\ell(\mathbf{Z}^{\ell-1}) \triangleq \text{GeLU}(\text{DWConv}(\mathbf{Z}^{\ell-1})) \in \mathbb{R}^{H \times W \times C},
$$

其中 $f_a^\ell$ 是 $\ell$ 层的上下文化函数，通过具有核大小 $k^\ell$ 的深度卷积 DWConv 实现，后接 GeLU 激活函数 [31]。层次化上下文化中使用深度卷积的动机在于其理想的特性。与池化 [100, 35] 相比，深度卷积是可学习的且具有结构感知。与常规卷积相比，它是通道级的，因此计算成本要低得多。

公式(4)的层次化上下文化生成了 $L$ 层特征图。在 $\ell$ 层，有效感受野是 $r^\ell = 1 + \sum_{i=1}^\ell (k^i - 1)$，这比核大小 $k^\ell$ 大得多。为了捕获整个输入的全局上下文，这可能是高分辨率的，我们在第 $L$ 层特征图 $\mathbf{Z}^{L+1} = \text{Avg-Pool}(\mathbf{Z}^L)$ 上应用全局平均池化。因此，我们在总共 $(L + 1)$ 个特征图 $\{\mathbf{Z}^\ell\}_{\ell=1}^{L+1}$ 中获得了，分别捕获了不同粒度级别的短期和长期上下文。




