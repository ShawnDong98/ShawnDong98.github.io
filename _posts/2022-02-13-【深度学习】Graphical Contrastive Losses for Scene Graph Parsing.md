---
layout:     post
title:      "【深度学习】Graphical Contrastive Losses for Scene Graph Parsing"
subtitle:   ""
date:       2022-02-13
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - Scene Graph
---

# Abstract

大多数场景图解析器使用两阶段的流程来检测视觉关系： 第一阶段预测目标， 第二阶段为每个目标对 预测 谓语。

这样的训练流程对预测谓语类别时只有交叉熵损失， 这样会有两个常见的误差。

第一个是 Entity Instance Confusion,  当模型对相同的物体类别产生混淆时会发生。

第二个是 Proxial Relationship Amubiguity， 当多个 主语-谓语-宾语 三元组 出现的非常近时， 模型难以推测正确的主语谓语。

这篇文章提出一组对比损失解决这些问题， 叫做 Graphical  Cotrastive Losses。

这些损失通过对每个混淆的类型的边际约束显式地强制模型不混淆相关的和不相关的实例。

进一步构造了一个叫做 ReIDN 的关系检测器， 使用前面提到的流程展示所提出损失的有效性。

# Conclusion

