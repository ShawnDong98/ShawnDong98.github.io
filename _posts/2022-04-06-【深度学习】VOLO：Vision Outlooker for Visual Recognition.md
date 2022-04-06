---
layout:     post
title:      "【深度学习】VOLO: Vision Outlooker for Visual Recognition"
subtitle:   ""
date:       2022-04-06
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - 
---

# Abstract

视觉识别多年来一直由卷积神经网络(CNN)主导。

虽然目前流行的视觉 Transformer (ViTs)在 ImageNet 分类中显示出了很大的潜力，但如果不提供额外的数据，其性能仍不如最新的SOTA CNN。

这项工作试图缩小性能差距，并证明基于注意力的模型确实能够优于CNN。

这篇文章发现，限制vit用于ImageNet分类性能的一个主要因素是，它们在将精细级别的特征编码到令牌表示中的效率很低。
# Conclusion