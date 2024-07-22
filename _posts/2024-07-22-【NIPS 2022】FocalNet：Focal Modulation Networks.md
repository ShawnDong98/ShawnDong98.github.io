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

