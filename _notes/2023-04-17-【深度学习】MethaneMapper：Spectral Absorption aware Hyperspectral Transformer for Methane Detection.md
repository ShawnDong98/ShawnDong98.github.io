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

MethaneMapper引入了两个新颖的模块，这些模块有助于定位光谱域中最相关的甲烷 plume 区域，并使用它们来准确定位这些区域。

彻底的评估表明，与当前最先进的技术相比，MethaneMapper在检测中实现了0.63 mAP，并减少了模型尺寸（5×）。

此外，我们还为2015-2022年超过1200条AVIRIS-NG飞行线路引入了甲烷 plume 分割掩码的大规模数据集。

它包含4000多个甲烷 plume sites。

我们的数据集将为研究人员提供开发和推进新方法的机会，以解决这一挑战性的温室气体检测问题，并产生更广泛的社会影响。