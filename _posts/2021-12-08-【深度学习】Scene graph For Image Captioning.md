---
layout:     post
title:      "【深度学习】Scene graph For Image Captioning"
subtitle:   ""
date:       2021-12-08
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - 
---


# On the Role of Scene Graphs in Image Captioning

## Abstract

Scene graphs 表示图像中的语义信息， 他可以帮助 image cationing 系统产生更多描述性的输出， 而不仅仅使用图像作为上下文。最近的 captioning 方法依赖于 ad-hoc 方法获取图像的 graph。然而，这些 graph 引入了噪声， parser 的错误对 captioning 准确性的影响尚不清楚。 在这项工作中， 调研了 Scene Graph 在多大程度上可以帮助 image captioning。 结果表明， 最先进的 scene graph parser 几乎可以像 ground-true graph 一样帮助captioning提高性能， 这表明目前的瓶颈更多地存在于 captioning 模型， 而不是 scene graph parser 的性能上。

## Conclusion

这篇文章提出了一种新的 image captioning 框架， 该框架融合了SOTA scene graph parser Factorizable-Net 的 scene graph 特征。 特别地， 研究了将图卷积编码的 relation-aware 的 scene graph 特征 与 区域级的特征集成的问题， 以提高 image captioning 性能。


