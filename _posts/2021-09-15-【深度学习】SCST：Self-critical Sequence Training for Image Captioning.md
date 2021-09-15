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

**Sequence Generation as an RL problem**： Caption系统传统使用交叉熵损失函数训练。为了直接优化NLP 指标 并且避免 exposure bias 问题， 我们可以用强化学习建模生成模型。引入的循环神经网络(LSTMs)可以视作与 `enviroment` (words 和 images features) 交互的 `agent`。 定义一个 `policy` $p_{\theta}$ ， $\theta$ 是网络的参数，`policy`将导致产生 `action`， `action` 定义为预测下一个词。在每个 `action` 之后， `agent` 更新 `state`(LSTM 的hidden state， 注意力权重等)。 一旦生成 `EOS` token， `agent` 观测一次 `reward`， `reward` 是生成句子的 CIDEr 分数， 用 $r$ 表示。 `reward` 是生成句子和真实句子的评价指标。 训练的目标是最小化负的 `reward` 的期望：

$$
L(\theta) = - E_{w^s \thicksim p_\theta}[r(w^s)]
$$

其中 $w^s  = (w_1^s, ..., w_T^s)$ , $w_t^s$ 是模型在时间步 $t$ 采样的词。 实际上 $L(\theta)$ 通常用 $p_\theta$ 的单个采样来估计：

$$
L(\theta) \approx -r(w^s), w^s \thicksim p_\theta
$$

**Policy Gradient with REINFORCE**： 为了计算梯度 $\nabla_\theta L(\theta)$， 我们使用 强化学习算法。 强化学习是基于观测的， 这个观测是不可微的 `reward`  函数梯度的期望：

$$
\nabla_\theta L(\theta) = -E_{w^s \thicksim p_\theta}[r(w^s) \nabla_\theta \log p_\theta(w^s)]
$$

实际中， 梯度期望可以对 minibatch 中的每个训练样本使用 $p_\theta$ 进行单个蒙特卡洛采样 $w^s = (w_1^s, ..., w_T^s)$

$$
\nabla_theta L(\theta) \approx -r(w^s) \nabla_\theta \log p_\theta(w^s)
$$


**REINFORCE with a Baseline**： 由强化学习给定的策略梯度可以泛化为 一个 `action` 值相对于一个 `reward` 或者 `baseline` 相关的 `reward`。

这个 `baseline` 可以是任意的函数， 只要它和 `action` $w^s$  不相关：

$$
\begin{aligned}
E_{w^s \thicksim p_\theta}[b \nabla_\theta \log p_{\theta}(w^s)] &= b \sum_{w_s} \nabla_\theta p_{\theta}(w^s) \\
&= b \nabla_\theta \sum_{w_s} p_\theta(w^s) \\
&= b \nabla_theta 1 = 0
\end{aligned}
$$

这表明了 `baseline` 不改变梯度期望， 但是他可以减小梯度的方差。 对于每个训练样本， 我们再次用单个采样 $w^s \thicksim p_\theta$ 估计梯度期望：

$$
\nabla_\theta L(\theta) \approx -(r(w^s) - b) \nabla_\theta \log p_\theta (w^s)
$$


**Final Gradient Expression** 使用链式法则， $p_\theta$ 模型有：

$$
\nabla_\theta L(\theta) = \sum_{t=1}^T \frac{\partial L(\theta)}{\partial s_t} \frac{\partial s_t}{\partial \theta}
$$

其中 $s_t$ 是输入到 softmax 函数。 使用带有 `baseline` 的强化学习， 其梯度 $\frac{\partial L(\theta)}{\partial s_t}$ 为：

$$
\frac{\partial L(\theta)}{\partial s_t} \approx (r(w^s) - b)(p_{\theta}(w_t \mid h_t) - 1_{w_t^s})
$$



# Self-critical sequence training (SCST) 

SCST训练方法的最重要的思想是使用当前模型在测试时的reward作为RL算法的baseline。 模型采样 $w^s$ 的负的 `reward` 的梯度经过 softmax 激活， 在时间步 $t$ 变成：

$$
\frac{\partial L(\theta)}{\partial s_t} = (r(w^s) - r(\hat w))(p_\theta(w_t \mid h_t) - 1_{w_t^s})
$$

其中 $r(\hat w)$ 是当前模型测试时在推理算法下得到的 `reward`。 根据模型采样， 比 $\hat w$ 返回更高 `reward` 的采样将会被 "pushed up"， 或者增大概率， 否则将会被抑制。 SCST具有REINFORCE算法的所有优点，因为它直接优化真实的、序列级的评价度量， 而且避免了必须学习一个(上下文依赖的)对未来`reward`的期望估计作为基线。在实践中，我们发现SCST具有更低的方差，使用SGD可以更有效地训练小批量样本。