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

PS： 这里的分割 可以理解为 聚类。

# Conclusion 