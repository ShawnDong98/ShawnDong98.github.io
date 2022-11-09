---
layout:     post
title:      "【深度学习】DETR：End-to-End Object Detection with Transformers"
subtitle:   ""
date:       2022-10-02
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - Detection
    - Arxiv 2020
---

# Abstract

这篇文章提出了一种将目标检测视为集合预测问题的新方法。

该方法简化了目标检测流程，有效地消除了对许多手工设计的组合的需求，如非极大值抑制过程或 Anchor 生成，这些过程或 Anchor 生成明确编码了对该任务的先验知识。

新框架的主要成分称为 DEtection TRansformer 或 DETR，是基于集合的全局损失，其通过二分匹配和Transformer码器解码器结构进行预测。

给定一组固定的学习目标 query，DETR对目标的关系和全局图像上下文进行推理，直接并行输出最终的预测集合。

与许多其他现代目标检测器不同，新模型在概念上很简单，不需要专门的库。

DETR在COCO目标检测数据集上展示了与高度优化的 Faster R-CNN 基线相当的准确性和运行时间性能。

此外，DETR可以很容易地泛化，以统一的方式产生全景分割。

# The DETR model

## Object detection set prediction loss


## DETR architecture

DETR 推断出一组固定大小的 $N$ 个预测，只需通过解码器，其中 $N$ 被设置为明显大于图像中的目标数量。训练的主要困难之一是根据真实目标（类别、位置、大小）进行评分。所提出的损失在预测和真实目标之间产生最佳的二分匹配，然后优化特定目标（边界框）损失。

用 $y$ 表示一组真实目标， $\hat y = {\hat y_i}_{i=1}^N$ 表示一组 $N$ 个预测。 假设 $N$ 在图像中比目标数量大， 将 $y$ 视作用 $\emptyset$ 填充的大小为 $N$ 的集合。为了找到这两个集合之间的二分匹配，我们以最低的成本搜索 $N$ 个元素 $\sigma \in \mathcal{G}_N$ 的排列   :

$$
\hat \sigma = \mathop{argmin}_{\sigma \in \mathcal{G}_N} \sum_i^N \mathcal{L}_{match} (y_i, \hat y_{\sigma(i)})
$$

其中 $\mathcal{L}_{match}(y_i, \hat y_{\sigma(i)})$ 是真实标签和索引 $\sigma(i)$ 的一个预测的 pair-wise matching cost。  之前的工作使用匈牙利算法有效地计算了这个最优分配。

匹配成本既考虑了类别预测，也考虑了预测和真实边界框的相似性。真实集合的每个元素 $i$ 可以被视为 $y_i = (c_i, b_i)$， 其中 $c_i$ 是目标类别标签(可能是 $\emptyset$) ， $b_i \in [0, 1]^4$ 是一个向量， 其定义了真实边界框相对比图像大小的中心坐标以及高和宽。对于索引 $\sigma(i)$ 的预测， 定义类别 $c_i$ 的概率为 $\hat p_{\sigma(i)}(c_i)$ 和预测的边界框为 $\hat b_{\sigma(i)}$。 有了这些注释， 定义 $L_{match}(y_i, \hat y_{\sigma(i)})$ 为 $-\mathbb{1}_{c_i \neq \emptyset} \hat p_{\sigma(i)}(c_i) + \mathbb{1}_{c_i \neq \emptyset} \mathcal{L}_{box}(b_i, \hat b_{\sigma(i)})$。

这种查找匹配的过程与现代检测器中用于匹配提议或先验框与真实目标的启发式分配规则的作用相同。主要区别在于，DETR 需要找到一对一的匹配，用于没有重复的直接集合预测。

第二步是计算损失函数，即上一步匹配的所有对的匈牙利损失。作者定义的损失与普通目标检测器的损失相似，即用于类预测的负对数似然和稍后定义的边界框损失的线性组合：

$$
\mathcal{L}_{Hungarian}(y, \hat y) = \sum_{i=1}^N [-\log \hat p_{\hat \sigma}(c_i) + \mathbb{1}_{c_i \neq \emptyset} \mathcal{L}_{box}(b_i, \hat b_{\sigma}(i))]
$$

其中 $\hat \sigma$ 是第一步计算的最优分配。为了类别平衡， 实际中， 对于 $c_i = \emptyset$ 的对数概率项将其权重缩小10倍。这类似于 Faster R-CNN 训练程序如何通过子采样来平衡正/负提议。注意， 目标和 $\emptyset$ 之间的匹配成本不依赖于预测， 这意味着成本为常数。


# Conclusion

这篇文章提出了DETR，这是一种基于 Transformer 和二分匹配损失的目标检测系统的新设计，用于直接集合预测。

该方法在 COCO数据集上实现了与优化的 Faster R-CNN 基线相当的结果。

DETR实现简单，具有灵活的架构，易于扩展为全景分割，并具有竞争性的结果。

此外，它在大型物体上的性能明显优于 Faster R-CNN，这可能要归功于对自注意力形成的全局信息的处理。

这种新的检测器设计也带来了新的挑战，特别是在训练、优化和小物体性能方面。

