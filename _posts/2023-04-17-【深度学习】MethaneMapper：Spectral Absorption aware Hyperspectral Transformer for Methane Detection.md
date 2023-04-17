---
layout:     post
title:      "【深度学习】MethaneMapper: Spectral Absorption aware Hyperspectral Transformer for Methane Detection"
subtitle:   ""
date:       2023-04-17
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - HSI
    - CVPR 2023
---

# Abstract

甲烷（CH4）是全球气候变化的主要因素。

最近的机载可见红外成像光谱仪-下一代（AVIRIS-NG）在甲烷排放的定量测绘方面非常有用。

分析这些数据的现有方法对当地地形条件很敏感，通常需要领域专家的手动检查，容易出现重大错误，因此无法扩展。

为了应对这些挑战，我们提出了一个新的端到端 spectral absorption wavelength aware transformer 网络MethaneMapper，以检测和量化排放。