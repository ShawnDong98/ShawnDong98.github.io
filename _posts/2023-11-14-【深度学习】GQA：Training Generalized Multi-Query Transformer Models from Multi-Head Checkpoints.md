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

