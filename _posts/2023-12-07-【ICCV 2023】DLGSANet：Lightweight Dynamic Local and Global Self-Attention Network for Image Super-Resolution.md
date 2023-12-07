---
layout:     post
title:      "【ICCV 2023】DLGSANet: Lightweight Dynamic Local and Global Self-Attention Network for Image Super-Resolution"
subtitle:   ""
date:       2023-12-07
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - ICCV 2023
    - 深度学习
---

# Abstract

我们提出了一种高效的轻量级动态局部和全局自注意力网络（DLGSANet）来解决图像超分辨率问题。

我们的方法在保持低计算成本的同时探索了 Transformer 的属性。

受 Transformer 网络设计的启发，我们开发了一个简单而有效的多头动态局部自注意力（MHDLSA）模块，以高效提取局部特征。

此外，我们注意到现有的 Transformer 通常探索查询和键之间的所有相似性以进行特征聚合。

然而，并不是所有的 query 中的 token 都与 key 中的相关，使用所有相似性并不能有效地促进高分辨率图像的重建。为了克服这个问题，我们开发了一个稀疏全局自注意力（SparseGSA）模块，以选择最有用的相似度值，以便更好地利用最有用的全局特征进行图像重建。我们开发了一个混合动态变换器块（HDTB），它集成了MHDLSA和SparseGSA，用于探索局部和全局特征。为了简化网络训练，我们将HDTBs构建成一个残差混合动态变换器组（RHDTG）。通过将RHDTGs嵌入到一个端到端可训练的网络中，我们证明了所提出的方法在保持较少的网络参数和更低的计算成本的同时，就准确度而言，与最先进的方法相比具有竞争力的性能。

