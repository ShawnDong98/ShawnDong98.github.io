---
layout:     post
title:      "【深度学习】DeepLabV3+：Encoder-Decoder with Atrous Separable Convolution for Semantic Image Segmentation"
subtitle:   ""
date:       2022-08-31
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - Segmentation
    - ECCV 2018
---

# Abstract

深度神经网络采用空间金字塔池化模块或编码-解码器结构完成语义分割任务。

前者可以通过用 filters probing 传入的特征或以 multiple rates 和 multiple effective fields-of-view 的池化操作来编码多尺度的上下文信息，而后者可以通过逐渐恢复空间信息来捕获更清晰的物体边界。

在这项工作中，作者提出结合两种方法的优点。

具体地说，作者提出DeepLabv3+通过添加一个简单而有效的解码器模块来扩展DeepLabv3，以 refine segmentation results，特别是沿着 object boundaries。

作者进一步研究了Xception模型，并将深度可分离卷积应用于Atrous Spatial  Pyramid Pooling 和解码器模块，从而得到一个更快、更强的编码器-解码器网络。

# Conclusion

作者提出的模型 DeepLabv3+ 采用编码器-解码器结构，其中DeepLabv3用于编码丰富的上下文信息，并采用一个简单而又有效的解码器模块来恢复目标边界。

人们也可以应用 atrous convolution 提取编码器的特征在任意分辨率，取决于可用的计算资源。

作者还探索了Xception模型和atrous可分离卷积，使所提出的模型更快和更强。