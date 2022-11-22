---
layout:     post
title:      "【深度学习】DiffusionDet: Diffusion Model for Object Detection"
subtitle:   ""
date:       2022-11-22
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - Detection
    - Arxiv 2022
---

# Abstract

作者提出了DiffusionDet，这是一个新的框架，用于将目标检测模拟为从噪声边界框到目标边界框的去噪扩散过程。

在训练阶段，目标边界框从真实边界框扩散到随机分布，模型学会了扭转这个噪声过程。

在推理中，模型以渐进的方式将一组运行随机生成的边界框细化为输出结果。

对标准 benchmark（包括 MS-COCOCO 和 LVIS ）的广泛评估表明，与之前成熟的检测器相比，DiffusionDet的性能良好。

该的工作带来了两个重要的目标检测发现。

首先，随机框虽然与预定义的先验框或学习查询截然不同，但也是有效的目标候选对象。

其次，目标检测是具有代表性的感知任务之一，可以通过生成方式解决。


# Approach

## Preliminaries

**Object detection.** 目标检测的学习目标是输入目标对 $(x, b, c)$， 其中 $x$ 是输入图像， $b$ 和 $c$ 分别是在图像 $x$ 中的目标的一组边界框和类别标签。具体来说， 作者公式化集合中第 $i$ 哥边界框为 $b^i = (c_x^i, c_y^i, w^i, h^i)$， 其中 $(c_x^i, c_y^i)$ 是边界框的中心坐标， $(w^i, h^i)$ 分别是边界框的宽和高。

# Conclusion and Future Work

在这项工作中，作者提出了一种新的检测范式 DiffusionDet，将目标检测视为从噪声边界框到目标边界框的去噪扩散过程。作者的噪声到边界框流程具有几种吸引人的特性，包括动态边界框和渐进细化，使作者能够使用相同的网络参数来获得所需的速度精度权衡，而无需重新训练模型。标准检测基准的性能表明，与成熟的检测器相比，DiffusionDet 实现了良好的性能。

为了进一步探索扩散模型解决目标级识别任务的潜力，未来的几项工作是有益的。尝试将 DiffusionDet 应用于视频级任务，例如目标跟踪和动作识别。另一个是将 DiffusionDet 从封闭世界扩展到开放世界或开放词汇目标检测。