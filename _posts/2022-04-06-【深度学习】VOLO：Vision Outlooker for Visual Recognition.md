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

为了解决这个问题，引入了一种新的 outlook attention，并提出了一个简单而通用的架构，称为Vision outlook (VOLO)。

与专注于粗级别的全局依赖建模的自注意力不同，outlook attention 有效地将精细级别的特征和上下文编码为 token，这被证明对识别性能非常有利，但在很大程度上被自注意力忽略了。

实验表明VOLO在不使用任何额外训练数据的情况下，在ImageNet-1K分类上的top-1准确率达到了87.1%，是该竞争基准上第一个准确率超过87%的模型。

此外，预训练好的VOLO可以很好地迁移到下游任务，如语义分割。在 Cityscapes 验证集上获得了84.3%的mIoU得分，在ADE20K验证集上获得了54.3%的mIoU得分。
# Conclusion