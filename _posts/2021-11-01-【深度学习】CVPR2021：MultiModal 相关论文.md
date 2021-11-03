---
layout:     post
title:      "【深度学习】CVPR2021：MultiModal 相关论文"
subtitle:   ""
date:     2021-11-01
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - 
---


# Human-like Controllable Image Captioning with Verb-specific Semantic Roles

Controllable Image Captioning (CIC) —— 根据指定的控制信号生成图像描述 —— 在过去的几年里受到了前所未有的关注。 为了模仿人类控制描述生成的能力，目前的CIC研究只关注与客观属性有关的控制信号，如 contents of interest 或 descriptive patterns。然而，几乎所有现有的客观控制信号都忽略了理想控制信号的两个不可缺少的特性： 1）Event-compatible: 在一句话中提到的所有视觉内容都应该与所描述的活动相兼容。2）Sample-suitable: 控制信号应该适合于特定的图像样本。为此，这篇文章为CIC提出了一种新的控制信号: Verb-specific Seman-tic Roles (VSR)。VSR由一个 verb 和一些 semantic roles 组成，表示目标活动和该活动中涉及的 entity 角色。给定一个设计好的的VSR,，首先训练一个  grounded semantic role labeling (GSRL) 模型来 identify 和 ground 每个角色的所有 entity。然后，提出了一个 semantic structure planner (SSP) 来学习像人类一样的 descriptive semantic structures。最后，使用 role-shift captioning 模型来生成描述。


这篇文章认为所有现有的CIC客观控制信号都忽略了两个不可缺少的特性: event-compatibl和sample-suitable。为此，提出了一种新的控制信号VSR。VSR由一个 verb 和几个 semantic roles 组成，也就是说，所有 components 都保证是  event-compatible 的。


# Improving OCR-based Image Captioning by Incorporating Geometrical Relationship 

基于 OCR 的 image captioning 目标是基于图像中 visual entities（同时包括 visual objects 和 scene text）自动描述图像。与传统的 image captioning 相比，基于 OCR 的 image captioning 需要场景文本的推理，因为生成的描述往往包含多个OCR token。现有的方法试图通过用丰富的 visual 和 visual 表征对 OCR token 进行编码来实现这一目标。然而，OCR token之间的强相关性可能无法在这种有限的表征下建立。这篇文章提出从利用 geometrical 的角度来增强OCR token 之间的联系。其综合考虑 OCR token 之间的高度、宽度、距离、IoU和方向关系来构造几何关系。为了将学习到的关系 以及 视觉和语义表征 整合到一个统一的框架中，这篇提出了 Long Short-Term Memory + Relation-aware pointer 网络(LSTM-R)结构。在 OCR tokens 之间的几何关系的指导下，LSTM-R 利用新设计的 Relation-aware pointer 网络从场景文本中选择OCR token，用于基于OCR的 image captioning 。

这片文章提出了一种  Long Short-Term Memory + Relation-aware pointer 网络(LSTM-R)结构，利用 OCR token 之间的几何关系实现了基于OCR的 image captioning 。为了将学习到的关系融入到框架中，设计了一个 relation-based pointer 网络，该网络在几何关系的指导下从OCR tokens 中复制单词。为了便于模型的训练，还设计了一种字编码方法，并提出了多标签损失去优化模型。


# FAIEr: Fidelity and Adequacy Ensured Image Caption Evaluation 

Image caption 的评估是一个重要的任务， 它包括语义准确度结合图像和文本的匹配度。良好的评估指标的目标是公平、全面和 与人类的判断 一致。当人们评价一个描述时，他们通常会考虑多个方面，比如它是否与目标图像相关而没有失真，它传达了多少图像要点，以及语言和措辞有多流利和漂亮。以上三种不同的评价取向可以概括为 fidelity 、 adequacy 和 fluency。前两者依赖于图像内容，而 fluency 则纯粹与语言学有关，更加主观。