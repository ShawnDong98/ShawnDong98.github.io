---
layout:     post
title:      "【深度学习】AP-BSN: Self-Supervised Denoising for Real-World Images via Asymmetric PD and Blind-Spot Network "
subtitle:   ""
date:       2022-08-23
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - CVPR 2022
---

# Abstract


Blind-spot 网络(BSN)及其变体在自监督去噪方面取得了重大进展。

然而，由于 pixel-wise independent noise 这样的不太实用的假设，它们仍然被限制在合成噪声输入上。

因此，使用自监督的BSN处理空间相关的真实世界噪声是具有挑战性的。

近年来，人们提出了 pixel-shuffle downsample(PD)技术来去除真实世界噪声的空间相关性。

然而，将PD和BSN直接集成在一起并不是一件容易的事情，这阻碍了对真实图像的完全自监督去噪模型。

这篇文章提出了一种 Asymmetric PD (AP) 来解决这个问题，它引入了不同的 PD stride factors 来进行训练和推断。

我们系统地展示了了所提出的AP可以解决由特定PD stride factor 引起的 inherent trade-offs，使BSN适用于实际场景。

为此，作者开发了AP-BSN，一种最先进的用于真实sRGB图像的自监督去噪方法。

作者进一步提出了 random-replacing refinement，这大大提高了 AP-BSN 的性能，而不需要任何额外的参数。

# Conclusion

