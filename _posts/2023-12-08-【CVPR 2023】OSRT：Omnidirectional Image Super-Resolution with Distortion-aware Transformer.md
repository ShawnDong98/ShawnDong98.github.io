---
layout:     post
title:      "【CVPR 2023】OSRT: Omnidirectional Image Super-Resolution with Distortion-aware Transformer"
subtitle:   ""
date:       2023-12-08
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - CVPR 2023
    - 深度学习
---

# Abstract

全方位影像（ODIs）因其沉浸式体验而获得了大量研究兴趣。

尽管全方位影像需要极高的分辨率来捕捉整个场景的细节，但大多数全方位影像的分辨率都不足。

以往的方法试图通过对等距圆柱投影（ERP）图像进行图像超分辨率（SR）处理来解决这个问题。

然而，它们忽略了在退化过程中ERP的几何属性，而且它们的模型很难泛化到真实的ERP图像。

在本文中，我们提出了鱼眼降采样，它模仿真实世界的成像过程，并合成更真实的低分辨率样本。然后我们设计了一个 distortion-aware Transformer（OSRT），以连续自适应地调整ERP畸变。无需繁琐的处理，OSRT在PSNR上的性能比以前的方法提高了大约0.2dB。

此外，我们提出了一种便捷的数据增强策略，它可以从普通图像合成伪ERP图像。这个简单的策略可以缓解大型网络的过拟合问题，并显著提升ODISR的性能。大量实验已经证明了我们OSRT的先进性能。