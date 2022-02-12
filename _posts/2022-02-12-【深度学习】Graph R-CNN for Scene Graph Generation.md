---
layout:     post
title:      "【深度学习】Graph R-CNN for Scene Graph Generation"
subtitle:   ""
date:       2022-02-12
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - Scene Graph
---

# Abstract
这篇文章提出一种新的叫做 Graph R-CNN 的场景图生成方式，其能够同时有效地检测目标以及它们之间的关系。

模型包括一个 Relation Proposal Network(RePN)， 其可以有效地处理图像中目标之间的潜在关系。

这篇文章还提出了一个注意力图卷积网络(aGCN)， 其可以有效地捕获目标之间的上下文信息和关系。

最后， 这篇文章还引入了一个新的评价指标。
# Conclusion
