---
layout:     post
title:      "【深度学习】On the Role of Scene Graphs in Image Captioning "
subtitle:   ""
date:       2022-01-14
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - Scene Graph
---

# Abstract

场景图表示图像中的语义信息，可以帮助 image captioning 系统不是仅仅使用图像作为上下文， 产生更多的描述性输出。

最近 Captioning 方法使用特殊的方式获得图像的 graph。然而， 这个 graph 引入了噪声， 而且由于 parser 的错误对 captioning 准确性的影响尚不清楚。

这个工作调研了究竟什么样的 scene graph 可以帮助 image captioning。

结果表明SOTA scene graph parser 可以像 scene graph 标签一样促进 image captioning 的性能， 表明瓶颈在于 captioning 模型而不在于 scene graph parser。


# Conclusion 

提出了一种新的 image captioning 框架，该框架融合了从最先进的场景图解析器 Factorizable-Net 中提取的场景图特征。

特别地， 我们研究了集成 关系相关的 scene graph 特征以提高image captioning 性能， 该特征通过区域级别的图像特征通过图卷积编码得到。
