---
layout:     post
title:      "【ICCV 2023】Lighting Every Darkness in Two Pairs: A Calibration-Free Pipeline for RAW Denoising"
subtitle:   ""
date:       2024-02-03
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - ICCV 2023
    - 
---

# Abstract

基于校准的方法在极低光环境下主导了RAW图像降噪。

然而，这些方法存在几个主要不足之处：

1）校准过程繁琐且耗时

2）不同相机的降噪器难以转移

3）高数字增益扩大了合成噪声与真实噪声之间的差异。

为了克服以上缺点，我们提出了一种无需校准的 Lighting Every Darkness（LED）Pipeline，不受数字增益或相机传感器的限制。

与反复校准噪声参数并进行训练不同，我们的方法只需少量配对数据和微调即可适应目标相机。

此外，在两个阶段都经过精心设计的结构修改减轻了合成和真实噪声之间的领域差距，而无需额外的计算成本。

通过每个额外数字增益（总共6对）和0.5%的迭代，我们的方法在性能上优于其他基于校准的方法。