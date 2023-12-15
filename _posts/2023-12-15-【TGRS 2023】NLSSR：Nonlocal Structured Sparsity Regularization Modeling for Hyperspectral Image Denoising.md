---
layout:     post
title:      "【TGRS 2023】NLSSR：Nonlocal Structured Sparsity Regularization Modeling for Hyperspectral Image Denoising"
subtitle:   ""
date:       2023-12-15
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - TGRS 2023
    - 深度学习
---

# Abstract

针对高光谱图像（HSI）去噪的非局部基模型首先使用非局部自相似性（NSS）先验将相似的全带块分组为三维非局部全带组（张量），并采用块匹配（BM）操作，然后通常对每个非局部全带组施加低秩（LR）惩罚以降低噪声。尽管基于非局部的方法在HSI去噪中表现出了有希望的性能，但大多数现有方法仅考虑了非局部全带组的LR属性，而忽略了稀疏系数之间的强相关性。此外，这些方法通常由于BM操作对噪声的敏感性而导致不满意的视觉伪影，同时需要昂贵的计算。为了解决这些限制，本文提出了一种新颖的非局部结构稀疏正则化（NLSSR）方法用于HSI去噪。首先，为了减轻BM操作的噪声敏感性，我们提出了一种基于图的域距离方案来索引相似的全带块以形成非局部全带组。其次，我们设计了一种复杂度低的自适应单向LR字典，考虑了非局部全带张量不同模式之间固有结构相关性的差异。第三，我们使用全局光谱LR先验来减少光谱冗余。第四，我们开发了一种基于交替最小化框架的广义软阈值（GST）算法来解决基于NLSSR的HSI去噪问题。我们对模拟数据和真实数据进行了广泛的实验，以证明所提出的NLSSR算法在定量和视觉评估方面均优于许多流行的或最新的HSI去噪方法