---
layout:     post
title:      "【深度学习】GATED GRAPH SEQUENCE NEURAL NETWORKS "
subtitle:   ""
date:       2022-01-31
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - 
---
# Abstract

这篇文章研究了对于图结构输入的特征学习技术。

出发点是图神经网络， 我们使用门控循环单元和现代化优化技术修改它， 然后拓展到输出序列。

结果是它是一种非常灵活地并且有广泛用途的神经网络模型， 当问题数图结构时，其相比于单纯的基于序列的模型(如LSTM)有非常好归纳偏置。

我们在一些简单的 AI 和 图算法学习任务上展示了其能力。

我们展示了它能够在抽象数据结构需要被描述为子图的问题上能够达到SOTA性能。

# Discussion
**What is being learned?**： 例如，考虑回答下方示例所需的行子集。


B is E  \\
E has_fear H \\
eval B has_fear \\


要进行逻辑推理，我们不仅需要对故事中出现的事实进行逻辑编码，还需要将背景世界知识编码为推理规则，如

$$
is(x, y) \land has\_fear(y, z) \Rightarrow has\_fear(x, z)
$$
我们对任务的编码将故事解析简化为图形式，但它没有提供任何背景知识。GG-NN模型可以看作是在学习这一点，其结果存储在神经网络的权值中。


**Discussion**  结果表明 GGS-NNs 在大量有图结构的问题上有很好的归纳偏置。然而要广泛地使用它们还需要客服一些限制。我们在前面提到的两个限制是 AI 翻译任务没有将输入的时序关系或者更高阶的关系加入进来。我们可以想象几个解决这些限制的方法， 比如拼接一系列 GG-NNs， 每条边有一个 GG-NNs， 以及 将更高阶的关系表征为 factor graphs。一个更重要的挑战是如何处理具有更少结构化输入表征。一种可能的方式将less structureed input 和 隐向量也加入到 GGS-NNs。但是需要实验找到解决这些问题的最好方式。