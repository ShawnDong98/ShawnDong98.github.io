---
layout:     post
title:      "【深度学习】CycleGAN：Unpaired Image-to-Image Translation using Cycle-Consistent Adversarial Networks"
subtitle:   ""
date:       2021-09-09
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - GAN
---

# Abstract



我们的目标是学习一种映射 G: X -> Y， 使用对抗损失 使得无法分辨  G(x) 的图像分布和 Y的分布。

因为这种映射没有约束， 我们使用一种反映射 F: Y -> X， 以及引入循环一致损失强制 $F(G(X)) \approx X$