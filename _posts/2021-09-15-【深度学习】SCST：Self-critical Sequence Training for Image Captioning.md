---
layout:     post
title:      "【深度学习】SCST：Self-critical Sequence Training for Image Captioning"
subtitle:   ""
date:       2021-09-15
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - MMML
---


# Reinforcement Learning

**Sequence Generation as an RL problem.**： Caption系统传统使用交叉熵损失函数训练。为了直接优化NLP 指标 并且避免 exposure bias 问题， 我们可以用强化学习建模生成模型。引入的循环神经网络(LSTMs)可以视作与 `enviroment` (words 和 images features) 交互的 `agent`。 定义一个 `policy` $p_{\theta}$ ， $\theta$ 是网络的参数，`policy`将导致产生 `action`， `action` 定义为预测下一个词。在每个 `action` 之后， `agent` 更新 `state`(LSTM 的hidden state， 注意力权重等)。 一旦生成 `EOS` token， `agent` 观测一次 `reward`， `reward` 是生成句子的 CIDEr 分数， 用 $r$ 表示。 `reward` 是生成句子和真实句子的评价指标。 训练的目标是最小化负的 `reward` 的期望：

$$
L(\theta) = - E_{w^s \thicksim p_\theta}[r(w^s)]
$$


# Self-critical sequence training (SCST) 