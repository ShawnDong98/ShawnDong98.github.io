---
layout:     post
title:      "【深度学习】Be Specific, Be Clear: Bridging Machine and Human Captions by Scene-Guided Transformer"
subtitle:   ""
date:       2022-04-16
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - 
---


# Abstract

自动生成图像的自然语言描述，即图像字幕，是多媒体理解的主要目标之一。

最近，深度神经网络在图像字幕中的成功伴随着基于区域的自下而上的注意特征。

基于区域的特征代表了局部区域的内容，缺乏对图像的整体理解，这对于更具体、更清晰的语言表达至关重要。

视觉场景感知可以促进整体理解，提供先验知识，生成具体清晰的物体说明、物体关系和整体图像场景。

这篇文章提出了一个场景引导的 Transformer (SG-Transformer)模型，该模型利用场景级的全局上下文来生成更具体和描述性的图像标题。

SG-Transformer采用编码器-解码器架构。

该编码器在注意力学习中利用目标区域特征将全局场景上下文作为外部知识聚集起来，以促进目标关系推理。

它还整合了高层次的辅助场景引导的任务，以实现更具体的视觉表征学习。

然后，解码器集成了由编码器提炼的对象级和场景级信息，以实现整体的图像感知。

在MSCOCO和Flickr30k基准测试上的大量实验显示了SG-Transformer的优越性和通用性.

此外，所提出的场景引导方法可以丰富编码器中的对象级和场景图的视觉表示，并在解码器中推广到基于RNN和基于 Transformer 的体系结构。

# Conclusion

这篇文章提出将视觉表示学习与全局场景信息相结合，并从局部和全局视图生成特定和清晰的图像描述。

引入了Scene-Guided Transformer( Transformer)，它由场景引导编码器和场景引导解码器组成。

该编码器将场景背景与目标关系注意力学习相结合，并引入高级辅助场景分类任务和判别视觉表示。

编码解码器既可以从局部视图生成单词，也可以从全局视图生成单词。

在MSCOCO和Flickr30k基准上进行的大量实验和卓越的结果证明了SG-Transformer在定量和定性方面的有效性和通用性。