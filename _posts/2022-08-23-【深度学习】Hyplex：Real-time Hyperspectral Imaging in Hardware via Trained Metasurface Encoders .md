---
layout:     post
title:      "【深度学习】Hyplex：Real-time Hyperspectral Imaging in Hardware via Trained Metasurface Encoders "
subtitle:   ""
date:       2022-08-23
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - HSI
    - CVPR 2022
---

# Abstract

高光谱成像在图像分类和计算机视觉自动模式识别中的光谱特征识别方面受到了广泛关注。

最先进的快照高光谱成像实现依赖于笨重的、非集成的和昂贵的光学元件，包括透镜、光谱仪和滤光片。

这些宏观组件不允许对数据进行快速处理，例如实时和高分辨率视频。

这项工作引入了Hyplex，一个新的集成架构，解决了上面讨论的限制。

Hyplex是一款cmos兼容的快速高光谱相机，它用人工智能反设计的纳米级超表面取代了bulk optics。

Hyplex不需要光谱仪，而是使用传统的单色相机，这为实时和高分辨率的高光谱成像提供了可能，而且成本低廉。

Hyplex利用模型驱动的优化，将物理 metasurface 层与基于端到端训练的现代视觉计算方法连接起来。

作者设计并实现了Hyplex的原型版本，并将其性能与最先进的典型成像任务(如光谱重建和语义分割)进行了比较。

在所有基准测试中，Hyplex报告的重构误差最小。

此外， 作者还提供了最大的公开可用的标记高光谱数据集，用于语义分割。

# Conclusion