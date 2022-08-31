---
layout:     post
title:      "【深度学习】Segmentation Transformer(OCRNet)： Object-Contextual Representations for Semantic Segmentation"
subtitle:   ""
date:       2022-08-31
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - Segmentation
    - ECCV 2020
---
# Abstract

这篇文章研究了语义分割中的上下文聚合问题。基于像素的标签是该像素所属对象的类别，作者提出了一种简单而又客观的方法，object-contextual representations，通过利用对应对象类的表示来表征一个像素。首先，作者在真实标签分割的监督下学习目标区域。其次，作者通过聚集 object region 内像素的 representations 来计算 object region representation。

作者使用 Transformer 编码器-解码器框架来重新表述对象上下文表示方案。将前两步 object region learning 和 object region representation 计算集成为解码器的交叉注意模块: 对像素进行分类， 即生成 object region 的线性投影为 category queries，object region representation 为交叉注意力输出。最后一步是作者添加到编码器的交叉注意力模块，其中 query 和 key 是解码器的输出，query 是每个位置的 representations。

# Conclusion

在这项工作中，作者提出了一个object - contextual representation 方法的语义分割。


成功的主要原因是像素的标签是像素所在对象的标签，通过用对应的对象区域表示对每个像素进行表征来加强像素表示。