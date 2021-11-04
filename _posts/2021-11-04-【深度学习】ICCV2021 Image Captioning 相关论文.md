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

Human-oriented 的 image captioning 具有高多样性和高准确性，是视觉+语言建模中的一项具有挑战性的任务。基于强化学习(RL)的框架算法提高了 image captioning 的准确性，但严重损害了其多样性。相比之下，其他基于 变分自编码器(VAE) 或生成对抗网络(GAN)的方法可以生成多样化但不准确的 captions。在这项工作中，我们致力于促进 RL-based 的 image captioning 的多样性。具体来说，这篇文章设计了一个 off-policy 学习方案，以平衡准确性和多样性。首先，在 RL 启动前， 使用之前训练好的模型参数初始化， 生成多样化的候选标题。然后， 提出一个叫做 max-CIDEr 的损失函数提供奖励促进多样性。将上述的 off-policy 策略与 on-policy 策略相结合，以调节探索效应，进一步平衡 human-like image captioning 的多样性和准确性。