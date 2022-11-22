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

**Diffusion model.** 扩散模型是一类基于似然的模型， 受启发与热力学理论。这些模型通过逐渐向样本数据添加噪声，定义了马尔可夫扩散前向过程链。前向噪声过程被定义为：

$$
q(z_t \mid z_0) = \mathcal{N}(z_t \mid \sqrt{\bar \alpha_t} z_0, (1 - \bar \alpha_t) I)
$$
其通过添加噪声到 $z_0$ 上， 将数据样本 $z_0$ 转换为隐噪声样本 $z_t$， 其中 $t \in {0, 1, ..., T}$。 $\bar \alpha_t := \prod_{s=0}^t \alpha_s = \prod_{s=0}^t (1 - \beta_s)$， 其中 $\beta_s$ 表示噪声方差策略。在训练期间， 一个神经网络 $f_\theta(z_t， t)$ 被训练以预测 $z_0$ 到 $z_t$ ， 通过最小化 $\ell_2$ 损失：

$$
\mathcal{L}_{train} = \frac{1}{2} \| f_\theta(z_t, t) - z_0\|^2
$$

在推理阶段， 数据样本 $z_0$， 最推理阶段，数据样本 $z_0$ 被从噪声 $z_T$ 和模型 $f_\theta$ 以及更新规则以一种迭代的形式重建出来， 如 $z_T \rightarrow z_{T - \Delta} \rightarrow ... \rightarrow z_0$。 


在这项工作中，作者旨在通过扩散模型解决目标检测任务。在设置中，数据样本是一组边界框 $z_0 = b$，其中 $b \in \mathbb{R}^{N \times 4}$ 是一组 $N$ 个边界框。神经网络 $f_\theta(z_t, t, x)$ 被训练从噪声框 $z_t$ 预测 $z_0$。 相应地生成相应的类别标签 $c$。


## Architecture

由于扩散模型迭代生成数据样本，因此需要在推理阶段多次运行模型 $f_\theta$。然而，在每个迭代步骤中直接将 $f_\theta$ 应用于原始图像在计算上是不可行的。因此，作者提出将整个模型分为图像编码器和检测解码器两部分，前者只运行一次，从原始输入图像 $x$ 中提取深度特征表示，后者以该深度特征作为条件，而不是原始图像，从噪声框中逐步细化边界框预测。

# Conclusion and Future Work

在这项工作中，作者提出了一种新的检测范式 DiffusionDet，将目标检测视为从噪声边界框到目标边界框的去噪扩散过程。作者的噪声到边界框流程具有几种吸引人的特性，包括动态边界框和渐进细化，使作者能够使用相同的网络参数来获得所需的速度精度权衡，而无需重新训练模型。标准检测基准的性能表明，与成熟的检测器相比，DiffusionDet 实现了良好的性能。

为了进一步探索扩散模型解决目标级识别任务的潜力，未来的几项工作是有益的。尝试将 DiffusionDet 应用于视频级任务，例如目标跟踪和动作识别。另一个是将 DiffusionDet 从封闭世界扩展到开放世界或开放词汇目标检测。