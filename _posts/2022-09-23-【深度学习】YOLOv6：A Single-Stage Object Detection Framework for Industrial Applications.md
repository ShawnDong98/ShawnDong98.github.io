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


# Conclusion

简而言之，考虑到持续的工业要求，作者提出了YOLOv6的当前形式，仔细检查了迄今为止物体检测器组件的所有进步，同时加入了作者的想法和实践。


结果在准确性和速度上都超过了其他可用的实时检测器。

为了便于工业部署，作者还为 YOLOv6 提供了定制的量化方法，使开箱即用的检测器速度更快。


