---
layout:     post
title:      "【深度学习】NGramSwin：N-Gram in Swin Transformers for Efficient Lightweight Image Super-Resolution"
subtitle:   ""
date:       2023-11-26
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - CVPR 2023
---

# Abstract

虽然一些研究已经证明，具有窗口自注意力（WSA）的 Swin Transformer（Swin）适用于图像超分辨率（SR），但由于感受野有限，普通WSA在重建高分辨率图像时忽略了广阔的区域。