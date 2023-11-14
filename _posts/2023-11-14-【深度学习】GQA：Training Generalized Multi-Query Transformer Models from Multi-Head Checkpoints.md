---
layout:     post
title:      "【深度学习】GQA: Training Generalized Multi-Query Transformer Models from Multi-Head Checkpoints"
subtitle:   ""
date:       2023-11-14
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - 
---

# Abstract

Multi-query attention（MQA）仅使用单个  key-value head，大大加快了解码器推理。

然而，MQA可能导致质量下降，此外，仅仅为了更快的推理而训练一个单独的模型可能不是可取的。

我们提出了一种方法，可以使用原始预训练计算的5％将现有的多头语言模型 checkpoint 升级为具有MQA的模型，并引入了 grouped-query attention（GQA），这是多查询注意力的一种泛化，它使用中间（多于一个，少于 query heads 数）数量的 key-value heads。

我们表明，经过训练的GQA以与MQA相当的速度实现了接近多头注意力的质量。

# Introduction

由于加载解码器权重以及每个解码步骤的所有注意力键和值的内存带宽开销，自回归解码器推理对 Transformer 模型来说是一个严重的瓶颈。通过多查询关注，加载键和值的内存带宽可以大幅减少，该注意力使用多个查询头，但单个键和值头。

然而，多查询关注（MQA）可能导致质量下降和训练不稳定，训练针对质量和推理优化的单独模型可能不可行。此外，虽然一些语言模型已经使用多查询注意力，如PaLM（Chowdhery等人，2022年），但许多没有，包括公开可用的语言模型，如T5（Raffel等人，2020年）和LLaMA（Touvron等人，2023年）。
