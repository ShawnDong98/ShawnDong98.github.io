---
layout:     post
title:      "【深度学习】Scene Graph Generation by Iterative Message Passing"
subtitle:   ""
date:       2022-02-11
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - Scene Graph
---

# Abstract
理解视觉场景不仅仅是孤立地识别每个物体。物体之间的关系也对场景构成了丰富的语义信息。

这篇文章使用 scene graph 显示建模目标和它们的关系。提出一种新的端到端的模型， 其能够生成输入图像的结构化场景表示。该模型使用RNN解决 scene graph 推理问题， 并且通过消息传递迭代地提升其预测。

这篇文章的联合推理模型能够利用上下文线索对物体和关系做出更好的预测。
# Conclusions

这篇文章提出一种新的端到端的方法自从图像动生成视觉 scene graph。

其模型在 primal 和 dual sub-graph 中沿着 scene graph 的拓扑结构迭代地执行消息传递。

通过这种方法， 它将更具有信息的上下文线索加入以提升预测边和节点的质量。

这个模型可以视为图生成问题的一个通用框架。