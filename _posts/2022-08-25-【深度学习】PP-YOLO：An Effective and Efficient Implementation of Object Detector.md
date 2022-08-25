---
layout:     post
title:      "【深度学习】PP-YOLO: An Effective and Efficient Implementation of Object Detector"
subtitle:   ""
date:       2022-08-25
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - CV
    - Arxiv 2020
---

# Abstract

目标检测是计算机视觉的一个重要领域，在各种实际场景中发挥着关键作用。

在实际应用中，由于硬件的限制，常常需要牺牲精度来保证检测器的推理速度。

因此，必须考虑目标检测器的有效性和效率之间的平衡。

这篇文章的目标不是提出一种新的检测模型，而是实现一种有效性和效率相对均衡的、可以直接应用于实际应用场景的目标检测器。

考虑到YOLOv3在实际应用中的广泛应用，作者开发了一种新的基于YOLOv3的目标检测器。

作者主要尝试结合现有的各种几乎不增加模型参数和FLOPs数量的技巧，在保证速度基本不变的情况下，尽可能提高检测器的精度。

由于这篇文章所有的实验都是基于PaddlePaddle进行的，所以称之为PP-YOLO。

PP-YOLO通过多种技巧的结合，可以在准确率(45.2% mAP)和速度(72.9 FPS)之间取得更好的平衡，超过了现有的最先进的检测器effentdet和YOLOv4。

# Conclusion

这篇文章介绍了一种基于PaddlePaddle的目标检测器的新实现——PP-YOLO。

PP-YOLO比其他先进的检测器(如effentdet和YOLOv4)更快(FPS)和更准确(COCO mAP)。

这篇文章探索了许多技巧，并展示了如何在YOLOv3检测器上组合这些技巧，并演示了它们的有效性。