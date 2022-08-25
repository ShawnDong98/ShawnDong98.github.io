---
layout:     post
title:      "【深度学习】PP-YOLOE: An evolved version of YOLO"
subtitle:   ""
date:       2022-08-25
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - CV
    - Arxiv 2022
---

# Abstract

在这份报告中，作者介绍了PP-YOLOE，一种高性能和友好部署的工业最先进的目标检测器。

作者在之前PP-YOLOv2的基础上进行优化，使用 Anchor-free 范式，更强大的 backbone 和 neck， 使用了cspresstage, ET-head和动态标签分配算法 TAL。

结果，PP-YOLOE-l在COCO test-dev 上实现了51.4 mAP，在 Tesla V100上实现了 78.1 FPS，与之前最先进的工业型PP-YOLOv2 和 YOLOX 相比，分别取得了(+1.9 AP，+ 13.35%加速)和(+1.3 AP，+24.96%加速)的显著提升。

此外，加上TensorRT和fp16， PP-YOLOE推理速度达到149.2 FPS。

# Conclusion

这份报告介绍了PP-YOLOv2的几个更新，包括 scalable backbone-neck 结构，高效的 task aligned head，先进的 label assignment strategy 和精细的目标损失函数，形成了一系列高性能的目标探测器称为PP-YOLOE。

此外， 作者提供了 s/m/l/x 模型以覆盖不同的实际场景。

此外，这些模型可以顺利过渡到部署，有PaddlePaddle官方支持。