---
layout:     post
title:      "【深度学习】ML-Decoder: Scalable and Versatile Classification Head"
subtitle:   ""
date:       2022-03-28
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - 
---

# Abstract

这篇文章引入了一种新的基于注意的分类头ML-Decoder。

ML-Decoder通过查询预测类标签的存在，与全局平均池化相比，能够更好地利用空间数据。

通过重新设计解码器的结构，并采用一种新的 group-decoding 方案，ML-Decoder具有很高的效率，并且可以很好地扩展到数千个类。

与使用更大的主干相比，ML-Decoder始终提供了更好的速度-精度权衡。

ML-Decoder也是通用的-它可以被用作各种分类头的替换，并在使用单词查询操作时推广到没有见过的类。

novel query 扩充进一步提高了其泛化能力。

使用ML-Decoder在几个分类任务上取得了最先进的结果:在MS-COCO多标签上，达到了91:4%的map; 在NUS-WIDE上，我们达到31:1% zsl mAP;在ImageNet单标签上，用ResNet50骨干达到了80:7%的新最高得分，无需额外的数据或蒸馏。
# Conclusion

