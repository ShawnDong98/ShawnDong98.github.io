---
layout:     post
title:      "【ICCV 2023】CTM-SCI：Unfolding Framework with Prior of Convolution-Transformer Mixture and Uncertainty Estimation for Video Snapshot Compressive Imaging"
subtitle:   ""
date:       2023-11-30
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - ICCV 2023
    - 
---

# Abstract

我们考虑了视频快照压缩成像（SCI）的问题，其中连续的高速帧被不同的编码模板调制，并通过单一测量捕获。从单一测量中重建多帧图像的基本原理是解决一个病态问题。通过结合优化算法和神经网络，深度展开网络（DUNs）在解决逆问题方面取得了巨大成就。在本文中，我们提出的模型基于DUN框架下，并且我们提出了一个带有插入的3D高效且可伸缩的注意力模型的 3D Convolution-Transformer Mixture（CTM）模块，该模块借助 Transformer 充分学习了时空维度之间的相关性。据我们所知，这是 Transformer 首次用于视频SCI重建。此外，为了进一步研究在重建过程中被先前研究忽略的高频信息，我们引入了方差估计来表征基于像素的不确定性。大量实验结果表明，我们提出的方法实现了最先进的（SOTA）结果（在PSNR上比之前的SOTA算法高出1.2dB）。