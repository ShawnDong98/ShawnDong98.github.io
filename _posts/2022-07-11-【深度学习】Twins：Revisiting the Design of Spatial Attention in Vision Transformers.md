---
layout:     post
title:      "【深度学习】Twins: Revisiting the Design of Spatial Attention in Vision Transformers"
subtitle:   ""
date:      2022-07-11 
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - NeurIPS 2021
---

# Abstract
最近，人们提出了用于密集预测任务的各种视觉 Transformer 架构，它们表明空间注意力的设计对这些任务的成功至关重要。

这项工作重新审视了空间注意力的设计，并证明了一个精心设计但简单的空间注意力机制优于最先进的方案。

因此，这篇文章提出了两种视觉 Transformer 架构，即 twins-pcpvt和 twins- svt。

提出的架构高效且易于实现，只涉及在现代深度学习框架中高度优化的矩阵乘法。

更重要的是，所提出的架构在广泛的视觉任务上实现了优异的性能，包括图像级别的分类以及密集检测和分割。

简单和强大的性能表明，提出的架构可以作为许多视觉任务的更强大的骨干。


# 
# Twins

这篇文章为视觉 Transofrmer 提出了两种简单而强大的空间设计。第一种方法建立在PVT和CPVT的基础上，只使用全局注意力。该架构因此被称为 Twins-PCPVT。第二种被称为 Twins-SVT，是基于所提出的交叉局部和全局注意力的SSSA。

## Twins-PCPVT 

PVT 引入了金字塔多级设计，以更好地解决密集的预测任务，如目标检测和语义分割。它继承了 ViT 和 DeiT 中设计的绝对位置编码。各层利用全局注意力机制，依靠空间缩减来降低处理整个序列的计算成本。最近提出的基于移动局部窗口的 Swin Transformer， 取得了比 PVT 更好的表现， 其良好性能与有效的大感受野十分相关。

这项工作中发现，PVT性能不佳的主要原因是在PVT中使用了绝对位置编码。如CPVT所示，绝对位置编码在处理不同大小的输入时遇到困难(这在密集预测任务中很常见)。此外，这种位置编码也打破了平移不变性。Swin Transformer 利用相对位置编码，这就绕过了上述问题。这篇文章证明这是 Swin 优于PVT的主要原因。 如果使用适当的位置编码，PVT实际上可以达到与Swin变压器相同的水平，甚至更好的性能。

这里使用CPVT中提出的条件位置编码(CPE)来取代PVT中的绝对位置编码。CPE以输入为条件，可以自然地避免绝对编码的上述问题。生成CPE的位置编码生成器(PEG)被放置在每个 stage 的第一个编码器块之后。这篇文章使用PEG最简单的形式，即不需要批处理归一化的2D深度卷积。对于图像级分类，和CPVT一样，删除class token，并在 stage 的末尾使用全局平均池化(GAP)。对于其他视觉任务，遵循PVT的设计，twin-pcpvt 继承了 PVT 和 CPVT 的优点，使其易于高效实现。广泛的实验结果表明，这种简单的设计可以匹配最新的最先进的 Swin Transformer 的性能。在 Swin 中也尝试用 CPE 替代相对PE，但这并没有带来明显的性能提升，这在实验中得到了证明。这可能是因为 Swin 中使用了移位窗口，这可能与CPE不太匹配。

## Twins-SVT

在密集的预测任务中，由于高分辨率输入，视觉 Transformer 的计算量非常大。给定输入 H x W 分辨率， 有 d 个维度的自注意力的复杂度为 $O(H^2W^2d)$。 在此，这篇文章提出空间可分离自注意力(SSSA)来缓解这一挑战。SSSA 由局部分组的LSA (local -grouped self-attention)和全局下采样的GSA (global sub-sampled attention)组成。

**Locally-grouped self-attention (LSA).**  在 Depthwise 卷积设计的启发下，首先将二维特征映射平均划分为子窗口，使自注意力通信只发生在每个子窗口内。这种设计也与原始自注意力中的多头设计相似，在原始自注意力中，通信只发生在同一个head 的通道内。具体来说，特征映射被划分为 $m \times n$ 个子窗口。每个 group  包含 $\frac{HW}{mn}$ 个元素， 因此这个窗口的自注意力计算成本为 $O(\frac{H^2W^2}{m^2 n^2})d$， 总计算成本为 $O(\frac{H^2W^2}{mn}d)$。如果令 $k_1 = \frac{H}{m}$ 和 $k_2 = \frac{W}{n}$， 计算成本为 $O(k_1k_2HWd)$， 当 $k_1 << H$ 并且 $k_2 << W$ 时， 效率显著提升，并且当 $k_1$ 和 $k_2$ 固定时， 计算量随 $HW$ 线性增长。

虽然局部分组的自注意力机制是计算友好的，图像被划分为不重叠的子窗口。因此需要一种机制来在不同的子窗口之间进行通信，就像在Swin 中一样。否则，信息将被限制在局部处理，这使得感受野很小，显著降低性能，如实验所示。

一个简单的解决方案是在每个局部注意力块之后添加额外的标准全局自注意力层，这可以实现跨组信息交换。然而，这种方法会带来 $O(H^2 W^2d)$ 的计算复杂度。这里使用 $m \times n$ 个子窗口中重要信息的代表来实现不同子窗口之间的通信， 这使得计算成本降低为 $O(mnHWd) = O(\frac{H^2W^2d}{k_1k_2})$。 这在本质上相当于使用下采样特征映射作为注意力操作的 key，因此称之为 global sub-sample attention (GSA)。总的计算成本为 $O(\frac{H^2W^2d}{k_1k_2} + k_1k_2HWd)$。当 $k_1 · k_2 = \sqrt{HW}$ 时取得最小值。假设 $H = W = 224$。 网络设计包括几个不同分辨率的阶段。Stage 1 为 56 x 56 的特征图， 当 k_1 = k_2 = \sqrt{56} \approx 7 时最小。理论上来说， 可以在每个 stage 校准最优的 $k_1$ 和 $k_2$。为了简单， 在所有地方使用 $k_1$ = $k_2$ = 7。对于分辨率较低的阶段，我们控制 GSA 的 summarizing 窗口大小，以避免生成的 key 数量过少。具体来说，stage1 和 stage2 分别使用4、2的窗口大小， 最后三个 stage 窗口大小为 1。

至于 sub-sampling 函数，研究了几个选项，包括平均池化、 depth-wise strided 卷积 和 regular strided 卷积。实验结果表明，regular stided 卷积算法的性能最好。

和标准的 self-attention 一样，LSA和GSA都有多个 head。

使用 CPVT 的 PEG 来编码位置信息和处理可变长的输入。 它在每个 stage 的第一个 block 之后插入。

**Comparison with Swin** swin 使用局部窗口注意力， 使用窗口 shift 实现信息交流。这是用来在不同的 patches 之间引入交流，并增加感受野。但是，这个过程相对复杂，并且可能没有在移动设备(如移动设备)上进行速度优化。Swin Transformer依赖于 `torch.roll()` 对特征执行循环移位和它的反过程。这种操作对内存不友好，并且很少被流行的推理框架支持，如NVIDIA TensorRT，谷歌Tensorflow-Lite，和Snapdragon神经处理引擎SDK (SNPE)等。
# Conclusion

这篇文章提出了两个强大的视觉 Transformer 主干, Twins-PCPVT 和 Twins-SVT，用于图像级分类和一些下游密集预测任务。

前者探索了在视觉 Transformer 金字塔中的条件位置编码， 确保其在很多视觉任务上提升性能。

在后一种变体中，回顾了当前的注意力设计，提供了一个更有效的注意力范式。

将局部注意力和全局注意力交织在一起可以产生令人印象深刻的结果，而且它具有更高的吞吐量。