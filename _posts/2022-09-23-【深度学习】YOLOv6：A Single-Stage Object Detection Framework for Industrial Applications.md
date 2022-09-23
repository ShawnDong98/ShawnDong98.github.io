---
layout:     post
title:      "【深度学习】YOLOv6: A Single-Stage Object Detection Framework for Industrial Applications"
subtitle:   ""
date:       2022-09-23
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - Detection
    - Arxiv 2022
---

# Abstract

多年来，YOLO系列一直是高效物体检测的实际行业级标准。

YOLO社区以压倒性优势繁荣，以丰富其在众多硬件平台和丰富的场景中的使用。

在本技术报告中，作者将其提升到一个新的水平，以坚定不移的行业应用心态向前迈进。

考虑到在现实环境中对速度和准确性的不同要求，作者广泛研究了工业届和学术界的最新物体检测进展情况。

具体上讲，作者从最近的网络设计、训练策略、测试技术、量化和优化方法中大量吸收了想法。

在此基础上，作者整合了思想和实践，构建了一套不同规模的可部署网络，以适应多样化的用例。

在YOLO 作者们的慷慨许可下，作者将其命名为YOLOv6。

作者还向用户和贡献者表示热烈的欢迎，以进一步增强。

为了了解性能，作者的 YOLOv6-N 在 NVIDIA Tesla T4 GPU 上以 1234 FPS 的吞吐量在COCO数据集中达到35.9%的AP。

YOLOv6-S 以 495 FPS 的速度达到43.5%的AP，在相同规模上优于其他主流检测器（YOLOv5-S、YOLOX-S和PPYOLOE-S）。

量化版本的 YOLOv6-S 甚至带来了新的最先进的 43.3% 的AP，为869 FPS。

此外，与推断速度相似的其他探测器相比，YOLOv6-M/L还实现了更好的精度性能（即49.5%/52.3%）。


# Method

YOLOv6的 新设计包括以下组件、网络设计、标签分配、损失函数、数据增强、工业友好的改进以及量化和部署：

- **Network Design:** *Backbone:* 与其他主流架构相比，作者发现RepVGG [3]主干以类似的推理速度在小型网络中配备了更多的表征能力，而由于参数的爆炸性增长和计算成本，它几乎无法扩展到以获得更大的模型。在这方面，作者将RepBlock[3]作为作者建设小型网络的 block。对于大型网络，作者修改了一个更高效的CSP [43] block，名为CSPStackRep 块。*Neck* YOLOv6的 neck 采用与 YOLOv4 和 YOLOv5 一样的 PAN 结构[24] 。作者使用 RepBlocks 或CSP StackRep Blocks 增强 Neck，得到 Rep-PAN。 *Head*： 作者简化 decoupled head 以提高其效率，称为 *Efficient Decoupled Head*。

- **Label Assignment:**  作者通过许多实验评估了 YOLOv6 上标签分配策略[5、7、18、48、51]的最新进展，结果表明TAL [5]更有效，更易于训练。

- **Loss Function:** 主流 Anchor-free 目标检测器的损失函数包括分类损失、边界框回归损失和物体损失。对于每个损失，作者都会系统地使用所有可用的技术进行实验，最后选择 VariFocal Loss [50]作为分类损失，选择 SIoU [8]/GIoU [35]损失作为回归损失。

- **Industry-handy improvements:** 作者引入了额外的常见实践和技巧，以改善表现，包括自蒸馏和更多的训练 epoch。 对于自蒸馏，分类和边界框回归分别由教师模型监督。由于DFL[20]，边界框回归的蒸馏成为可能。此外，来自软标签和硬标签的信息比例通过余弦衰变动态下降，这有助于学生在训练过程中的不同阶段有选择地获得知识。

- **Quantization and deployment:** 为了缓解量化基于重参数化的模型中的性能退化，作者使用RepOptimizer[2]训练YOLOv6，以获得PTQ友好的权重。我们采用通道级别的蒸馏[36]和图优化的 QAT 来追求极限性能。作者的量化YOLOv6-S 以 42.3% 的 AP 和 869 FPS的吞吐量（批大小=32）达到了新SOTA。

## Network Design

##  Label Assignment

##  Loss Functions



# Conclusion

简而言之，考虑到持续的工业要求，作者提出了YOLOv6的当前形式，仔细检查了迄今为止物体检测器组件的所有进步，同时加入了作者的想法和实践。


结果在准确性和速度上都超过了其他可用的实时检测器。

为了便于工业部署，作者还为 YOLOv6 提供了定制的量化方法，使开箱即用的检测器速度更快。


