---
layout:     post
title:      "【CVPR 2023】Spatially Adaptive Self-Supervised Learning for Real-World Image Denoising"
subtitle:   ""
date:       2023-12-11
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - CVPR 2023
    - 
---

近几年，在自监督图像去噪（SSID）方面取得了显著进展。

然而，大多数方法都集中在处理空间独立的噪声上，并且对于带有空间相关噪声的真实世界sRGB图像的实际应用性不大。

尽管建议使用像素随机下采样来打破噪声相关性，但这样做破坏了图像的原始信息，限制了去噪性能。

在本文中，我们提出了一种解决这个问题的新视角，即寻找适应空间的监督以进行真实世界sRGB图像去噪。具体来说，我们考虑了噪声图像中平坦区域和有纹理区域各自的特点，并分别为它们构建监督。

对于平坦区域，可以安全地从非相邻像素中得出监督，这些像素与当前像素距离很远，可以排除噪声相关像素的影响。我们将 blind-spot network 扩展到一个 blind-neighborhood network （BNN），为平坦区域提供监督。

对于有纹理的区域，监督必须与相邻像素的内容密切相关。我们提出了一种  locally aware network（LAN）来满足这一需求，同时 LAN 本身选择性地接受 BNN 输出的监督。

结合这两种监督，可以很好地训练去噪网络（例如，U-Net）。广泛的实验表明，我们的方法在真实世界sRGB照片上的去噪性能优于最先进的SSID方法。