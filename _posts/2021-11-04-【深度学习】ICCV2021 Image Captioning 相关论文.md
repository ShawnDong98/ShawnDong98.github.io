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