---
layout:     post
title:      "【深度学习】ICCV2021 Image Captioning 相关论文"
subtitle:   ""
date:       2021-11-04
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - 
---


# Partial Off-policy Learning: Balance Accuracy and Diversity for Human-Oriented Image Captioning 

Human-oriented 的 image captioning 具有高多样性和高准确性，是视觉+语言建模中的一项具有挑战性的任务。基于强化学习(RL)的框架算法提高了 image captioning 的准确性，但严重损害了其多样性。相比之下，其他基于 变分自编码器(VAE) 或生成对抗网络(GAN)的方法可以生成多样化但不准确的 captions。这项工作中致力于促进 RL-based 的 image captioning 的多样性。具体来说，这篇文章设计了一个 off-policy 学习方案，以平衡准确性和多样性。首先，在 RL 启动前， 使用之前训练好的模型参数初始化， 生成多样化的候选标题。然后， 提出一个叫做 max-CIDEr 的损失函数提供奖励促进多样性。将上述的 off-policy 策略与 on-policy 策略相结合，以调节探索效应，进一步平衡 human-like image captioning 的多样性和准确性。

这篇文章为 image captioning 提出了一种新的叫做 partial off-policy 的学习方案， 鼓励在准确性和多样性方面的 human-like 表现。引入了 sampling 模型 和 max-CIDEr reward。 然后，通过策略选择程序，将这种 off-policy 策略与传统的 on-policy 策略相结合，以实现准确性和多样性的平衡。


# Understanding and Evaluating Racial Biases in Image Captioning 

Image captioning 是一项重要的任务，可以进行视觉推理和帮助视障人士。然而，就像在许多机器学习设置中一样， social  biases 会以不好的方式影响 image  captioning。这项工作研究了 image  captioning 的 bias 的传播途径，特别关注COCO数据集。之前的工作使用自动衍生的性别标签分析了 caption 中的性别偏见;在这里，这篇文章使用手工注释检查 racial 和 intersectional biases 。第一个贡献是在获得IRB批准后标注了28,315名被描述的人的性别和肤色。通过这些标注，比较了手动和自动生成的 image  captioning 中的种族偏见。展示了肤色较浅的人和肤色较深的人在 caption performance、情感和用词选择上的差异。此外，与旧的 captioning 系统相比，现代 captioning 系统中这些差异的幅度更大，因此导致人们担心，如果不适当考虑和缓解这些差异，只会变得越来越普遍。

这项工作试图理解在 COCO image  captioning 数据集中存在什么种族偏见，而且还试图理解这些偏见如何传播到基于它们的模型中。标注了图片中人物的肤色和性别，并考虑了各种形式的偏见，比如不同群体之间的可区分性。在数据集和自动 image captioning 模型中发现了bias 的实例。然而，没有发现偏见的案例并不意味着没有偏见，仅仅是因为特定实验没有发现它们。通过观察那些最能说明 image captioning 空间发展方向的模型，可以看到偏见在增加。对于研究人员来说，这提醒他们要认识到这些偏见已经存在，并警告他们要小心随着 image captioning 技术的进步而增加的偏见。

基于这些分析，这篇提出了减少 captioning 系统偏差的方向。首先，人类标注者在描述不同肤色群体的人时，会对图片中的人的人口统计特征做出假设或者使用不同的语言。为了缓解这一问题，数据集收集器可以为标注器提供更明确的指令(例如，不要给人们标记性别或包括种族描述符)。此外，还发现 ground-truth captions 包含 profane 的语言。包含污言秽语或其他冒犯性概念的人工标注字幕应该从数据集中删除。此外，只有7.0%的数据集包含了肤色较深的人的图像，即1096张图像。需要收集更多样化的数据集，这样就可以测量分类统计数据，并在知道测量不会受到高抽样偏差的影响的情况下，对SPICE分数等指标进行比较。最后，从对生成的字幕的分析中，与其他基于 Transformer 的模型相比，Oscar表现出更少的偏差。这表明，在对模型进行预训练后，数据集的更大多样性可能有助于减少自动 image captioning 的偏见。

# Auto-Parsing Network for Image Captioning and Visual Question Answering

这篇文章提出了一个 Auto-Parsing Network(APN) 来发现和利用输入数据的hidden tree structures，以提高 Transformer-based 的视觉语言系统的有效性。具体地说，通过结合稀疏假设 对每个 self-attention 层的注意力操作进行参数化的 Probabilis-tic Graphical Model (PGM)。使用这个PGM将输入序列柔和地分割成几个簇，其中每个簇都可以被视为内部实体的父类。通过堆叠这些PGM约束的 self-attention 层，较低层的簇组成一个新的序列，较高层的PGM将进一步分割这个序列。通过迭代，可以隐式解析稀疏树，并将稀疏树的层次知识整合到转换后的 embeddings 中，用于解决目标视觉语言任务。具体来说，APN可以在两个主要的视觉语言任务中加强基于Transformer的网络: Captioning 和 Visual Question Answering 。 


这篇文章对 Transformer 的 self-attention 层施加了一个  Probabilistic Graphical Model (PGM)，将稀疏假设融入到原始的全连接假设中。然后，可以避免 trivial global dependencies，并可以发现和利用关键的本地上下文。此外，将受约束的 self-attention 层堆叠起来，并在其上施加层次约束，通过这些约束可以隐式解析树。这样，模型可以在端到端的训练过程中无监督地解析树。提出了一种树解析算法，利用计算得到的PGM概率提取隐藏树。因此，我们可以找出每个样本的隐藏结构。在 Image Captioning 和 Visual Question Answering 两种任务上提出了两种不同的APN，结果表明，与基于self-attention transformer相比，APN在两种任务上都有改进。


# In Defense of Scene Graphs for Image Captioning

主流的  image captioning 模型依赖卷积神经网络(CNN)图像特征，通过循环模型生成 captions。最近，image scene graphs 利用其结构语义被用来增强 captioning 模型，以，如对象实体、关系和属性。一些研究已经注意到，使用 black-box scene graph 生成器的 scene graphs 会损害 image captioning 的性能，并且基于 scene graph 的 captioning 模型需要承担显式使用图像特征来生成合适的 captions 的开销。为了应对这些挑战，提出了SG2Caps框架，该框架仅利用 scene graph 标签来实现具有竞争力的image captioning 性能。其基本思想是消除两个 scene graphs 之间的语义差异 —— 一个来自输入图像，另一个来自描述。为了实现这一点，我们利用  spatial location of objects 和 Human-Object-Interaction (HOI) 标签作为附加的 HOI graph。SG2Caps比现有的仅 scene graph 字幕模型的表现要好很多，这表明 scene graphs 是一种很有前景的 image captioning 表示。直接使用 scene graph 标签避免了对高维CNN特征进行卷积运算，从而减少了49%的可训练参数。

对象、属性和关系的显式编码是  image captioning 的有用信息。然而，盲目地使用 visual scene graphs 进行 captioning 无法产生合理的句子。提出的 SG2Caps pipeline 使网络能够进行预训练 (1)在其他 scene graph 数据集上的SGDet，(2) 在 HOI 数据集上的语义角色，从而大大减少在COCO标题数据集上的精度差距，这表明 仅在低维对象和关系标签空间中就可以实现强大的 captioning  模型。