---
layout:     post
title:      "【深度学习】Auto-Parsing Network for Image Captioning and Visual Question Answering"
subtitle:   ""
date:      2022-01-09 
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - Scene Graph
---

# Abstract

提出一种自解析的网络来发现和挖掘输入数据的隐藏树状结构以提升 基于 Transformer 的视觉-语言系统的有效性。。

通过注意力操作施加一个参数化的概率图模型， 在每个自注意力层上加入稀疏假设。

使用 PGM 将输入分割为几个簇， 每个簇可以视为其内在实体的父母。

通过堆叠这些 PGM 约束的自注意力层， 在低层的簇组成一个新的序列， 而在高层的 PGM 将会进一步分割这个序列。

通过迭代， 可以隐式解析到一个稀疏树， 将这个树的层级知识加入到被转换的 embeddings 中， 可以用于解决视觉-语言任务。

基于概率的 PGM 解析算法 可以用来在推理时发现输入的隐藏结构。

PS： 这里的分割 可以理解为 聚类。

# Conclusion 

通过在Transformer 自注意力层上施加一个概率图模型， 将稀疏假设引入原始的全连接模型。

可以避免一些微不足道的全局依赖， 可以发现和挖掘关键的局部上下文。

通过堆叠受层级约束的自注意力层可以隐式解析出一颗树。

通过这种方法， 模型可以无监督地在端到端的训练中解析出树。

同时得到一种树解析算法， 其挖掘 PGM 概率 以提取隐藏树。

因此， 我们可以找到每个样本的隐藏结构。