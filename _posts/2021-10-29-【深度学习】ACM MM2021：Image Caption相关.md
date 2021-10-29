---
layout:     post
title:      "【深度学习】ACM MM2021：Image Caption相关"
subtitle:   ""
date:       2021-10-29
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - 
---


# Distributed Attention for Grounded Image Captioning


研究了弱监督 grounded image caption 的问题。给定一副图像， 目标是自动生成一个句子来描述图像的上下文， 每个名词单词对应于图像中相应的区域。 由于缺乏明确的细粒度 region word对齐作为监督， 因此这个任务是具有挑战性的。以往的弱监督方法主要是探索各种正则化方案来提高 attention accuracy。但是它们的表现远远不及全监督。一个被忽视的主要问题是， 生成 visually groundable words 的注意力可能只集中在最 discriminate 的部分， 而不能覆盖整个目标。为此，我们在论文中提出了一种简单而有效的方法来缓解这一问题，即  partial grounding 问题。具体来说，我们设计了一个分布式注意力机制，当生成单词时， 强制网络聚合来自多个空间不同区域且语义一致的信息。因此，  focused region proposals 的交集应该形成一个完全包围感兴趣的目标的视觉区域。


研究了在没有 grounding annotations 的情况下生成具有准确 grounding regions 的 image captions 的问题。揭示了缓解 partial grounding 问题对 grounding performance 至关重要。提出了分布式注意力机制，强制网络在生成单词时将语义一致的不同区域聚合在一起。


# Dual Graph Convolutional Networks with Transformer and Curriculum Learning for Image Captioning 


现有的  image captioning 方法只关注于理解单个图像中对象或实例之间的关系，而没有探索上下文图像之间存在的上下文关联。在这片文章中为 Image Caption 提出了带有transformer和 curriculum learning 的双向图卷积神经网路(Dual-GCN)。具体来说，不使用object-level GCN来捕获单一图像中目标对目标的空间关系，而是采用 image-level GCN来捕获相似图像提供的特征信息。设计良好的双向 GCN 可以使 Transformer 更好地理解图像中不同目标之间的关系，并充分利用相似图像作为辅助信息对图像进行合理的描述。同时，通过引入 cross-review 策略来决定  difficulty levels，采用 curricu-lum learning 作为训练策略，以提高模型的鲁棒性和泛化性。


提出一种使用 Curriculum Learning 作为学习策略 结合了 Dual-GCN 和 Transformer 的  image caption 模型。 由 object-level GCN 和 image-level GCN 编码的视觉特征被设计用来融合局部和全局视觉编码。Transformer 解码器能够理解提取的视觉特征生成合理的描述结果。 通过 cross-review 机制决定数据集的难度， 使用 curriculum learning 作为训练策略确保我们提出的模型以一种从易到难得方式训练。