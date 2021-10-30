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


研究了弱监督 grounded image caption 的问题。给定一副图像， 目标是自动生成一个句子来描述图像的上下文， 每个名词单词对应于图像中相应的区域。 由于缺乏明确的细粒度 region word对齐作为监督， 因此这个任务是具有挑战性的。以往的弱监督方法主要是探索各种正则化方案来提高 attention accuracy。但是它们的表现远远不及全监督。一个被忽视的主要问题是， 生成 visually groundable words 的注意力可能只集中在最 discriminate 的部分， 而不能覆盖整个目标。为此，在论文中提出了一种简单而有效的方法来缓解这一问题，即  partial grounding 问题。具体来说，设计了一个分布式注意力机制，当生成单词时， 强制网络聚合来自多个空间不同区域且语义一致的信息。因此，  focused region proposals 的交集应该形成一个完全包围感兴趣的目标的视觉区域。


研究了在没有 grounding annotations 的情况下生成具有准确 grounding regions 的 image captions 的问题。揭示了缓解 partial grounding 问题对 grounding performance 至关重要。提出了分布式注意力机制，强制网络在生成单词时将语义一致的不同区域聚合在一起。

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1635485791030.png)


# Dual Graph Convolutional Networks with Transformer and Curriculum Learning for Image Captioning 


现有的  image captioning 方法只关注于理解单个图像中对象或实例之间的关系，而没有探索上下文图像之间存在的上下文关联。在这片文章中为 Image Caption 提出了带有transformer和 curriculum learning 的双向图卷积神经网路(Dual-GCN)。具体来说，不使用object-level GCN来捕获单一图像中目标对目标的空间关系，而是采用 image-level GCN来捕获相似图像提供的特征信息。设计良好的双向 GCN 可以使 Transformer 更好地理解图像中不同目标之间的关系，并充分利用相似图像作为辅助信息对图像进行合理的描述。同时，通过引入 cross-review 策略来决定  difficulty levels，采用 curricu-lum learning 作为训练策略，以提高模型的鲁棒性和泛化性。


提出一种使用 Curriculum Learning 作为学习策略 结合了 Dual-GCN 和 Transformer 的  image caption 模型。 由 object-level GCN 和 image-level GCN 编码的视觉特征被设计用来融合局部和全局视觉编码。Transformer 解码器能够理解提取的视觉特征生成合理的描述结果。 通过 cross-review 机制决定数据集的难度， 使用 curriculum learning 作为训练策略确保提出的模型以一种从易到难得方式训练。

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1635485822434.png)

# Question-controlled Text-aware Image Captioning

对于带有多个 scene texts 的图像，不同的人可能对不同的文本信息感兴趣。现有的 text-aware im-age captioning 模型无法根据不同的信息需求生成不同的 captions。为了探索如何生成个性化的text-aware captions，定义了一个新的挑战性任务，即 Question-controlled 的 Text-aware Image captioning (Qc-TextCap)。该任务以问题为控制信号，需要模型来理解问题，找到相关的场景文本，并用人类语言流利地将其与物体结合起来进行描述。基于两个现有的 text-aware captioning 数据集，自动构造了两个数据集，ControlTextCaps和 Con-trolVizWiz 来支持该任务。提出了一种新的 Geometry 与 Question Aware 模型(GQAM)。GQAM首先采用 Geometry-informed Visual Encoder 考虑空间关系地融合 region-leve object features 和 region-level scene text features。然后，设计了一个 Question-guided 编码器，为每个问题选择最相关的视觉特征。最后，GQAM使用Multimodal Decoder生成个性化的 text-aware caption。

为视障人士生成个性化的 text-aware captions， 提出了一个新的有挑战性的任务， 叫做 Question-controlled Text-aware Image Captioning(Qc-TextCap)。 因为它在交互上很方便， 使用关于 scene texts 中的问题来控制 text-aware caption 生成。Qc-TextCap任务需要模型来理解问题，找到相关的场景文本区域，并将答案与初始标题合并，以生成最终的  text-aware caption。为了支持这个任务，基于现有的 text-aware 标题数据集自动构造了 ControlTextCaps 和 ControlVizWiz 数据集。进一步提出了一个 Geometry 和  Question Aware 模型(GQAM)，以逐步编码相关的视觉特征和文本特征。最后， 进一步证明了以问题作为控制信号的模型可以产生更丰富、更多样化的标题。

# Similar Scenes arouse Similar Emotions: Parallel Data Augmentation for Stylized Image Captioning

Stylized image captioning 系统旨在生成一个不仅在语义上与给定的图像相关，而且还与给定的风格描述一致的标题。这个任务的最大挑战之一是缺乏足够的成对的 stylized  数据。许多研究关注的是无监督的方法，而没有从数据增强的角度考虑。这篇文章指出， 人们在类似的场景中可能会回忆起类似的情绪，并且经常用类似的风格短语表达类似的情绪，因此产生了数据增强想法。这篇文章提出了一个新的 Extract-Retrieve-Generate 数据增强框架，从小规模的 stylized 句子中提取风格短语，并将其 graft 到大规模的 factual captions 中。首先，设计了 emotional signal extractor 从小规模 stylized 句子中提取 style 短语。其次，构造了 plugable 的 multi-modal scene retriever，以检索由一对图像和它的stylized caption表征的场景， 它们和大规模 factual data 中的 query image 或 caption 相似。最后，基于相似场景的 style phrases 和当前场景的 factual description，构建 emotion-aware 的 caption 生成器，为当前场景生成流畅多样的 stylized captions 。大量的实验结果表明，该框架能够有效地缓解数据短缺问题。它还显著提高了几个现有的 image captioning 模型在监督和非监督设置下的性能，在句子相关性和风格方面都比最先进的 stylized image captioning 方法表现得更好。

这篇文章提出了一种新的 extract-retrieve-generate 数据增强框架，用于 stylized image captioning。该框架首先从已有的风格化句子中提取风格短语。然后，该框架通过 plugable 的 multi-modal scene retriever 进一步检索一组类似场景。该框架利用相似场景的 stylized captions 中的 style phrases，为大规模 factual corpus 中的图像 生成相应的 stylized captions。大量的实验结果表明，该框架能够有效地缓解数据匮乏问题。 它还显著提高了几种现有  image
captioning 模型在有监督和无监督设置下的性能，大大优于最先进的 stylized image captioning 方法。

# Unifying Multimodal Transformer for Bi-directional Image and Text Generation 

这篇文章研究的联合学习的 image-to-text 和 text-to-image 的生成，这是自然的双向任务。典型的现有工作为每个任务设计独立的  task-specific 的模型。这篇文章基于单个多模态模型来联合研究双向任务， 提出了一个统一的图像和文本生成框架。具体来说，将这两个任务描述为序列生成任务，其中将图像和文本表示为统一的 tokens 序列，Transformer学习 multimodal interactions 来生成序列。进一步提出 two-level granularity 特征表示和 sequence-level 训练来改进基于 transformer 的统一框架。

这篇文章提出了一个统一的 multimodal Transformer 用于双向  image-and-text 生成任务。